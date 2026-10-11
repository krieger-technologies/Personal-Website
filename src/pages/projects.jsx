import '../styles/projects.css';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import NewsScraperExplanation from '../components/cards/NewsScraperExplanation';
import AiMigrationCard from '../components/cards/AiMigration';
import HoneypotCard from '../components/cards/Honeypot';
import { useRef, useState, useEffect } from 'react';

export default function Projects() {
  const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "News Scraper - Methodology", component:NewsScraperExplanation},
    // { title: "AI-Assisted Migration", component: AiMigrationCard },
    { title: "Cowrie SSH Honeypot", component: HoneypotCard },
    // { title: "Home Lab Setup", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);

  // --- Step 1: fetch latest URL ---
  const [newsSummaryBarChartUrl, setNewsSummaryBarChartUrl] = useState(null);
  const [newsDetailTableUrl, setNewsDetailTableUrl] = useState(null);
  const [newsMetadataUrl, setNewsMetadataUrl] = useState(null);

useEffect(() => {
  setNewsSummaryBarChartUrl(
    "/news_data/public_news_data_bar_chart.json"
  );
  setNewsDetailTableUrl(
    "/news_data/public_news_detail_table.json"
  );
  setNewsMetadataUrl(
    "/news_data/last_run_timestamp.json"
  );
}, []);

  return (
    <div className="Projects">
      <div className="FirstProject" ref={firstProjectRef}>
        <h1>Projects</h1>
        <p>
          This page showcases a collection of personal projects I've built to expand my technical skills and explore new areas of interest.</p>
          <p>
            <ol>
            <li>News Scraper - Exploration into creating a live news scraper + basic analytics</li>
            <li>News Scraper - Methodology</li>
            <li>Honeypot / Cybersecurity - [IN PROGRESS] Exploration into collecting & analyzing botnet live botnet traffic safely</li>
            </ol>
        </p>

        <div style={{ marginTop: "30px" }}>
        <ProjectCarousel
          projects={projectData}
          parentRef={firstProjectRef}
          newsSummaryBarChartUrl={newsSummaryBarChartUrl}
          newsDetailTableUrl={newsDetailTableUrl}
          newsMetadataUrl={newsMetadataUrl}
        />
        </div>
      </div>
    </div>
  );
}