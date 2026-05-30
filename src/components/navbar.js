import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

// version 02
function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</a></li>
        <li><a href="/resume" className={location.pathname === '/resume' ? 'active' : ''}>Resume</a></li>
        <li><a href="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;