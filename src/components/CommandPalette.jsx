import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, Zap } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

const ICON_COLORS = {
  pdf: '#EF4444',
  developer: '#3B82F6',
  image: '#8B5CF6',
  text: '#10B981',
  converter: '#F59E0B',
  calculator: '#06B6D4',
  utility: '#6366F1',
  seo: '#EC4899',
};

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [recentTools, setRecentTools] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load recent tools from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('toolnest_recent') || '[]');
      const resolved = stored
        .map(slug => TOOLS_DATA.find(t => t.slug === slug))
        .filter(Boolean)
        .slice(0, 5);
      setRecentTools(resolved);
    } catch { }
  }, [isOpen]);

  // Filter tools when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIdx(0);
      return;
    }
    const q = query.toLowerCase();
    const matched = TOOLS_DATA.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(matched);
    setSelectedIdx(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const navigateToTool = useCallback((tool) => {
    // Track recent tools
    try {
      const stored = JSON.parse(localStorage.getItem('toolnest_recent') || '[]');
      const updated = [tool.slug, ...stored.filter(s => s !== tool.slug)].slice(0, 5);
      localStorage.setItem('toolnest_recent', JSON.stringify(updated));
    } catch { }

    navigate(`/tools/${tool.slug}`);
    onClose();
  }, [navigate, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      const list = query.trim() ? results : recentTools;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, list.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && list[selectedIdx]) {
        navigateToTool(list[selectedIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, recentTools, selectedIdx, query, navigateToTool, onClose]);

  if (!isOpen) return null;

  const displayList = query.trim() ? results : recentTools;
  const showRecent = !query.trim() && recentTools.length > 0;
  const showEmpty = query.trim() && results.length === 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(60px, 12vh, 140px)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          animation: 'cmdPaletteIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1rem',
          borderBottom: displayList.length > 0 || showEmpty ? '1px solid var(--border-color)' : 'none',
        }}>
          <Search size={18} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools... (e.g. 'PDF', 'QR code', 'JSON')"
            autoComplete="off"
            spellCheck="false"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-family)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', padding: '2px' }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <kbd style={{
            padding: '2px 6px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: 'var(--text-light)',
            backgroundColor: 'var(--bg-color)',
            fontFamily: 'monospace',
            flexShrink: 0,
          }}>ESC</kbd>
        </div>

        {/* Section Label */}
        {(showRecent || displayList.length > 0 || showEmpty) && (
          <div>
            {showRecent && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem 0.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-light)',
              }}>
                <Clock size={11} /> Recent
              </div>
            )}
            {query && results.length > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem 0.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-light)',
              }}>
                <Zap size={11} /> Tools
              </div>
            )}
          </div>
        )}

        {/* Results List */}
        {displayList.length > 0 && (
          <ul style={{ listStyle: 'none', padding: '0.25rem 0', margin: 0, maxHeight: '340px', overflowY: 'auto' }}>
            {displayList.map((tool, idx) => {
              const accentColor = ICON_COLORS[tool.category] || '#6366F1';
              return (
                <li key={tool.slug}>
                  <button
                    onClick={() => navigateToTool(tool)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.625rem 1rem',
                      background: idx === selectedIdx ? 'var(--primary-light)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.1s ease',
                    }}
                    aria-selected={idx === selectedIdx}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: accentColor + '18',
                      color: accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}>
                      {tool.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.925rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {tool.name}
                      </div>
                      <div style={{
                        fontSize: '0.775rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '1px',
                      }}>
                        {tool.description}
                      </div>
                    </div>
                    <div style={{
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      backgroundColor: accentColor + '18',
                      color: accentColor,
                      flexShrink: 0,
                    }}>
                      {tool.category}
                    </div>
                    {idx === selectedIdx && (
                      <ArrowRight size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Empty State */}
        {showEmpty && (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No tools found for "<strong style={{ color: 'var(--text-main)' }}>{query}</strong>"
          </div>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.7rem',
          color: 'var(--text-light)',
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span><kbd style={{ fontFamily: 'monospace', padding: '1px 4px', border: '1px solid var(--border-color)', borderRadius: '3px', backgroundColor: 'var(--bg-color)', marginRight: '3px' }}>↑↓</kbd> Navigate</span>
            <span><kbd style={{ fontFamily: 'monospace', padding: '1px 4px', border: '1px solid var(--border-color)', borderRadius: '3px', backgroundColor: 'var(--bg-color)', marginRight: '3px' }}>↵</kbd> Open</span>
            <span><kbd style={{ fontFamily: 'monospace', padding: '1px 4px', border: '1px solid var(--border-color)', borderRadius: '3px', backgroundColor: 'var(--bg-color)', marginRight: '3px' }}>Esc</kbd> Close</span>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>ToolNest</span>
        </div>
      </div>
    </div>
  );
};
