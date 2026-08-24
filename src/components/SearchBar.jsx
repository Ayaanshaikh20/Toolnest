import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, onOpenCommandPalette, placeholder = "Search tools (JSON, Image, Password...)" }) => {
  return (
    <div className="search-box" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ paddingRight: '4rem' }}
      />
      {onOpenCommandPalette && (
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="search-kbd-btn"
          title="Open Command Search Palette (Ctrl+K)"
          aria-label="Open Command Search Palette (Ctrl+K)"
          style={{
            position: 'absolute',
            right: '0.75rem',
            background: 'var(--bg-color)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '6px',
            padding: '3px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--text-light)',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'monospace',
            transition: 'var(--transition)',
          }}
        >
          <kbd style={{ fontFamily: 'monospace' }}>⌘K</kbd>
        </button>
      )}
    </div>
  );
};
