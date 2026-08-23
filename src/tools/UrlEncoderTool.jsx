import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Link2, Trash2, AlertCircle } from 'lucide-react';

export const UrlEncoderTool = () => {
  const [mode, setMode] = useState('encode');
  const [encodeMode, setEncodeMode] = useState('component'); // 'component' (encodeURIComponent) or 'uri' (encodeURI)
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setError(null);
      if (mode === 'encode') {
        if (encodeMode === 'component') {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(encodeURI(input));
        }
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError(`URI Parsing Error: ${err.message}`);
      setOutput('');
    }
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setInput(output);
    setOutput(input);
    setError(null);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <Button
          variant={mode === 'encode' ? 'primary' : 'outline'}
          onClick={() => handleModeSwitch('encode')}
        >
          URL Encode
        </Button>
        <Button
          variant={mode === 'decode' ? 'primary' : 'outline'}
          onClick={() => handleModeSwitch('decode')}
        >
          URL Decode
        </Button>

        {mode === 'encode' && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="encodeType"
                checked={encodeMode === 'component'}
                onChange={() => setEncodeMode('component')}
              /> Encode Component (All Special Chars)
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="encodeType"
                checked={encodeMode === 'uri'}
                onChange={() => setEncodeMode('uri')}
              /> Encode Full URI (Preserve Protocol/Domain)
            </label>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.375rem' }}>
            Input Text / URL
          </label>
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world & test' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
            rows={5}
          />
        </div>

        {error && (
          <div className="status-message error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.375rem' }}>
            Result
          </label>
          <Textarea
            value={output}
            readOnly
            placeholder="Converted output will appear here..."
            rows={5}
          />
        </div>
      </div>

      <div className="tool-actions">
        <Button variant="primary" onClick={handleConvert}>
          <Link2 size={16} /> {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
        </Button>
        <CopyButton text={output} label="Copy Output" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
