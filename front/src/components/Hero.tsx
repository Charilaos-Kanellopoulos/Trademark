import React from 'react';
import './Hero.css';

type Props = {
  image: string;
  title: string;
  subtitle?: string;
};

const Hero: React.FC<Props> = ({ image, title, subtitle }) => {
  return (
    <header className="hero-hero" role="banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="hero-text">
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
        <div className="hero-shape" aria-hidden></div>
      </div>
    </header>
  );
};

export default Hero;
