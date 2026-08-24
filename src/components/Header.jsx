import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, Sun, Moon, Menu, X, Search } from 'lucide-react';

export const Header = ({ onOpenCommandPalette }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('toolnest_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('toolnest_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('toolnest_theme', 'light');
    }
  }, [isDarkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="ToolNest Homepage">
          <div className="logo-icon">
            <Wrench size={20} />
          </div>
          <div className="logo-text">
            Tool<span>Nest</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="header-cta">
          {/* Ctrl+K Search Button */}
          <button
            onClick={onOpenCommandPalette}
            className="cmd-search-btn"
            aria-label="Open tool search (Ctrl+K)"
            title="Search tools (Ctrl+K)"
          >
            <Search size={15} />
            <span className="cmd-search-text">Search tools...</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="btn btn-outline btn-sm theme-toggle-btn"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ borderRadius: '999px', padding: '0.4rem 0.75rem' }}
          >
            {isDarkMode
              ? <Sun size={16} style={{ color: '#F59E0B' }} />
              : <Moon size={16} style={{ color: '#6366F1' }} />
            }
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="mobile-nav-drawer" role="dialog" aria-modal="true">
          {/* Mobile Search */}
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
            }}
          >
            <Search size={16} />
            Search tools...
          </button>
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
