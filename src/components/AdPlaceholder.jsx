import React from 'react';

/**
 * Reusable AdPlaceholder component.
 * To integrate Google AdSense:
 * Replace the contents of this component with your Google AdSense snippet:
 * <ins className="adsbygoogle"
 *      style={{ display: 'block' }}
 *      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *      data-ad-slot="1234567890"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true"></ins>
 */
export const AdPlaceholder = ({ position = 'middle' }) => {
  return (
    <div className={`ad-placeholder ad-position-${position}`} aria-label="Advertisement">
      <div>ADVERTISEMENT</div>
      <span>Support ToolNest by disabling ad blockers</span>
    </div>
  );
};
