import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Type, Trash2 } from 'lucide-react';

export const CaseConverter = () => {
  const [text, setText] = useState('');

  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    setText(
      text.toLowerCase().replace(/(?:^|\s|-|_)\S/g, (match) => match.toUpperCase())
    );
  };

  const toSentenceCase = () => {
    setText(
      text.toLowerCase().replace(/(^\s*|[.!?]\s*)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase())
    );
  };

  const toCamelCase = () => {
    const words = text.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/);
    if (!words.length || !words[0]) return;
    const result = words
      .map((word, index) => {
        const lower = word.toLowerCase();
        return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join('');
    setText(result);
  };

  const toSnakeCase = () => {
    const words = text.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/);
    if (!words.length || !words[0]) return;
    setText(words.map((w) => w.toLowerCase()).join('_'));
  };

  const toKebabCase = () => {
    const words = text.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/);
    if (!words.length || !words[0]) return;
    setText(words.map((w) => w.toLowerCase()).join('-'));
  };

  const handleClear = () => setText('');

  return (
    <div>
      <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Input Text
      </label>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here to convert case..."
        rows={8}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
        <Button variant="secondary" onClick={toUppercase}>
          UPPERCASE
        </Button>
        <Button variant="secondary" onClick={toLowercase}>
          lowercase
        </Button>
        <Button variant="secondary" onClick={toTitleCase}>
          Title Case
        </Button>
        <Button variant="secondary" onClick={toSentenceCase}>
          Sentence case
        </Button>
        <Button variant="secondary" onClick={toCamelCase}>
          camelCase
        </Button>
        <Button variant="secondary" onClick={toSnakeCase}>
          snake_case
        </Button>
        <Button variant="secondary" onClick={toKebabCase}>
          kebab-case
        </Button>
      </div>

      <div className="tool-actions">
        <CopyButton text={text} label="Copy Converted Text" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear Text
        </Button>
      </div>
    </div>
  );
};
