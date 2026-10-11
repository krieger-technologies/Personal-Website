import '../styles/projects.css';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import NewsScraperExplanation from '../components/cards/NewsScraperExplanation';
import AiMigrationCard from '../components/cards/AiMigration';
import HoneypotCard from '../components/cards/Honeypot';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function Projects() {
  const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "News Scraper - Methodology", component:NewsScraperExplanation},
    // { title: "AI-Assisted Migration", component: AiMigrationCard },
    { title: "Cowrie SSH Honeypot", component: HoneypotCard },
    // { title: "Home Lab Setup", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);

  // Drop the top/bottom fade at either end of the scroll so the first and last lines stay readable
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const checkBottom = useCallback(() => {
    const el = firstProjectRef.current;
    if (!el) return;
    setAtTop(el.scrollTop <= 1);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  // also when content changes height (card switches, data/charts loading) or the window resizes
  useEffect(() => {
    const el = firstProjectRef.current;
    if (!el) return;
    checkBottom();
    const observer = new ResizeObserver(checkBottom);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    window.addEventListener('resize', checkBottom);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkBottom);
    };
  }, [checkBottom]);

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
      <div
        className={`FirstProject${atTop ? ' at-top' : ''}${atBottom ? ' at-bottom' : ''}`}
        ref={firstProjectRef}
        onScroll={checkBottom}
      >
        <h1>Projects</h1>
        <p>
          Personal projects I've built to learn new tools and dig into topics I find interesting.
        </p>
            <ol>
            <li><b>News Scraper</b> - Live results & basic analytics about bans in news headlines across the U.S.</li>
            <li><b>News Scraper : </b><i>Methodology</i> - How the pipeline collects, tags, and publishes the data</li>
            <li><b>Honeypot / Cybersecurity</b> - [IN PROGRESS] Exploration into collecting & analyzing live botnet traffic safely</li>
            </ol>

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