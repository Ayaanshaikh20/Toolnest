import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverter = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));

  // Live timer for current Unix timestamp
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse Timestamp to Date
  const getParsedDate = () => {
    if (!timestampInput) return null;
    let ts = Number(timestampInput);
    if (isNaN(ts)) return null;

    // Check if timestamp is in seconds (10 digits) or milliseconds (13 digits)
    if (timestampInput.trim().length <= 11) {
      ts = ts * 1000;
    }
    const d = new Date(ts);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const parsedDate = getParsedDate();

  // Parse Date to Timestamp
  const getCalculatedTimestamp = () => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      millis: d.getTime()
    };
  };

  const calculatedTs = getCalculatedTimestamp();

  return (
    <div>
      {/* Live Current Timestamp Banner */}
      <div style={{
        backgroundColor: 'var(--primary-light)',
        border: '1px solid #BFDBFE',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={24} style={{ color: 'var(--primary-color)' }} />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>Current Unix Epoch Timestamp</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', fontFamily: 'monospace' }}>
              {now}
            </div>
          </div>
        </div>
        <CopyButton text={now.toString()} label="Copy Current Unix Timestamp" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Section 1: Timestamp -> Date */}
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FAFBFD' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Timestamp &rarr; Date Conversion</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem' }}>
              Enter Unix Timestamp (Seconds or Milliseconds)
            </label>
            <input
              type="text"
              className="input"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="e.g. 1700000000"
            />
          </div>

          {parsedDate ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div>
                <strong>GMT / UTC:</strong>
                <div style={{ fontFamily: 'monospace', color: 'var(--text-main)', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginTop: '0.25rem' }}>
                  {parsedDate.toUTCString()}
                </div>
              </div>
              <div>
                <strong>Local Time:</strong>
                <div style={{ fontFamily: 'monospace', color: 'var(--text-main)', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginTop: '0.25rem' }}>
                  {parsedDate.toString()}
                </div>
              </div>
              <div>
                <strong>ISO 8601:</strong>
                <div style={{ fontFamily: 'monospace', color: 'var(--text-main)', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginTop: '0.25rem' }}>
                  {parsedDate.toISOString()}
                </div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <CopyButton text={parsedDate.toISOString()} label="Copy ISO 8601 Date" />
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--error-color)', fontSize: '0.875rem' }}>Invalid Unix timestamp</div>
          )}
        </div>

        {/* Section 2: Date -> Timestamp */}
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FAFBFD' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Date &rarr; Timestamp Conversion</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.375rem' }}>
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              className="input"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>

          {calculatedTs ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div>
                <strong>Timestamp (Seconds):</strong>
                <div style={{ fontFamily: 'monospace', color: 'var(--primary-color)', fontWeight: '700', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginTop: '0.25rem' }}>
                  {calculatedTs.seconds}
                </div>
              </div>
              <div>
                <strong>Timestamp (Milliseconds):</strong>
                <div style={{ fontFamily: 'monospace', color: 'var(--text-main)', background: '#fff', padding: '0.375rem 0.625rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginTop: '0.25rem' }}>
                  {calculatedTs.millis}
                </div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <CopyButton text={calculatedTs.seconds.toString()} label="Copy Timestamp (Seconds)" />
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--error-color)', fontSize: '0.875rem' }}>Invalid Date selection</div>
          )}
        </div>
      </div>
    </div>
  );
};
