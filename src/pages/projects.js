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


  useEffect(() => {
    setNewsSummaryBarChartUrl(
      process.env.NODE_ENV === "development"
        ? "https://krieger-technologies.com/news_data/public_news_data_bar_chart.json"
        : "/news_data/public_news_data_bar_chart.json"
    );


    setNewsDetailTableUrl(
      process.env.NODE_ENV === "development"
        ? "https://krieger-technologies.com/news_data/public_news_detail_table.json"
        : "/news_data/public_news_detail_table.json"
    );
  }, []);

  return (
    <div className="Projects">
      <div className="FirstProject" ref={firstProjectRef}>
        <h1>Projects</h1>
        <p className='indent'>
          This page is dedicated to various personal projects I've taken to in order to 
          expand my knowledge and capabilities, but most importantly just to keep challenging
          myself and see how far I can take this hobby of mine!</p>
          <p className='indent'>
          First and foremost this entire website should be taken as a personal project. It has been 
          both immensely challenging and immensely rewarding; serving as a practical use case for me to
          start delving into javascript, linux, and webdev.
          Particularly nesting the project cards below and polishing up the scroll behavior between one card 
          and the next proved to be an especially challenging and rewarding task. Automation is fun but a smooth
          user experience makes it easier for everyone to appreciate, especially if the less asthetic backend stuff
          doesn't grab you as much.
        </p>

        <div style={{ marginTop: "30px" }} ref={carouselRef}>
        <ProjectCarousel
          projects={projectData}
          parentRef={firstProjectRef}
          carouselRef={carouselRef}
          newsSummaryBarChartUrl={newsSummaryBarChartUrl}
          newsDetailTableUrl={newsDetailTableUrl}
        />
        </div>
      </div>
    </div>
  );
}