import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, Sun, Moon, Menu, X, Download } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('toolnest_theme') === 'dark';
  });

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const handleAppInstalled = () => setInstallPrompt(null);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

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
          {installPrompt && (
            <button
              onClick={handleInstall}
              className="btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px'
              }}
              title="Install ToolNest Desktop/Mobile App"
            >
              <Download size={14} /> Install App
            </button>
          )}

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
            {installPrompt && (
              <li style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleInstall(); }}
                  className="btn btn-primary btn-md"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Download size={16} /> Install ToolNest App
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
