/**
 * ToolNest Analytics Integration Module
 * 
 * To activate Google Analytics / GTM:
 * 1. Set your GA Measurement ID below (e.g., 'G-XXXXXXXXXX')
 * 2. Or initialize your custom analytics script.
 */

export const ANALYTICS_CONFIG = {
  // Replace with your Google Analytics Measurement ID (e.g. 'G-XXXXXXXXXX')
  gaMeasurementId: '', 
  
  // Set to true once you configure your tracking ID
  enabled: false,
};

/**
 * Initialize Google Analytics dynamically
 */
export const initAnalytics = () => {
  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.gaMeasurementId) {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.gaMeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.gaMeasurementId);
};

/**
 * Track page views
 * @param {string} path - URL path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag && ANALYTICS_CONFIG.enabled) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};
