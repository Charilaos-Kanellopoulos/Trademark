import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import Nav from '../Nav';

type Props = {
  video: string;
  title: string;
  subtitle?: string;
  /** ms ανά χαρακτήρα για τον τίτλο (default 50) */
  titleSpeedMs?: number;
  /** ms ανά χαρακτήρα για το υπότιτλο (default 50) */
  subtitleSpeedMs?: number;
  /** αρχική καθυστέρηση έναρξης σε ms (default 300) */
  startDelayMs?: number;
  /** καθυστέρηση μετά τον τίτλο πριν ξεκινήσει το υπότιτλο (default 300) */
  delayAfterTitleMs?: number;
};

const Hero: React.FC<Props> = ({
  video,
  title,
  subtitle,
  titleSpeedMs = 50,
  subtitleSpeedMs = 50,
  startDelayMs = 300,
  delayAfterTitleMs = 300,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');

  const [titleComplete, setTitleComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);

  const titleIntervalRef = useRef<number | null>(null);
  const subtitleIntervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const subtitleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // reset state
    setDisplayedTitle('');
    setDisplayedSubtitle('');
    setTitleComplete(false);
    setSubtitleComplete(false);

    // clear any running timers
    if (titleIntervalRef.current) window.clearInterval(titleIntervalRef.current);
    if (subtitleIntervalRef.current) window.clearInterval(subtitleIntervalRef.current);
    if (startTimeoutRef.current) window.clearTimeout(startTimeoutRef.current);
    if (subtitleTimeoutRef.current) window.clearTimeout(subtitleTimeoutRef.current);

    startTimeoutRef.current = window.setTimeout(() => {
      // --- Title typing ---
      let i = 0;
      titleIntervalRef.current = window.setInterval(() => {
        if (i < title.length) {
          setDisplayedTitle(title.slice(0, i + 1));
          i++;
        } else {
          if (titleIntervalRef.current) window.clearInterval(titleIntervalRef.current);
          titleIntervalRef.current = null;
          setTitleComplete(true);

          // Ξεκίνα υπότιτλο μετά από μικρή καθυστέρηση
          if (subtitle) {
            subtitleTimeoutRef.current = window.setTimeout(() => {
              let j = 0;
              subtitleIntervalRef.current = window.setInterval(() => {
                if (j < subtitle.length) {
                  setDisplayedSubtitle(subtitle.slice(0, j + 1));
                  j++;
                } else {
                  if (subtitleIntervalRef.current) window.clearInterval(subtitleIntervalRef.current);
                  subtitleIntervalRef.current = null;
                  setSubtitleComplete(true);
                }
              }, Math.max(10, subtitleSpeedMs));
            }, delayAfterTitleMs);
          }
        }
      }, Math.max(10, titleSpeedMs));
    }, Math.max(0, startDelayMs));

    // cleanup on unmount/prop change
    return () => {
      if (titleIntervalRef.current) window.clearInterval(titleIntervalRef.current);
      if (subtitleIntervalRef.current) window.clearInterval(subtitleIntervalRef.current);
      if (startTimeoutRef.current) window.clearTimeout(startTimeoutRef.current);
      if (subtitleTimeoutRef.current) window.clearTimeout(subtitleTimeoutRef.current);
    };
  }, [title, subtitle, titleSpeedMs, subtitleSpeedMs, startDelayMs, delayAfterTitleMs]);

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
          <h1 className="typewriter-title">
            {displayedTitle}
            <span className={`cursor ${titleComplete ? 'hide' : ''}`} aria-hidden>
              |
            </span>
          </h1>

          {subtitle && (
            <p className="subtitle typewriter-subtitle">
              {displayedSubtitle}
              <span className={`cursor ${subtitleComplete ? 'hide' : ''}`} aria-hidden>
                |
              </span>
            </p>
          )}

          <div className="hero-cta">
            <a href="#why" className="button-hero-cta">
              Περισσότερες Πληροφορίες
            </a>
          </div>
        </div>
        <div className="hero-shape" aria-hidden></div>
      </div>
    </header>
  );
};

export default Hero;