import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { copyToClipboard } from './Toast';

export const CopyButton = ({ text, label = "Copy Result", className = "", successMessage }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    const msg = successMessage || `${label !== 'Copy Result' ? label : 'Result'} copied!`;
    await copyToClipboard(text, msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={copied ? "secondary" : "primary"}
      onClick={handleCopy}
      disabled={!text}
      className={className}
      title={copied ? 'Copied!' : `Click to copy`}
    >
      {copied ? (
        <>
          <Check size={16} /> Copied!
        </>
      ) : (
        <>
          <Copy size={16} /> {label}
        </>
      )}
    </Button>
  );
};
