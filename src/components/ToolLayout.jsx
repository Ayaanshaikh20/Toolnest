import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { AdPlaceholder } from './AdPlaceholder';
import { FAQ } from './FAQ';
import { RelatedTools } from './RelatedTools';
import { SEO } from './SEO';
import { CustomToolIcon } from './CustomToolIcons';
import { getRelatedTools } from '../data/toolsData';
import { CheckCircle, Lightbulb } from 'lucide-react';

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
          "item": "https://toolnest.shaikhayaan.com/"
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
        title={tool.metaTitle || `${tool.name} Online - Free | ToolNest`}
        description={tool.metaDescription || tool.description}
        canonicalUrl={`/tools/${tool.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumb toolName={tool.name} />

      <header className="tool-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--card-bg)',
          border: '1.5px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <CustomToolIcon slug={tool.slug} size={36} />
        </div>
        <div>
          <h1 style={{ margin: 0 }}>{tool.name}</h1>
          <p style={{ marginTop: '0.35rem' }}>{tool.description}</p>
        </div>
      </header>

      {/* Main Tool Interactive Sandbox Component */}
      <div className="tool-box">
        {children}
      </div>

      <AdPlaceholder position="middle" />

      {/* SEO & Educational Content Sections */}
      <div className="tool-content">
        {/* 1. About Section */}
        {tool.about && (
          <section className="tool-content-block">
            <h2>About {tool.name}</h2>
            {Array.isArray(tool.about) ? (
              tool.about.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p>{tool.about}</p>
            )}
          </section>
        )}

        {/* 2. What Is Section */}
        {tool.whatIs && (
          <section className="tool-content-block">
            <h2>{tool.whatIs.heading || `What is ${tool.name}?`}</h2>
            {Array.isArray(tool.whatIs.content) ? (
              tool.whatIs.content.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p>{tool.whatIs.content || tool.whatIs}</p>
            )}
          </section>
        )}

        {/* 3. How to Use Section */}
        {tool.howToUse && tool.howToUse.length > 0 && (
          <section className="tool-content-block">
            <h2>How to Use {tool.name}</h2>
            <ol className="usage-steps">
              {tool.howToUse.map((step, index) => (
                <li key={index}>
                  <strong>Step {index + 1}:</strong> {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 4. Key Features & Benefits */}
        {tool.features && tool.features.length > 0 && (
          <section className="tool-content-block">
            <h2>Key Features & Benefits</h2>
            <div className="features-bullet-grid">
              {tool.features.map((feat, idx) => (
                <div key={idx} className="feature-bullet-item">
                  <CheckCircle size={18} className="feature-bullet-icon" />
                  <div>
                    {typeof feat === 'object' ? (
                      <>
                        <strong>{feat.title}: </strong>
                        <span>{feat.description}</span>
                      </>
                    ) : (
                      <span>{feat}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Examples & Practical Use Cases */}
        {tool.examples && tool.examples.length > 0 && (
          <section className="tool-content-block">
            <h2>Common Use Cases & Examples</h2>
            <div className="examples-container">
              {tool.examples.map((item, idx) => (
                <div key={idx} className="example-card">
                  <div className="example-card-header">
                    <Lightbulb size={18} className="example-card-icon" />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                  {item.code && (
                    <pre className="example-code-block">
                      <code>{item.code}</code>
                    </pre>
                  )}
                  {item.input && item.output && (
                    <div className="example-io-grid">
                      <div>
                        <div className="example-io-label">Input</div>
                        <div className="example-io-box">{item.input}</div>
                      </div>
                      <div>
                        <div className="example-io-label">Output</div>
                        <div className="example-io-box output">{item.output}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Frequently Asked Questions */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="tool-content-block">
            <h2>Frequently Asked Questions</h2>
            <FAQ faqs={tool.faqs} />
          </section>
        )}

        {/* 7. Related Tools */}
        <RelatedTools tools={relatedTools} />
      </div>

      <AdPlaceholder position="bottom" />
    </div>
  );
};
