import React, { useState } from 'react';
import '../styles/navbar.css';

// version 01
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to show/hide the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/aboutme">About Me</a></li>
        <li><a href="/resume">Resume</a></li>
        <li><a href="/projects">Projects</a></li>
        {/* <li><a href="/blog">Blog</a></li> */}
        {/* <li><a href="/contact">Contact</a></li> */}
      </ul>
    </nav>
  );
}
export default Navbar;