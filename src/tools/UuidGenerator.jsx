import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CopyButton } from '../components/CopyButton';
import { Textarea } from '../components/Textarea';
import { RefreshCw, Trash2 } from 'lucide-react';

const generateV4 = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const UuidGenerator = () => {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);
  const [uuids, setUuids] = useState(() => {
    return Array.from({ length: 5 }, () => generateV4());
  });

  const handleGenerate = () => {
    const generated = Array.from({ length: Math.min(Math.max(1, count), 50) }, () => {
      let id = generateV4();
      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, '');
      return id;
    });
    setUuids(generated);
  };

  const handleClear = () => {
    setUuids([]);
  };

  const uuidText = uuids.join('\n');

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.375rem' }}>
            Quantity (1 - 50)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            className="input"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={removeHyphens}
              onChange={(e) => setRemoveHyphens(e.target.checked)}
            />
            Remove Hyphens
          </label>
        </div>
      </div>

      <Textarea
        value={uuidText}
        readOnly
        placeholder="Generated UUIDs will appear here..."
        rows={Math.max(4, Math.min(uuids.length, 12))}
      />

      <div className="tool-actions">
        <Button variant="primary" onClick={handleGenerate}>
          <RefreshCw size={16} /> Generate UUIDs
        </Button>
        <CopyButton text={uuidText} label="Copy All UUIDs" />
        <Button variant="danger" onClick={handleClear}>
          <Trash2 size={16} /> Clear
        </Button>
      </div>
    </div>
  );
};
