import React from 'react';
import '../styles/projects.css';
// import '../styles/graph-container.css';
import CovidGraphic from '../charts/covid.js';

/* function Projects() { */
const Projects = () => {
  return (
    <div className="Projects">
      <div className="FirstProject">
        <h1>Projects</h1>
        <p>
          Projects page is currently undergoing a large overhaul.<br/>
          I am currently working on moving a local ETL pipeline I built onto an AWS lambda instance that will be able to pull live data
          from the web and create an interractive dashboard. 
          I have currently hit some roadblocks related to importing the packages I need into the function/layers so I am currently exploring
          some creative solutions to work around that.
          <br/>
          <br/>
          <br/>
          Below is a graphic I made in a similar exercise in the past.<br/>
          Although I do like plotly for small personal projects and graphics, the interactivity does not show as well as part of a website like this as well as it feels quite clunky on mobile.

        </p>
        <div className='graph-container'>
        <CovidGraphic />
        </div>
      </div>
    </div>
  );
}

export default Projects;