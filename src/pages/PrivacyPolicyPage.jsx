import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '840px' }}>
      <SEO
        title="Privacy Policy | ToolNest"
        description="ToolNest Privacy Policy detailing our client-side browser processing policy, cookies, and commitment to user data privacy."
        canonicalUrl="/privacy-policy"
      />

      <h1 style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Last updated: August 23, 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
        <p>
          At <strong>ToolNest</strong> (accessible from https://toolnest.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ToolNest and how we use it.
        </p>

        <h2>1. Client-Side Browser Processing</h2>
        <p>
          ToolNest is explicitly designed to process user input data locally inside your web browser whenever possible. This includes JSON payloads, images processed via Image Compressor or Resizer, password generation, Base64 strings, URL encoding, and text analytics.
        </p>
        <p>
          <strong>Your data is processed strictly in your local memory and is never uploaded, stored, or processed on external remote servers.</strong>
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          Because ToolNest does not require account registration or user logins, we do not collect personal identification details such as your name, phone number, or home address unless you voluntarily submit a contact request.
        </p>

        <h2>3. Log Files</h2>
        <p>
          Like most standard web servers, ToolNest uses standard hosting log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.
        </p>

        <h2>4. Cookies & Web Beacons</h2>
        <p>
          ToolNest uses basic cookies to store user preferences (such as tool settings). Third-party vendors, including Google AdSense, use cookies to serve ads based on a user's prior visits to website pages.
        </p>

        <h2>5. Advertising Partners</h2>
        <p>
          Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons in their respective advertisements that appear on ToolNest. You may consult the respective Privacy Policies of these third-party ad servers for more detailed information.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at support@toolnest.com.
        </p>
      </div>
    </div>
  );
};
