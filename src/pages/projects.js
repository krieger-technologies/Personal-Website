import '../styles/projects.css';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import NewsScraperExplanation from '../components/cards/NewsScraperExplanation';
import { useRef, useState, useEffect } from 'react';

export default function Projects() {
  const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "News Scraper - Methodology", component:NewsScraperExplanation},
    { title: "Home Lab Setup", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);
  const carouselRef = useRef(null);

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
          This page showcases a collection of personal projects I've built to expand my technical skills and explore new tools and frameworks. 
          Each one reflects a genuine interest in solving real problems and continuing to grow as a developer.</p>
          <p>
          In fact, this website is itself one of those projects. It has served as a hands-on introduction to JavaScript, Linux, AWS, and web development, 
          and has been as rewarding to build as it has been challenging. Looking ahead, I'm interested in exploring lower-level and more foundational 
          languages and frameworks, both to reduce dependency risk from frequent package updates and to deepen my understanding of how things work under 
          the hood. For now, React has been an effective tool for the job. Building and refining the nested project cards below, along with the scroll 
          behavior between them, was one of the more demanding and satisfying parts of the process. Automation is powerful, but a smooth, polished user 
          experience is what makes it accessible and worthwhile.
        </p>

        <div style={{ marginTop: "30px" }} ref={carouselRef}>
        <ProjectCarousel
          projects={projectData}
          parentRef={firstProjectRef}
          carouselRef={carouselRef}
          newsSummaryBarChartUrl={newsSummaryBarChartUrl}
          newsDetailTableUrl={newsDetailTableUrl}
          newsMetadataUrl={newsMetadataUrl}
        />
        </div>
      </div>
    </div>
  );
}