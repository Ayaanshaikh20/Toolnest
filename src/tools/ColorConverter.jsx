import React, { useState } from 'react';
import { CopyButton } from '../components/CopyButton';
import { Palette } from 'lucide-react';

// Helper conversions
function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length !== 6) return null;
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("").toUpperCase();
}

export const ColorConverter = () => {
  const [color, setColor] = useState('#2563EB');

  const rgbObj = hexToRgb(color) || { r: 37, g: 99, b: 235 };
  const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);

  const hexVal = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
  const rgbVal = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
  const hslVal = `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`;

  const handleHexChange = (val) => {
    setColor(val);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        {/* Color Swatch & Native Color Picker */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            height: '160px',
            width: '100%',
            backgroundColor: hexVal,
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1rem',
            border: '1px solid var(--border-color)',
            transition: 'var(--transition)'
          }} />

          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            background: '#fff'
          }}>
            <Palette size={18} /> Choose Color
            <input
              type="color"
              value={hexVal}
              onChange={(e) => handleHexChange(e.target.value)}
              style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
            />
          </label>
        </div>

        {/* Color Code Outputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.375rem' }}>HEX Value</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input"
                value={hexVal}
                onChange={(e) => handleHexChange(e.target.value)}
                style={{ fontFamily: 'monospace', fontWeight: '600' }}
              />
              <CopyButton text={hexVal} label="Copy HEX" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.375rem' }}>RGB Value</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input"
                value={rgbVal}
                readOnly
                style={{ fontFamily: 'monospace' }}
              />
              <CopyButton text={rgbVal} label="Copy RGB" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.375rem' }}>HSL Value</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input"
                value={hslVal}
                readOnly
                style={{ fontFamily: 'monospace' }}
              />
              <CopyButton text={hslVal} label="Copy HSL" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
