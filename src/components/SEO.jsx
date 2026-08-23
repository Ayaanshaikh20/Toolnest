import React, { useEffect } from 'react';

/**
 * Reusable SEO component for managing title, meta tags, canonical URL, OpenGraph, Twitter Cards, and JSON-LD structured data.
 */
export const SEO = ({ title, description, canonicalUrl, structuredData, ogImage }) => {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Open Graph Description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);

      // Twitter Description
      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twDesc) {
        twDesc = document.createElement('meta');
        twDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twDesc);
      }
      twDesc.setAttribute('content', description);
    }

    // 3. Open Graph Title & Twitter Title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twTitle) {
        twTitle = document.createElement('meta');
        twTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twTitle);
      }
      twTitle.setAttribute('content', title);
    }

    // 4. Update Canonical URL
    const fullCanonical = canonicalUrl ? `https://toolnest.shaikhayaan.com${canonicalUrl}` : 'https://toolnest.shaikhayaan.com/';
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 5. Open Graph URL & Twitter URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', fullCanonical);

    let twUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twUrl) {
      twUrl = document.createElement('meta');
      twUrl.setAttribute('name', 'twitter:url');
      document.head.appendChild(twUrl);
    }
    twUrl.setAttribute('content', fullCanonical);

    // 6. Inject JSON-LD Structured Data
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (scriptTag) {
      scriptTag.remove();
    }

    if (structuredData) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }
  }, [title, description, canonicalUrl, structuredData, ogImage]);

  return null;
};
