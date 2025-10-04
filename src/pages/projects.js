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
        <h3>Facebook Prophet</h3>
        <p>As part of our tooling development
          in my time as a Data Analyst with Danone, I was tasked with tweaking Prohpet to our
          business needs and creating the data pipeline that fed into it.<br/>
          For those who may not know, Prohpet is an open source time series forecasting model developed by Facebook that has
          incredibly useful pre-built functions for handling seasonality and holiday effects. As part of my customizations to
          the underlying model I created a custom "holiday" event for COVID-19 so that fluctuations in sales due to the pandemic
          would not affect our future trend predictions.
        </p>
        <h3>This Website</h3>
        <p>I created this website with React javascript and hosted it on AWS. I would like to create future versions of this website 
          in other programming languages and frameworks that are not so subject to the updates that may break websites that React JS 
          is known for. <br />
          I like to use plotly for interractive charts and graphics, however they do not appear to render well on mobile.
          I will continue wrestling with them so I can showcase a clear and simple Projects page. For the best user experience
          of my Project page, please read from desktop.
        </p>
        <h3>COVID-19 Exploration</h3>
        <p>Around summer of 2022 I became curious about what publicly available data I could find
          relating to COVID and seeing if I could find or confirm anything interesting. Just as well
          I had recently discovered the plotly package for python and thought it seemed like an interesting
          avenue to explore some new charting capabilities. Luckily there is no shortage of data on COVID, 
          below are some of the things I found:</p>
          <ul>
            <li>Normalization is the process of forcing a set of numbers down to a common scale so that
              you can more easily compare their individual trends against each other
            </li>
            <li>Due to the vast differenc in scale between COVID cases and deaths, I had to normalize
              these metrics to better compare their trends.
            </li>
          </ul>
          <p>
          If you are unfamiliar with plotly charts; These are interractive charts that allow you to
          filter by tapping on the series you wish to remove in the legend. You can also zoom in by tap/clicking and 
          dragging across the section of the chart you want to zoom in on. To reset your zoom, simply double click/tap
          anywhere on the chart.
        </p>
        <div className='graph-container'>
        <CovidGraphic />
        </div>
      </div>
    </div>
  );
}

export default Projects;