import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function NewsScraperCard({
  newsSummaryBarChartUrl,
  newsDetailTableUrl,
  onContentReady
})

 {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 600);
  const [detailData, setDetailData] = useState(null);

    console.log("NewsScraperCard render", {
    newsSummaryBarChartUrl,
    newsDetailTableUrl
  });


  useEffect(() => {
    if (!newsSummaryBarChartUrl) return;


    let isMounted = true;

    // --- Responsive width logic ---
    const updateWidth = () => {
      setIsNarrow(window.innerWidth < 600);
    };

    // Set immediately on mount
    updateWidth();

    // Listen for resize / orientation change
    window.addEventListener("resize", updateWidth);

    // --- Fetch data ---
    fetch(newsSummaryBarChartUrl, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then((text) => {
          if (!isMounted) return;

          console.log(
            "RAW SUMMARY RESPONSE (first 200 chars):",
            text.slice(0, 200)
          );

          const data = JSON.parse(text); // this will likely throw
          const records = Array.isArray(data)
            ? data
            : data.data || data.records || [];

          setChartData(records);
          // 🔑 Force Swiper to re-measure once content exists
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (onContentReady) onContentReady();
            });
          });
        })
      .catch((err) => {
        if (!isMounted) return;
        console.error("JSON fetch failed:", err);
        setError("Network error while loading chart data");
      });
      // read in for detail table
    fetch(newsDetailTableUrl, { cache: "no-store" })
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
  }, [newsSummaryBarChartUrl, newsDetailTableUrl]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(chartData)) return <p>Loading chart…</p>;
  if (chartData.length === 0) return <p>No news data available.</p>;

  const x = chartData.map(d => d.target);
  const y = chartData.map(d => d.count_of_news_articles || 0);
  const hoverText = chartData.map(
    d =>
      `States: ${d.states || "N/A"}<br>` +
      `Count: ${d.count_of_news_articles || 0}`
  );

  return (
    <div className="news-scraper-card">
      <div className="news-content">
      <div className="news-plot-wrap">
        <div className="plot-scroll-overlay" />
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

              // ✅ Reliable title + subtitle (works in prod)
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
              // ✅ Give Plotly enough space for title + bars
              margin: {
                t: 75,
                b: 80,
                l: 45,
                r: 20,
              },
                xaxis: {
                  fixedrange: true
                },
                yaxis: {
                  fixedrange: true
                },

              paper_bgcolor: "rgba(88, 94, 100, 0)",
              plot_bgcolor: "rgba(88, 94, 100, 0)",
              font: { color: "#ffffff" },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              scrollZoom: false, // disable scroll zoom
              doubleClick: false // disable zoom
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
            onAfterPlot={() => {
              // ✅ Forces carousel + Plotly to re-measure in prod
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  window.dispatchEvent(new Event("resize"));
                  if (onContentReady) onContentReady();
                });
              });
            }}
          />
          {Array.isArray(detailData) && detailData.length > 0 && (
            <div className="news-detail-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>State</th>
                    <th>Topic</th>
                    <th>Headline</th>
                  </tr>
                </thead>
                <tbody>
                  {detailData.slice(0, 50).map((row, idx) => (
                    <tr key={idx}>
                      <td>{new Date(row.alert_date).toLocaleDateString()}</td>
                      <td>{row.state}</td>
                      <td>{row.target || "—"}</td>
                      <td>
                        {row.article_links?.startsWith("http") ? (
                          <a
                            href={row.article_links}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.headlines}
                          </a>
                        ) : (
                          row.headlines
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
