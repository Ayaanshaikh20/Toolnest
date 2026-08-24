/**
 * ToolNest Analytics Integration Module
 * 
 * Configured with Google Analytics 4 (GA4)
 */

export const ANALYTICS_CONFIG = {
  gaMeasurementId: 'G-FH7P7EV9W7',
  enabled: true,
};

/**
 * Initialize Google Analytics dynamically if not already in index.html
 */
export const initAnalytics = () => {
  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.gaMeasurementId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // If script not already injected
  if (!document.querySelector(`script[src*="${ANALYTICS_CONFIG.gaMeasurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.gaMeasurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.gaMeasurementId, {
      send_page_view: false // Managed dynamically by React Router
    });
  }
};

/**
 * Track SPA route changes
 * @param {string} path - URL path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag && ANALYTICS_CONFIG.enabled) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: title || document.title,
    });
  }
};
