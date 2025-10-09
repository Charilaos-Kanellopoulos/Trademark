import React from 'react';
import './Landing.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Trademark</div>
        <div className="footer-links"></div>
      </div>
    </footer>
  );
};

export default Footer;
