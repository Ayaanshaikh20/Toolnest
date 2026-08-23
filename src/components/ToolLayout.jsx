import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { AdPlaceholder } from './AdPlaceholder';
import { FAQ } from './FAQ';
import { RelatedTools } from './RelatedTools';
import { SEO } from './SEO';
import { getRelatedTools } from '../data/toolsData';

export const ToolLayout = ({ tool, children }) => {
  if (!tool) return null;

  const relatedTools = getRelatedTools(tool);

  // Generate structured data for SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": tool.metaDescription || tool.description,
      "url": `https://toolnest.shaikhayaan.com/tools/${tool.slug}`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://toolnest.shaikhayaan.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://toolnest.shaikhayaan.com/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": tool.name,
          "item": `https://toolnest.shaikhayaan.com/tools/${tool.slug}`
        }
      ]
    }
  ];

  if (tool.faqs && tool.faqs.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": tool.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return (
    <div className="tool-page container">
      <SEO
        title={tool.metaTitle || `${tool.name} | ToolNest`}
        description={tool.metaDescription || tool.description}
        canonicalUrl={`/tools/${tool.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumb toolName={tool.name} />

      <header className="tool-header">
        <h1>{tool.name}</h1>
        <p>{tool.description}</p>
      </header>

      {/* Main Tool Interactive Sandbox Component */}
      <div className="tool-box">
        {children}
      </div>

      <AdPlaceholder position="middle" />

      {/* SEO & Instructional Content */}
      <div className="tool-content">
        <section className="tool-content-block">
          <h2>About {tool.name}</h2>
          <p>{tool.about}</p>
        </section>

        {tool.howToUse && tool.howToUse.length > 0 && (
          <section className="tool-content-block">
            <h2>How to use {tool.name}</h2>
            <ol className="usage-steps">
              {tool.howToUse.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {tool.faqs && tool.faqs.length > 0 && (
          <section className="tool-content-block">
            <h2>Frequently Asked Questions</h2>
            <FAQ faqs={tool.faqs} />
          </section>
        )}

        <RelatedTools tools={relatedTools} />
      </div>

      <AdPlaceholder position="bottom" />
    </div>
  );
};
