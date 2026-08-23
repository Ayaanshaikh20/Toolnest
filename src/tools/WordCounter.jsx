import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2 } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, '').length;
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average 200 WPM

  const handleClear = () => {
    setText('');
  };

  return (
    <div>
      {/* Stat Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ background: 'var(--primary-light)', border: '1px solid #BFDBFE', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-color)' }}>{wordCount}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Words</div>
        </div>

        <div style={{ background: '#F3F4F6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>{charCount}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Characters</div>
        </div>

        <div style={{ background: '#F3F4F6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>{charNoSpacesCount}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>No Spaces</div>
        </div>

        <div style={{ background: '#F3F4F6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>{sentenceCount}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Sentences</div>
        </div>

        <div style={{ background: '#F3F4F6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>{paragraphCount}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Paragraphs</div>
        </div>

        <div style={{ background: '#F3F4F6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)' }}>~{readingTime}m</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Reading Time</div>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here to analyze..."
        rows={10}
      />

      <div className="tool-actions">
        <CopyButton text={text} label="Copy Text" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear Text
        </Button>
      </div>
    </div>
  );
};
