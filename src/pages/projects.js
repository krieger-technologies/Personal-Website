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
        <p className='indent'>
          This page is dedicated to various personal projects I've taken to in order to 
          expand my knowledge and capabilities, but most importantly just to keep challenging
          myself and see how far I can take this hobby!</p>
          <p className='indent'>
          First and foremost this entire website should be taken as a personal project. It has been 
          both immensely challenging and immensely rewarding; serving as a practical use case for me to
          start delving into javascript, linux, AWS, and webdev. In future iterations I would love to explore more basic and fundamental languages and frameworks both to
          avoid package dependency and risk from upgrades breaking functions and logic I rely on, but also to learn a lower and more fundamental level of programming.
          For now, Javascript React gets the job done. 
          Particularly nesting the project cards below and polishing up the scroll behavior between one card 
          and the next proved to be an especially challenging and rewarding task. Automation is fun but a smooth
          user experience makes it easier for everyone to appreciate.
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