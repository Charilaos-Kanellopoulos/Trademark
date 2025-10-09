import React from 'react';
import './Hero.css';

type Props = {
  video: string;
  title: string;
  subtitle?: string;
};

const Hero: React.FC<Props> = ({ video, title, subtitle }) => {
  return (
    <header className="hero-hero" role="banner">
      {/* Background video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
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
