import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <Wrench size={20} />
              </div>
              <div className="logo-text">
                Tool<span>Nest</span>
              </div>
            </Link>
            <p>
              Free online utilities designed for developers, creators, students, and everyday tasks. Fast, private, and 100% browser-based.
            </p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tools">All Tools</Link></li>
              <li><Link to="/tools/json-formatter">JSON Formatter</Link></li>
              <li><Link to="/tools/image-compressor">Image Compressor</Link></li>
              <li><Link to="/tools/password-generator">Password Generator</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal & Privacy</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} ToolNest. All rights reserved. Free Online Tools That Just Work.</p>
          <p>Client-side processing. Your data never leaves your device.</p>
        </div>
      </div>
    </footer>
  );
};
