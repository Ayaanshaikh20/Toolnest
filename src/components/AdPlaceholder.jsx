import React, { useEffect } from 'react';

export const AdPlaceholder = ({ position = 'middle' }) => {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!isDev) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        // Silently catch ad-blocker or script loading errors
      }
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div className={`ad-container ad-position-${position}`} style={{ margin: '1.5rem 0', textAlign: 'center' }} aria-label="Advertisement">
        <div style={{ 
          background: 'var(--bg-color)', 
          border: '1px dashed var(--border-color)', 
          borderRadius: 'var(--radius-sm)', 
          height: '90px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          AdSense Space (Dev Mode)
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ad-position-${position}`} style={{ margin: '1.5rem 0', textAlign: 'center' }} aria-label="Advertisement">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-9121405701876332"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};
