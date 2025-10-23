import React from 'react';
import './Hero.css';
import Nav from '../Nav';

type Props = {
  video: string;
  title: string;
  subtitle?: string;
};

const Hero: React.FC<Props> = ({
  video,
  title,
  subtitle,
}) => {
  return (
    <header className="hero-hero" role="banner">
      {/* Background video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
        Το πρόγραμμα περιήγησής σας δεν υποστηρίζει video.
      </video>
      <Nav />

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content container">
        <div className="hero-text">
          <h1 className="hero-title slide-in-left">
            {title}
          </h1>

          {subtitle && (
            <h4 className="hero-subtitle slide-in-left-delayed">
              {subtitle}
            </h4>
          )}

          <div className="hero-cta">
            <a href="#why" className="button-hero-cta">
              Περισσότερες Πληροφορίες
            </a>
            <a href="tel:+302103387344" aria-label="Phone" className="button-hero-cta">
              Καλέστε μας
            </a>
          </div>
        </div>
        <div className="hero-shape" aria-hidden></div>
      </div>
    </header>
  );
};

export default Hero;
