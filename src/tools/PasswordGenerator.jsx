import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { RefreshCw, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const getStrength = () => {
    if (!password) return { label: 'None', score: 0, color: '#9CA3AF' };
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { label: 'Weak', score: 25, color: '#DC2626' };
    if (score === 3) return { label: 'Medium', score: 50, color: '#D97706' };
    if (score === 4) return { label: 'Strong', score: 75, color: '#059669' };
    return { label: 'Very Strong', score: 100, color: '#2563EB' };
  };

  const strength = getStrength();

  return (
    <div>
      {/* Generated Password Box */}
      <div style={{
        background: '#FAFBFD',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          fontFamily: 'monospace',
          fontSize: '1.4rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
          wordBreak: 'break-all',
          minHeight: '2.5rem',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center'
        }}>
          {password || <span style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: '400' }}>Select options to generate password...</span>}
        </div>

        {/* Strength Bar */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.375rem' }}>
            <span>Password Strength:</span>
            <span style={{ color: strength.color }}>{strength.label}</span>
          </div>
          <div style={{ height: '6px', width: '100%', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${strength.score}%`, background: strength.color, transition: 'var(--transition)' }}></div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        <div className="slider-group" style={{ gridColumn: 'span 2' }}>
          <div className="slider-header">
            <label>Password Length:</label>
            <span style={{ color: 'var(--primary-color)' }}>{length} characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="slider"
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>
          <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} />
          Uppercase Letters (A-Z)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>
          <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} />
          Lowercase Letters (a-z)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          Numbers (0-9)
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500' }}>
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
          Symbols (!@#$%^&*)
        </label>
      </div>

      <div className="tool-actions">
        <Button variant="primary" onClick={generatePassword}>
          <RefreshCw size={16} /> Regenerate Password
        </Button>
        <CopyButton text={password} label="Copy Password" />
      </div>
    </div>
  );
};
