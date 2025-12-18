import '../styles/projects.css';
import CovidGraphic from '../charts/covid.js';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import { useRef, useState, useEffect } from 'react';

export default function Projects() {
  const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "Home Lab Setup", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);
  const carouselRef = useRef(null);

  // --- Step 1: fetch latest pre-signed URL ---
  const [s3JsonUrl, setS3JsonUrl] = useState(null);

  useEffect(() => {
    setS3JsonUrl(
      "https://d25vlaal36g4hr.cloudfront.net/news_data/public_news_data.json"
    );
  }, []);

  return (
    <div className="Projects">
      <div className="FirstProject" ref={firstProjectRef}>
        <h1>Projects</h1>
        <p>Projects page is currently undergoing a large overhaul...</p>

        <div className="graph-container">
          <CovidGraphic />
        </div>

        <div style={{ marginTop: "30px" }} ref={carouselRef}>
        <ProjectCarousel
          projects={projectData}
          parentRef={firstProjectRef}
          carouselRef={carouselRef}
          s3JsonUrl={s3JsonUrl}
        />
        </div>
      </div>
    </div>
  );
}