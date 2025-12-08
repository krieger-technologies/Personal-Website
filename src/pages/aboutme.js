import React from 'react';
import '../styles/aboutme.css';

/* function AboutMe() { */
const AboutMe = () => {
  return (
    <div className="AboutMe">
      <div className="AboutMeContent">
        <h1>About Me</h1>
        <p className='indent'>
          My current professional interests revolve around data engineering and data science. I enjoy being able to automate
          processes that free up time and monotonous work for people (and especially myself) as well as delivering clean data and
          insights. I also find machine learning fascinating and being able to distill trends and corrolations from real world
          data that can be effectively applied to the goal or task at hand.
          </p>
          <p className='indent'>
          Outside of computers and tech I enjoy staying active by going to the gym, running, stumbling through some intro swing dance
          classes, camping, swimming, and cooking to name a few things! I have also been enjoying reading books by Andy Greenberg. Typically
          these are non-fiction journalistic type books about hackers and how the tech space can affect real world scenarios and organizations.
          Below I have included some of my recent favorites.
          <ul>
            <li><strong>Sandworm:</strong> A New Era of Cyberwar and the Hunt for the Kremlin's Most Dangerous Hackers, 2019 Andy Greenberg</li>
            <li><strong>The Cuckoos Egg:</strong> Tracking a Spy Through the Maze of Computer Espionage, 1989 Cliff Stoll</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default AboutMe;