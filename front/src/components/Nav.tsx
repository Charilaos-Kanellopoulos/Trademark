import React from 'react';
import './Landing.css';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <img src="/Trademark-Radar.png" alt="Company logo" />
          <span className="brand-name">Trademark</span>
        </div>
        <ul className="nav-links">
          <li>Services</li>
          <li>About</li>
          <li>Insights</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
