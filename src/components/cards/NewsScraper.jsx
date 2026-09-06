import { useState, useEffect, useMemo, useRef } from "react";
import Plot from "react-plotly.js";

// Tag data-file requests with the pipeline's last-run timestamp so the browser
// and CloudFront can cache them long-term, while a new ETL run (new timestamp)
// produces a new URL that busts the cache exactly once.
function withVersion(url, version) {
  if (!url || !version) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${encodeURIComponent(version)}`;
}

export default function NewsScraperCard({
  newsSummaryBarChartUrl,
  newsDetailTableUrl,
  metadataUrl,
  onContentReady,
}) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 600);
  const [detailData, setDetailData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  // null = version not resolved yet; "" = resolved but unknown (fetch un-versioned)
  const [dataVersion, setDataVersion] = useState(null);
  const [dateRange, setDateRange] = useState("30d"); // default: latest 30 days
  const [chartView, setChartView] = useState("histogram");

  const onContentReadyRef = useRef(onContentReady);
  useEffect(() => {
    onContentReadyRef.current = onContentReady;
  }, [onContentReady]);

  // --- Step 1: resolve the current data version from the tiny run-timestamp file ---
  // ~120 bytes and served no-store, so revalidating on every visit is negligible.
  useEffect(() => {
    if (!metadataUrl) return;
    let isMounted = true;
    fetch(metadataUrl, { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((meta) => {
        if (!isMounted) return;
        setLastUpdated(meta.last_updated_utc);
        setDataVersion(meta.last_updated_utc || "");
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Metadata fetch failed:", err);
        setDataVersion(""); // fall back to un-versioned URLs so charts still load
      });
    return () => {
      isMounted = false;
    };
  }, [metadataUrl]);

  // --- Step 2: fetch the data files once the version is known ---
  // Requests are cacheable (no cache-buster); the ?v= tag changes only when the
  // pipeline publishes new data, so repeat visits are served from cache.
  useEffect(() => {
    if (!newsSummaryBarChartUrl) return;
    if (dataVersion === null) return; // wait for Step 1

    let isMounted = true;

    // --- Responsive width logic ---
    const updateWidth = () => {
      setIsNarrow(window.innerWidth < 600);
    };

    // Set immediately on mount
    updateWidth();

    // Listen for resize / orientation change
    window.addEventListener("resize", updateWidth);

    // --- Bar-chart summary ---
    fetch(withVersion(newsSummaryBarChartUrl, dataVersion))
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const records = Array.isArray(data)
          ? data
          : data.data || data.records || [];

        setChartData(records);
        // 🔑 Force Swiper to re-measure once content exists
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (onContentReadyRef.current) onContentReadyRef.current();
          });
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("JSON fetch failed:", err);
        setError("Network error while loading chart data");
      });

    // --- Row-level detail table ---
    fetch(withVersion(newsDetailTableUrl, dataVersion))
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setDetailData(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Detail JSON fetch failed:", err);
      });

    // --- Cleanup ---
    return () => {
      isMounted = false;
      window.removeEventListener("resize", updateWidth);
    };
  }, [newsSummaryBarChartUrl, newsDetailTableUrl, dataVersion]);
    // standardize & format dates
    const parseAlertDate = (s) => {
      if (!s) return null;

      // ISO date: 2026-01-19
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
        const d = new Date(s.replace(" ", "T")); // handles "YYYY-MM-DD HH:MM:SS" too
        return Number.isNaN(d.getTime()) ? null : d;
      }

      // US date: 1/19/2026 or 01/19/2026
      const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (m) {
        const mm = Number(m[1]), dd = Number(m[2]), yyyy = Number(m[3]);
        const d = new Date(yyyy, mm - 1, dd);
        return Number.isNaN(d.getTime()) ? null : d;
      }

      const d = new Date(s);
      return Number.isNaN(d.getTime()) ? null : d;
    };

    // Create filter for charts & table
  const filteredDetailData = useMemo(() => {
  if (!Array.isArray(detailData)) return [];
  if (dateRange === "all") return detailData;

  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (dateRange === "7d") start.setDate(start.getDate() - 7);
  else if (dateRange === "30d") start.setDate(start.getDate() - 30);
  else if (dateRange === "90d") start.setDate(start.getDate() - 90);

  return detailData.filter((row) => {
    const d = parseAlertDate(row.alert_date);
    if (!d) return false;
    return d >= start;
    });
  }, [detailData, dateRange]);

  // Build map data from the SAME filtered rows as the table
  const mapRows = useMemo(() => {
    if (!Array.isArray(filteredDetailData)) return [];

    const map = new Map();

    for (const row of filteredDetailData) {
      const state = row.state || "";
      const abbrev = row.state_abbrev || null;
      const topic = typeof row.target === "string" ? row.target.trim() : "";
      if (!state || !abbrev) continue;

      if (!map.has(abbrev)) map.set(abbrev, { state, count: 0, topics: new Set() });
      const obj = map.get(abbrev);
      obj.count += 1;
      if (topic && topic.toLowerCase() !== "null") obj.topics.add(topic);
    }

    return [...map.entries()].map(([abbrev, v]) => ({
      abbrev,
      state: v.state,
      count: v.count,
      topics: [...v.topics].sort().join(", "),
    }));
  }, [filteredDetailData]);

// Build bar chart from the SAME filtered rows as the table
  const chartRows = useMemo(() => {
    if (!Array.isArray(filteredDetailData)) return [];

    // topic -> { count, states:Set }
    const map = new Map();

    for (const row of filteredDetailData) {
      const rawTopic = row.target;
      const topic = typeof rawTopic === "string" ? rawTopic.trim() : "";
      const state = row.state || "—";
      // Ignore parsing failures / empty topics for the BAR CHART only
      if (!topic || topic.toLowerCase() === "null" || topic === "—") continue;

      if (!map.has(topic)) map.set(topic, { count: 0, states: new Set() });
      const obj = map.get(topic);

      obj.count += 1;
      if (state && state !== "—") obj.states.add(state);
    }

    return [...map.entries()]
      .map(([target, v]) => ({
        target,
        count_of_news_articles: v.count,
        states: [...v.states].sort().join(", "),
      }))
      .sort((a, b) => b.count_of_news_articles - a.count_of_news_articles)
      .slice(0, 10);
  }, [filteredDetailData]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(chartData)) return <p>Loading chart…</p>;
  if (chartData.length === 0) return <p>No news data available.</p>;

  const x = chartRows.map((d) => d.target);
  const y = chartRows.map((d) => d.count_of_news_articles || 0);
  const hoverText = chartRows.map(
    (d) =>
      `States: ${d.states || "N/A"}<br>` +
      `Count: ${d.count_of_news_articles || 0}`
  );

  return (
    <div className="news-scraper-card">
      <div className="news-content">
      <div className="news-plot-wrap">
        <div className="plot-scroll-overlay" />
        {/* DISPLAY LAST RUN TIMESTAMP */}
          {lastUpdated && (
            <div className="news-last-updated">
              Last updated:{" "}
              {new Date(lastUpdated).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          )}

        {/* DATE RANGE FILTER (affects table now, chart later) */}
         <div className="news-filters">
           <label className="news-filter-label">
             Date range:&nbsp;
             <select
               value={dateRange}
               onChange={(e) => setDateRange(e.target.value)}
             >
               <option value="7d">Last 7 days</option>
               <option value="30d">Last 30 days</option>
               <option value="90d">Last 90 days</option>
               <option value="all">All time</option>
             </select>
           </label>
         </div>
         <div className="news-filter-stats">
           Parsing {filteredDetailData.length} of{" "}
           {Array.isArray(detailData) ? detailData.length : 0} articles
         </div>
        {/* CHART VIEW TAB SWITCHER */}
        <div className="news-chart-tabs">
          <button
            className={`news-tab-btn${chartView === "histogram" ? " active" : ""}`}
            onClick={() => setChartView("histogram")}
          >
            Histogram
          </button>
          <button
            className={`news-tab-btn${chartView === "map" ? " active" : ""}`}
            onClick={() => setChartView("map")}
          >
            Map
          </button>
        </div>
        {/* Bar Chart / Map Toggle */}
        {chartView === "histogram" ? (
          <Plot
            data={[
              {
                x,
                y,
                type: "bar",
                text: y,
                marker: {
                  color: "#3f3cdaff",
                  line: { width: 0 },
                },
                hoverinfo: "text",
                hovertext: hoverText,
              },
            ]}
            layout={{
              autosize: true,
              title: {
                text: isNarrow
                  ? "Top 10 Most Common<br>Topics Of Bans" +
                    "<br><span style='font-size:11px; color:#cfcfcf'>count of news articles</span>"
                  : "Top 10 Most Common Topics Of Bans" +
                    "<br><span style='font-size:12px; color:#cfcfcf'>count of news articles</span>",
                x: 0.5,
                xanchor: "center",
                font: {
                  size: isNarrow ? 14 : 18,
                  color: "#ffffff",
                },
              },
              margin: { t: 75, b: 80, l: 45, r: 20 },
              xaxis: { fixedrange: true },
              yaxis: { fixedrange: true },
              paper_bgcolor: "rgba(88, 94, 100, 0)",
              plot_bgcolor: "rgba(88, 94, 100, 0)",
              font: { color: "#ffffff" },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              scrollZoom: false,
              doubleClick: false,
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
            onAfterPlot={() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  window.dispatchEvent(new Event("resize"));
                  if (onContentReadyRef.current) onContentReadyRef.current();
                });
              });
            }}
          />
        ) : (
          <Plot
            data={[
              {
                type: "choropleth",
                locationmode: "USA-states",
                locations: mapRows.map((d) => d.abbrev),
                z: mapRows.map((d) => d.count),
                text: mapRows.map(
                  (d) => `${d.state}<br>Articles: ${d.count}<br>Topics: ${d.topics || "N/A"}`
                ),
                hoverinfo: "text",
                colorscale: "Reds",
                colorbar: {
                  title: "Articles",
                  thickness: 15,
                  tickfont: { color: "#ffffff" },
                  titlefont: { color: "#ffffff" },
                },
              },
            ]}
            layout={{
              autosize: true,
              title: {
                text: "News Articles About Bans by State" +
                  "<br><span style='font-size:12px; color:#cfcfcf'>count of news articles</span>",
                x: 0.5,
                xanchor: "center",
                font: { size: isNarrow ? 14 : 18, color: "#ffffff" },
              },
              geo: {
                scope: "usa",
                showlakes: false,
                bgcolor: "rgba(0,0,0,0)",
                lakecolor: "rgba(0,0,0,0)",
                landcolor: "rgba(50,50,50,0.3)",
              },
              margin: { t: 75, b: 20, l: 20, r: 20 },
              paper_bgcolor: "rgba(88, 94, 100, 0)",
              font: { color: "#ffffff" },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              scrollZoom: false,
              doubleClick: false,
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
            onAfterPlot={() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  window.dispatchEvent(new Event("resize"));
                  if (onContentReadyRef.current) onContentReadyRef.current();
                });
              });
            }}
          />
        )}
          {Array.isArray(filteredDetailData) && filteredDetailData.length > 0 && (
            <div className="news-detail-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>State</th>
                    <th>Topic</th>
                    <th>Source</th>
                    <th>Headline</th>
                  </tr>
                </thead>
                <tbody>
                  {[...filteredDetailData].sort((a, b) => {
                    // sort table by date (copy first — never mutate the memoized array)
                    const da = parseAlertDate(a.alert_date);
                    const db = parseAlertDate(b.alert_date);

                    // Push invalid or missing dates to the bottom
                      if (!da) return 1;
                      if (!db) return -1;

                    return db - da;
                  })
                      // 🔢 Pagination (adjust number as needed)
                  .slice(0, 100)
                  .map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        {row.alert_date
                          ? new Date(row.alert_date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>{row.state || "—"}</td>
                      <td>{row.target || "—"}</td>
                      <td>{row.datasource || "—"}</td>
                      <td>
                        {typeof row.article_links === "string" &&
                        row.article_links.startsWith("http") ? (
                          <a
                            href={row.article_links}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.headlines}
                          </a>
                        ) : (
                          row.headlines || "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
  </div>
</div>
  );
}
