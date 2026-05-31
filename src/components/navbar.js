import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

const links = [
  { path: '/home',     label: 'Home' },
  { path: '/resume',   label: 'Resume' },
  { path: '/projects', label: 'Projects' },
];

function Navbar() {
  const location = useLocation();
  const activeIndex = links.findIndex(l => l.path === location.pathname);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {links.map((link, i) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
              {activeIndex === i && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;