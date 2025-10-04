import React from 'react';
import '../styles/aboutme.css';

/* function AboutMe() { */
const AboutMe = () => {
  return (
    <div className="AboutMe">
      <div className="AboutMeContent">
        <h1>About Me</h1>
        <p>
          I have always found technology to be incredibly interesting and exciting with the potential it can unlock.
          My interests currently revolve around data engineering and data science. I enjoy being able to automate
          processes that free up time and monotonous work for people (and especially myself) as well as delivering clean data and
          insights. I also find machine learning fascinating and being able to distill trends and corrolations from real world
          data that can be effectively applied to the goal at hand.<br/>
          <br/>I am currently learning how to optimize schemas for distributed data systems and managing applications at the server level.
          I have always liked the idea of pursuing higher education, although I feel like I am still exploring which area I would like
          to further specialize in between data science and statistical learning, and software development and architecture.
        </p>
      </div>
    </div>
  );
}

export default AboutMe;