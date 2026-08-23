import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';

export const Header = () => {
  const location = useLocation();

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
              <Link to="/tools" className={`nav-link ${isActive('/tools') || location.pathname.startsWith('/tools/') ? 'active' : ''}`}>
                All Tools
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
          <Link to="/tools" className="btn btn-primary btn-sm">
            Explore Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
};
