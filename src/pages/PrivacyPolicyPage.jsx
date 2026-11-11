import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="Privacy Policy | ToolNest"
        description="ToolNest Privacy Policy detailing client-side browser processing, cookies, Google AdSense compliance, and user data rights under GDPR & CCPA."
        canonicalUrl="/privacy-policy"
      />

      <h1 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Last updated: September 20, 2026 &bull; Compliant with Google AdSense, GDPR & CCPA</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
        <p>
          At <strong>ToolNest</strong> (accessible from <a href="https://toolnest.shaikhayaan.com">https://toolnest.shaikhayaan.com</a>), operated by <strong>Muhammad Ayaan Shaikh</strong>, protecting visitor privacy is our foundational commitment. This document outlines the types of information collected and how we uphold client-side confidentiality.
        </p>

        <h2>1. 100% Client-Side In-Browser Processing Guarantee</h2>
        <p>
          Unlike conventional online converters and utility sites, ToolNest is architected to perform computations directly within your local browser runtime via modern WebAssembly (WASM), HTML5 Canvas, and the Web Crypto API.
        </p>
        <p>
          <strong>Your files, PDF documents, JSON structures, images, passwords, and source code are strictly held in volatile client RAM and are never uploaded, transmitted, logged, or saved on any remote backend server.</strong>
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          ToolNest does not mandate user accounts, credit cards, or profile logins. We do not harvest personally identifiable information (PII) such as your legal name, billing address, or telephone number unless you voluntarily choose to contact our support team via our contact form or direct email.
        </p>

        <h2>3. Server Logs & Analytics</h2>
        <p>
          Like all standard web servers, our hosting infrastructure (AWS CloudFront / Amplify) may log standard request metadata for security and performance diagnostics. This includes anonymous internet protocol (IP) addresses, browser user-agent, operating system, referring/exit pages, and timestamps. These logs are non-identifiable and never correlated with individual users.
        </p>

        <h2>4. Google AdSense & Third-Party Advertising Policy</h2>
        <p>
          ToolNest partners with Google AdSense to serve non-intrusive advertisements that support the ongoing maintenance and free access to our utilities. Please note the following disclosures required by Google:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites across the internet.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to ToolNest and/or other websites on the internet.
          </li>
          <li>
            <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
          </li>
        </ul>

        <h2>5. Cookies & Local Storage</h2>
        <p>
          ToolNest uses minimal first-party browser storage (such as <code>localStorage</code>) strictly to preserve functional user preferences:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Dark Mode vs. Light Mode interface preference.</li>
          <li>Local list of recently accessed tools to provide quick shortcuts.</li>
        </ul>
        <p>
          This local state stays stored in your browser and is never synchronized to an external cloud database.
        </p>

        <h2>6. GDPR & CCPA Data Rights</h2>
        <p>
          Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), visitors have the right to request access to, deletion of, or restriction of their personal data. Because we do not store accounts or personal database records, ToolNest does not retain personal profiles. For any privacy queries, reach out directly to <strong>support@shaikhayaan.com</strong>.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have questions regarding this Privacy Policy or our architectural security model, contact:
        </p>
        <p style={{ margin: 0 }}>
          <strong>Muhammad Ayaan Shaikh</strong> &bull; ToolNest<br />
          Email: <a href="mailto:support@shaikhayaan.com">support@shaikhayaan.com</a><br />
          Website: <a href="https://shaikhayaan.com" target="_blank" rel="noopener noreferrer">https://shaikhayaan.com</a>
        </p>
      </div>
    </div>
  );
};
