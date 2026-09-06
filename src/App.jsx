import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { RiseLoader } from 'react-spinners';
import Navbar from './components/navbar';
import Home from './pages/home';
import Resume from './pages/resume';

// Projects pulls in Plotly (~4 MB) — load its chunk only when the route is visited.
const Projects = lazy(() => import('./pages/projects'));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const RouteFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '25vh' }}>
    <RiseLoader color="#3498db" size={10} />
  </div>
);

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
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
