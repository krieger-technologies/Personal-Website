import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/navbar';
import Loading from './components/loading';
import Home from './pages/home';
import AboutMe from './pages/aboutme';
import Resume from './pages/resume';
import Projects from './pages/projects';
import Blog from './pages/blog';
import Contact from './pages/contact';

// version 04 - includes loading spinner
export default function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating loading delay for demo purposes

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </div>
  );
}
