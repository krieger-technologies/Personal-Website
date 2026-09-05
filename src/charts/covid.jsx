// src/components/PlotlyIframe.js
import React from 'react';
import '../styles/covidgraphic.css';

const CovidGraphic = () => {
  return (
    <div className='covidHTML'>
    <iframe
      src="/covid graphic.html"
      title="Covid Graphic"
      style={{
        width: '100%',
        height: '468px',
        border: 'none',
        backgroundColor: 'transparent' // Make sure iframe background is transparent
    }}
    ></iframe>
    </div>
  );
};

export default CovidGraphic;