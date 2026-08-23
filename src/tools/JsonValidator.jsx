import React, { useState } from 'react';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { AlertCircle, CheckCircle2, Trash2, Check } from 'lucide-react';

export const JsonValidator = () => {
  const [input, setInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const validate = () => {
    if (!input.trim()) {
      setValidationResult({
        valid: false,
        message: 'Please paste or type JSON data to validate.'
      });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const keyCount = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1;
      const type = Array.isArray(parsed) ? 'Array' : typeof parsed;

      setValidationResult({
        valid: true,
        message: `Valid JSON payload! Structural Type: ${type} (${keyCount} top-level element${keyCount === 1 ? '' : 's'}).`,
        formatted: JSON.stringify(parsed, null, 2)
      });
    } catch (err) {
      setValidationResult({
        valid: false,
        message: `Syntax Error: ${err.message}`
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setValidationResult(null);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
        Paste JSON to Validate
      </label>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"key": "value", "items": [1, 2, 3]}'
        rows={10}
      />

      {validationResult && (
        <div className={`status-message ${validationResult.valid ? 'success' : 'error'}`}>
          {validationResult.valid ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{validationResult.message}</span>
        </div>
      )}

      <div className="tool-actions">
        <Button variant="primary" onClick={validate}>
          <Check size={16} /> Validate JSON
        </Button>
        <CopyButton text={validationResult?.formatted || input} label="Copy Validated JSON" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
