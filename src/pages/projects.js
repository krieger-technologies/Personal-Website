import '../styles/projects.css';
import CovidGraphic from '../charts/covid.js';
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';
import { useRef } from 'react';

export default function Projects() {
  const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "Home Lab Setup", component: HomeLabCard }
  ];

  const firstProjectRef = useRef(null);
  const carouselRef = useRef(null); // new ref for carousel container

  return (
    <div className="Projects">
      <div className="FirstProject" ref={firstProjectRef}>
        <h1>Projects</h1>
        <p>
          Projects page is currently undergoing a large overhaul.<br/><br/>
          Below I have a graphic from a project I worked on in the past charting covid and vaccination data. I like the dynamic
          flexibility of plotly charts on desktop but you can see that the functionality doesn't scale well onto a mobile environment.
        </p>
        <div className="graph-container">
          <CovidGraphic />
        </div>

        {/* Embed carousel inside opaque content box */}
        <div style={{ marginTop: "30px" }} ref={carouselRef}>
          <ProjectCarousel projects={projectData} parentRef={firstProjectRef} carouselRef={carouselRef} />
        </div>
      </div>
    </div>
  )
};