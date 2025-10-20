import React, { useEffect, useRef, useState } from 'react';
import './Landing.css';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && btnRef.current && !btnRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false);
    }

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // lock body scroll when menu is open on mobile
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('nav-open');
      // small safeguard
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
  }, [open]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Smooth scroll with offset for anchor links
  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();
        const nav = document.querySelector('.nav.scrolled') as HTMLElement;
        const navHeight = nav ? nav.offsetHeight : 80;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect.top + scrollTop - navHeight - 8; // 8px extra space
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`nav site-nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main">
      <div className="nav-inner">
        <div className="brand">
          <a href="/" aria-label="Trademark home">
            <img 
              className="brand-img" 
              src={scrolled ? "/light-blue-logo.png" : "/white-logo.png"} 
              alt="Trademark Radar logo" 
            />
          </a>
          <span className='brand-name'>Trademark Radar</span>
        </div>

        <button
          ref={btnRef}
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul
          id="primary-navigation"
          ref={menuRef}
          className={`nav-links ${open ? 'open' : ''}`}
          role="menu"
        >
          <li role="none"><a role="menuitem" href="#why" onClick={onLinkClick} className="nav-link">Γιατί δημιουργήθηκε;</a></li>
          <li role="none"><a role="menuitem" href="#how" onClick={onLinkClick} className="nav-link">Πώς λειτουργεί;</a></li>
          <li role="none"><a role="menuitem" href="#who" onClick={onLinkClick} className="nav-link">Σε ποιους απευθύνεται;</a></li>
          <li role="none"><a role="menuitem" href="#pricing" onClick={onLinkClick} className="nav-link">Τιμές</a></li>
          <li role="none"><a role="menuitem" href="#contact" onClick={onLinkClick} className="nav-link">Επικοινωνία</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
