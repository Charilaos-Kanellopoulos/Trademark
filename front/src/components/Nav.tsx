import React from 'react';
import './Landing.css';

const Nav: React.FC = () => {
  return (
    <nav className="nav site-nav">
      <div className="nav-inner">
        <div className="brand">
          <img src="/Trademark-Radar.png" alt="Company logo" />
          <span className="brand-name">Trademark</span>
        </div>
        <ul className="nav-links">
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
