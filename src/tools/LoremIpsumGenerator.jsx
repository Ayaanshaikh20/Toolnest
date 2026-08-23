import React, { useState, useCallback } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Trash2, RefreshCw } from 'lucide-react';

const LOREM_WORDS = `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit`.split(' ');

const randomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

const generateSentence = (wordCount) => {
  const wc = wordCount || Math.floor(Math.random() * 10) + 8;
  const words = Array.from({ length: wc }, (_, i) => {
    const w = randomWord();
    return i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  });
  return words.join(' ') + '.';
};

const generateParagraph = (sentenceCount) => {
  const sc = sentenceCount || Math.floor(Math.random() * 4) + 3;
  return Array.from({ length: sc }, () => generateSentence()).join(' ');
};

export const LoremIpsumGenerator = () => {
  const [type, setType] = useState('paragraphs'); // paragraphs | sentences | words
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');

  const generate = useCallback(() => {
    let result = '';
    if (type === 'paragraphs') {
      const paras = Array.from({ length: count }, (_, i) => {
        const para = generateParagraph();
        return (i === 0 && startWithLorem) ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + para : para;
      });
      result = paras.join('\n\n');
    } else if (type === 'sentences') {
      const sents = Array.from({ length: count }, (_, i) => {
        return (i === 0 && startWithLorem) ? 'Lorem ipsum dolor sit amet.' : generateSentence();
      });
      result = sents.join(' ');
    } else {
      const words = Array.from({ length: count }, (_, i) => {
        const w = (i === 0 && startWithLorem) ? 'Lorem' : randomWord();
        return i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w;
      });
      result = words.join(' ') + '.';
    }
    setOutput(result);
  }, [type, count, startWithLorem]);

  // Auto-generate on mount
  React.useEffect(() => { generate(); }, [generate]);

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', padding: '1rem', background: 'var(--bg-color)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Generate</label>
          <input type="number" className="input" value={count} min={1} max={100}
            onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            style={{ width: '70px' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['paragraphs', 'sentences', 'words'].map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`btn btn-sm ${type === t ? 'btn-primary' : 'btn-outline'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} />
          Start with "Lorem ipsum"
        </label>
        <Button variant="primary" onClick={generate}>
          <RefreshCw size={14} /> Generate
        </Button>
      </div>

      {/* Stats bar */}
      {output && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span>{output.split('\n\n').filter(Boolean).length} paragraph{output.split('\n\n').filter(Boolean).length !== 1 ? 's' : ''}</span>
        </div>
      )}

      <textarea
        className="textarea"
        rows={12}
        value={output}
        readOnly
        style={{ fontFamily: 'var(--font-family)', lineHeight: '1.7', fontSize: '0.95rem' }}
      />

      <div className="tool-actions">
        <CopyButton text={output} label="Copy Text" />
        <Button variant="danger" onClick={() => setOutput('')}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
