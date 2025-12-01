import '../styles/projects.css';
import CovidGraphic from '../charts/covid.js';
// import ProjectCarousel and cards
import ProjectCarousel from '../components/ProjectCarousel';
import NewsScraperCard from '../components/cards/NewsScraper';
import HomeLabCard from '../components/cards/HomeLab';

export default function Projects() {
    const projectData = [
    { title: "News Scraper", component: NewsScraperCard },
    { title: "Home Lab Setup", component: HomeLabCard }
  ];
  return (
    <div className="Projects">
      <div className="FirstProject">
        <h1>Projects</h1>
        <p>
          Projects page is currently undergoing a large overhaul.<br/><br/>
          I am currently trying to move a local ETL pipeline I wrote in python onto my AWS instance to run live and provide automated and up-to-date
          graphics and data to my website, however I ran into some size restrictions in the lambda/layers environment so I am currently exploring
          some creative solutions on how to work around this.
        </p>

        <div className="graph-container">
          <CovidGraphic />
        </div>
        
        {/* Embed carousel inside opaque content box */}
        <div style={{ marginTop: "30px" }}>
          <ProjectCarousel projects={projectData} />
        </div>
      </div>
    </div>
  )
};