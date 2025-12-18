import { useState, useEffect } from "react";

export default function S3JsonTest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Replace this with the public URL or pre-signed URL of your S3 JSON
  const s3JsonUrl = "https://s3.amazonaws.com/krieger-technologies.com/news_data/news_data.json";

  useEffect(() => {
    console.log("Fetching JSON from S3:", s3JsonUrl);

    fetch(s3JsonUrl)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((jsonData) => {
        console.log("Fetched JSON data:", jsonData);
        setData(jsonData);
      })
      .catch((err) => {
        console.error("Error fetching JSON:", err);
        setError(err.message);
      });
  }, [s3JsonUrl]);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading JSON...</p>;

  return (
    <div>
      <h2>JSON fetched from S3:</h2>
      <pre style={{ maxHeight: "400px", overflow: "auto" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}