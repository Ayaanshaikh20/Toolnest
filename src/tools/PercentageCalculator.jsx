import React, { useState } from 'react';
import { CopyButton } from '../components/CopyButton';
import { Percent } from 'lucide-react';

export const PercentageCalculator = () => {
  // Formula 1: What is X% of Y?
  const [f1X, setF1X] = useState(15);
  const [f1Y, setF1Y] = useState(200);

  // Formula 2: X is what % of Y?
  const [f2X, setF2X] = useState(40);
  const [f2Y, setF2Y] = useState(200);

  // Formula 3: Percentage Change from X to Y
  const [f3X, setF3X] = useState(100);
  const [f3Y, setF3Y] = useState(150);

  // Calculations
  const res1 = (parseFloat(f1X) * parseFloat(f1Y)) / 100;
  const res2 = parseFloat(f2Y) !== 0 ? (parseFloat(f2X) / parseFloat(f2Y)) * 100 : 0;
  const res3 = parseFloat(f3X) !== 0 ? ((parseFloat(f3Y) - parseFloat(f3X)) / parseFloat(f3X)) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Formula 1 */}
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', backgroundColor: 'var(--bg-color)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
          1. Basic Percentage: What is X% of Y?
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span>What is</span>
          <input
            type="number"
            className="input"
            style={{ width: '110px' }}
            value={f1X}
            onChange={(e) => setF1X(e.target.value)}
          />
          <span>% of</span>
          <input
            type="number"
            className="input"
            style={{ width: '130px' }}
            value={f1Y}
            onChange={(e) => setF1Y(e.target.value)}
          />
          <span>?</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card-bg)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <strong>Result:</strong>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-color)' }}>
            {isNaN(res1) ? '0' : res1.toLocaleString()}
          </span>
          <div style={{ marginLeft: 'auto' }}>
            <CopyButton text={isNaN(res1) ? '0' : res1.toString()} label="Copy" />
          </div>
        </div>
      </div>

      {/* Formula 2 */}
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', backgroundColor: 'var(--bg-color)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
          2. Fraction Percentage: X is what percentage of Y?
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="number"
            className="input"
            style={{ width: '110px' }}
            value={f2X}
            onChange={(e) => setF2X(e.target.value)}
          />
          <span>is what % of</span>
          <input
            type="number"
            className="input"
            style={{ width: '130px' }}
            value={f2Y}
            onChange={(e) => setF2Y(e.target.value)}
          />
          <span>?</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card-bg)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <strong>Result:</strong>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-color)' }}>
            {isNaN(res2) ? '0' : `${res2.toFixed(2)}%`}
          </span>
          <div style={{ marginLeft: 'auto' }}>
            <CopyButton text={isNaN(res2) ? '0' : `${res2.toFixed(2)}%`} label="Copy" />
          </div>
        </div>
      </div>

      {/* Formula 3 */}
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', backgroundColor: 'var(--bg-color)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
          3. Percentage Increase / Decrease: From X to Y
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span>What is percentage change from</span>
          <input
            type="number"
            className="input"
            style={{ width: '110px' }}
            value={f3X}
            onChange={(e) => setF3X(e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            className="input"
            style={{ width: '130px' }}
            value={f3Y}
            onChange={(e) => setF3Y(e.target.value)}
          />
          <span>?</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card-bg)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <strong>Result:</strong>
          <span style={{
            fontSize: '1.35rem',
            fontWeight: '800',
            color: res3 >= 0 ? 'var(--success-color)' : 'var(--error-color)'
          }}>
            {isNaN(res3) ? '0' : `${res3 >= 0 ? '+' : ''}${res3.toFixed(2)}%`} ({res3 >= 0 ? 'Increase' : 'Decrease'})
          </span>
          <div style={{ marginLeft: 'auto' }}>
            <CopyButton text={isNaN(res3) ? '0' : `${res3.toFixed(2)}%`} label="Copy" />
          </div>
        </div>
      </div>
    </div>
  );
};
