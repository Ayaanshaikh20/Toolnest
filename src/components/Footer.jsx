import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Heart, ArrowUpRight } from 'lucide-react';

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
              Free, private online utilities engineered for developers, creators, students, and everyday productivity. 100% client-side computing — your files never leave your device.
            </p>
            <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Shield size={14} style={{ color: 'var(--success-color)' }} /> Zero server uploads guaranteed
            </div>
          </div>

          <div className="footer-column">
            <h4>Popular Tools</h4>
            <ul className="footer-links">
              <li><Link to="/tools/pdf-signer">Free PDF Signer</Link></li>
              <li><Link to="/tools/svg-to-png">SVG to PNG Converter</Link></li>
              <li><Link to="/tools/pdf-compressor">PDF Compressor</Link></li>
              <li><Link to="/tools/json-formatter">JSON Formatter</Link></li>
              <li><Link to="/tools/qr-code-generator">QR Code Generator</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Organization</h4>
            <ul className="footer-links">
              <li><Link to="/about">About & Creator</Link></li>
              <li><Link to="/blog">Engineering Blog</Link></li>
              <li><Link to="/contact">Contact & Bug Reports</Link></li>
              <li>
                <a href="https://portfolio.shaikhayaan.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  Ayaan's Portfolio <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal & Trust</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p style={{ margin: 0 }}>
              &copy; {currentYear} ToolNest &bull; Designed &amp; Developed by{' '}
              <a 
                href="https://portfolio.shaikhayaan.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--text-main)', fontWeight: '600', textDecoration: 'underline' }}
              >
                Muhammad Ayaan Shaikh
              </a>.
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-light)' }}>
              Client-Side Processing Engine &bull; Zero Server Storage &bull; Open Web Standards
            </p>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            v2.4 &bull; All 32 Tools Operational
          </div>
        </div>
      </div>
    </footer>
  );
};
