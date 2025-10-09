import React, { useEffect, useRef, useState } from 'react';
import './Landing.css';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
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

  const onLinkClick = () => setOpen(false);

  return (
    <nav className="nav site-nav" role="navigation" aria-label="Main">
      <div className="nav-inner">
        <div className="brand">
          <a href="/" aria-label="Trademark home">
            <img className="brand-img" src="/Trademark-Radar.png" alt="Company logo" />
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
