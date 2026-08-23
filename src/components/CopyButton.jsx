import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

export const CopyButton = ({ text, label = "Copy Result", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button
      variant={copied ? "secondary" : "primary"}
      onClick={handleCopy}
      disabled={!text}
      className={className}
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
