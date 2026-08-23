import React, { useEffect } from 'react';

export const AdPlaceholder = ({ position = 'middle' }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Catch potential ad-blocker errors silently
    }
  }, []);

  return (
    <div className={`ad-container ad-position-${position}`} style={{ margin: '2rem 0', textAlign: 'center', minHeight: '90px' }} aria-label="Advertisement">
      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        ADVERTISEMENT
      </div>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-9121405701876332"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};
