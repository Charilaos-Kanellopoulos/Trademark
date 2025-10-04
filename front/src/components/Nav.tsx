import React, { useState } from 'react';
import './Landing.css';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav site-nav">
      <div className="nav-inner">
        <div className="brand">
          <img src="/Trademark-Radar.png" alt="Company logo" />
          <span className="brand-name">Trademark</span>
        </div>

        {/* hamburger for mobile */}
        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(prev => !prev)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Expertise</a></li>
          <li><a href="#" className="nav-link">People</a></li>
          <li><a href="#" className="nav-link">International</a></li>
          <li><a href="#" className="nav-link">Insights</a></li>
          <li><a href="#" className="nav-link">Join us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
