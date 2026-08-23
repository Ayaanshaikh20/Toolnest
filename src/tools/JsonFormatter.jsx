import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { AlertCircle, CheckCircle, Trash2, Code, Minimize2 } from 'lucide-react';

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const handleInputChange = (val) => {
    setInput(val);
    if (!val.trim()) {
      setError(null);
      setStatus(null);
      return;
    }
    // Instant Auto-Parse Attempt
    try {
      const parsed = JSON.parse(val);
      setError(null);
      setStatus('Valid JSON payload');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setStatus(null);
    }
  };

  const formatJson = (indent = 2) => {
    if (!input.trim()) {
      setError('Please enter JSON text to format.');
      setStatus(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setInput(formatted);
      setError(null);
      setStatus(indent === 0 ? 'JSON minified successfully!' : 'JSON formatted successfully!');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setStatus(null);
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      setError('Please enter JSON text to validate.');
      setStatus(null);
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setStatus('Valid JSON! Syntax structure is correct.');
    } catch (err) {
      setError(`Invalid JSON Syntax: ${err.message}`);
      setStatus(null);
    }
  };

  const handleClear = () => {
    setInput('');
    setError(null);
    setStatus(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>
          JSON Input / Output
        </label>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
          ⚡ Auto-validates as you type or paste (Ctrl+V)
        </span>
      </div>

      <Textarea
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='Paste your JSON here (e.g. {"name": "ToolNest", "active": true})'
        rows={12}
        autoFocus
      />

      {error && (
        <div className="status-message error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {status && (
        <div className="status-message success">
          <CheckCircle size={18} />
          <span>{status}</span>
        </div>
      )}

      <div className="tool-actions">
        <Button variant="primary" onClick={() => formatJson(2)}>
          <Code size={16} /> Format JSON
        </Button>
        <Button variant="secondary" onClick={() => formatJson(0)}>
          <Minimize2 size={16} /> Minify JSON
        </Button>
        <Button variant="outline" onClick={validateJson}>
          <CheckCircle size={16} /> Validate JSON
        </Button>
        <CopyButton text={input} label="Copy JSON" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
