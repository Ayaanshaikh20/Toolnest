import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { ArrowLeftRight, Trash2, AlertCircle } from 'lucide-react';

export const Base64Tool = () => {
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  // Unicode safe base64 encoding/decoding
  const encodeBase64 = (str) => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = String.fromCodePoint(...bytes);
      return btoa(binString);
    } catch (e) {
      throw new Error('Failed to encode text into Base64.');
    }
  };

  const decodeBase64 = (str) => {
    try {
      const binString = atob(str.trim());
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
      return new TextDecoder().decode(bytes);
    } catch (e) {
      throw new Error('Invalid Base64 string. Please check your input.');
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      setError(null);
      if (mode === 'encode') {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input));
      }
    } catch (err) {
      setError(err.message);
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
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Button
          variant={mode === 'encode' ? 'primary' : 'outline'}
          onClick={() => handleModeSwitch('encode')}
        >
          Encode to Base64
        </Button>
        <Button
          variant={mode === 'decode' ? 'primary' : 'outline'}
          onClick={() => handleModeSwitch('decode')}
        >
          Decode from Base64
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.375rem' }}>
            Input ({mode === 'encode' ? 'Plain Text' : 'Base64 String'})
          </label>
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder={mode === 'encode' ? 'Type text here to encode...' : 'Paste Base64 encoded string here...'}
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
            Output ({mode === 'encode' ? 'Base64 Result' : 'Decoded Text'})
          </label>
          <Textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            rows={5}
          />
        </div>
      </div>

      <div className="tool-actions">
        <Button variant="primary" onClick={handleConvert}>
          <ArrowLeftRight size={16} /> {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <CopyButton text={output} label="Copy Output" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
