import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navbar';
import Home from './pages/home';
import Resume from './pages/resume';
import Projects from './pages/projects';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

export default function App() {
  const location = useLocation();

  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          <Routes location={location}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}