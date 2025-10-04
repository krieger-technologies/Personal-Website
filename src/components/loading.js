import React, { useState, useEffect } from 'react';
import '../styles/loading.css';
import { RiseLoader } from 'react-spinners';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulates a loading phase, can be replaced with real loading logic
    const timer = setTimeout(() => setLoading(false), 3000); // Adjust time as needed
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div>
      {loading && (
        <div className="loading-spinner">
          <RiseLoader color="#3498db" size={10} />
        </div>
      )}
      <div className="page-content">
        {/* Your actual page content goes here */}
      </div>
    </div>
  );
};

export default Loading;
