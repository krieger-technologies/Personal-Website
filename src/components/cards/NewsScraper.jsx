import { useState, useEffect, useRef } from "react";
import Plot from "./Plot";

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
  // per-date-range aggregates precomputed by the ETL (chart, map, counts)
  const [summary, setSummary] = useState(null);
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

    // --- Chart/map summary ---
    fetch(withVersion(newsSummaryBarChartUrl, dataVersion))
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setSummary(data);
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

    // --- Row-level detail table (latest rows only, newest first) ---
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
  // Chart, map and counts for the selected range come precomputed from the
  // ETL (windows anchored to the nightly run), so only small files are fetched.
  const rangeSummary = summary?.windows?.[dateRange];
  const chartRows = rangeSummary?.top_targets ?? [];
  const mapRows = rangeSummary?.states ?? [];

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!summary) return <p>Loading chart…</p>;
  if (!summary.total_articles) return <p>No news data available.</p>;

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

        {/* DATE RANGE FILTER (chart + map; the table always shows the latest rows) */}
         <div className="news-filters">
           <label className="news-filter-label">
             Date range:&nbsp;
             <select
               value={dateRange}
               onChange={(e) => setDateRange(e.target.value)}
             >
               <option value="7d">Last 7 days</option>
               <option value="30d">Last 30 days</option>
               <option value="60d">Last 60 days</option>
               <option value="90d">Last 90 days</option>
               <option value="all">All time</option>
             </select>
           </label>
         </div>
         <div className="news-filter-stats">
           Parsing {rangeSummary?.article_count ?? 0} of{" "}
           {summary.total_articles} articles
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
          {Array.isArray(detailData) && detailData.length > 0 && (
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
                  {/* already newest first and capped at 100 by the ETL */}
                  {detailData.map((row, idx) => (
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
