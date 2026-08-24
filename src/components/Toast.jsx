import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, Copy, AlertCircle, Info } from 'lucide-react';

// Global toast queue (singleton pattern, works outside React)
let toastListeners = [];
let toastIdCounter = 0;

export const showToast = (message, type = 'success', duration = 2500) => {
  const id = ++toastIdCounter;
  toastListeners.forEach(listener => listener({ id, message, type, duration }));
};

// Convenience helpers
export const copyToast = (message = 'Copied to clipboard!') => showToast(message, 'success');
export const errorToast = (message = 'Something went wrong.') => showToast(message, 'error', 3500);
export const infoToast = (message) => showToast(message, 'info');

// Smart clipboard copy helper
export const copyToClipboard = async (text, successMessage = 'Copied to clipboard!') => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copyToast(successMessage);
  } catch {
    errorToast('Failed to copy. Please copy manually.');
  }
};

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  copy: Copy,
};

const COLORS = {
  success: { bg: 'var(--success-bg)', border: 'var(--success-color)', text: 'var(--success-color)' },
  error: { bg: 'var(--error-bg)', border: 'var(--error-color)', text: 'var(--error-color)' },
  info: { bg: 'var(--primary-light)', border: 'var(--primary-color)', text: 'var(--primary-color)' },
};

const Toast = ({ id, message, type, onRemove }) => {
  const [visible, setVisible] = useState(true);
  const colors = COLORS[type] || COLORS.success;
  const Icon = ICONS[type] || CheckCircle2;

  useEffect(() => {
    const removeTimer = setTimeout(() => setVisible(false), 200); // Start fade out
    return () => clearTimeout(removeTimer);
  }, []);

  return (
    <div
      onAnimationEnd={() => { if (!visible) onRemove(id); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.75rem 1rem',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: colors.text,
        pointerEvents: 'none',
        animation: visible ? 'toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'toastOut 0.25s ease forwards',
        maxWidth: '340px',
        wordBreak: 'break-word',
      }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span style={{ color: 'var(--text-main)' }}>{message}</span>
    </div>
  );
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (toast) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, toast.duration);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
