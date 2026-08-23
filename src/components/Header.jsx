import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, Sun, Moon } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Wrench size={20} />
          </div>
          <div className="logo-text">
            Tool<span>Nest</span>
          </div>
        </Link>

        <nav>
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

        <div className="header-cta">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="btn btn-outline btn-sm"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ borderRadius: '999px', padding: '0.4rem 0.75rem' }}
          >
            {isDarkMode
              ? <Sun size={16} style={{ color: '#F59E0B' }} />
              : <Moon size={16} style={{ color: '#6366F1' }} />
            }
          </button>
        </div>
      </div>
    </header>
  );
};
