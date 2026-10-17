import '../styles/projects.css';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import NewsScraperExplanation from '../components/cards/NewsScraperExplanation';
import AiMigrationCard from '../components/cards/AiMigration';
import HoneypotCard from '../components/cards/Honeypot';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function Projects() {
  // title + blurb also drive the index above the carousel
  const projectData = [
    { title: "News Scraper", blurb: "Live tracking of bans in U.S. news headlines", component: NewsScraperCard },
    { title: "News Scraper - Methodology", blurb: "How the data is collected, tagged, and published", component: NewsScraperExplanation },
    // { title: "AI-Assisted Migration", blurb: "", component: AiMigrationCard },
    { title: "Cyber Security / Cowrie SSH Honeypot", blurb: "Capturing and analyzing live botnet traffic", status: "In progress", component: HoneypotCard },
    // { title: "Home Lab Setup", blurb: "", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);

  // index <-> carousel: clicking an index item jumps to its card; the active card is highlighted
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        <p className="projects-intro">
          Things I've built to learn new tools and dig into what interests me.
        </p>

        <ol className="project-index">
          {projectData.map((proj, i) => (
            <li key={proj.title}>
              <button
                type="button"
                className={i === activeIndex ? 'active' : undefined}
                aria-current={i === activeIndex ? 'true' : undefined}
                onClick={() => swiper?.slideTo(i)}
              >
                <span className="project-index-num">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="project-index-title">{proj.title}</span>
                  {proj.status && <span className="project-index-status">{proj.status}</span>}
                  <span className="project-index-blurb">{proj.blurb}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="projects-carousel-wrap">
          <ProjectCarousel
            projects={projectData}
            parentRef={firstProjectRef}
            onSwiperReady={setSwiper}
            onActiveChange={setActiveIndex}
            newsSummaryBarChartUrl={newsSummaryBarChartUrl}
            newsDetailTableUrl={newsDetailTableUrl}
            newsMetadataUrl={newsMetadataUrl}
          />
        </div>
      </div>
    </div>
  );
}