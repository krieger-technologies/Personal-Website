import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function NewsScraperCard({ s3JsonUrl }) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!s3JsonUrl) return;

    fetch(s3JsonUrl, { cache: "no-store" })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => {
        const records = Array.isArray(data)
          ? data
          : data.data || data.records || [];

        setChartData(records);
      })
      .catch(err => {
        console.error("JSON fetch failed:", err);
        setError("Network error while loading chart data");
      });
  }, [s3JsonUrl]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!Array.isArray(chartData)) {
    return <p>Loading chart…</p>;
  }

  if (chartData.length === 0) {
    return <p>No news data available.</p>;
  }

  const x = chartData.map(d => d.target);
  const y = chartData.map(d => d.count_of_news_articles || 0);
  const hoverText = chartData.map(
    d =>
      `Datasources: ${d.datasources || "N/A"}<br>` +
      `States: ${d.states || "N/A"}<br>` +
      `Count: ${d.count_of_news_articles || 0}`
  );

  return (
    <div className="news-scraper-card">
      <Plot
        data={[{
          x,
          y,
          type: "bar",
          text: y,
          hoverinfo: "text",
          hovertext: hoverText,
        }]}
        layout={{
          title: "Top 15 News Topics",
          height: 600,
          autosize: true,
          title_x: 0.5,
          margin: { t: 50, b: 150 },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}
