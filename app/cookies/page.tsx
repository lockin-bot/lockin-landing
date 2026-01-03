'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CookiePolicy() {
  return (
    <div className='w-full min-h-screen bg-black text-white'>
      {/* Header */}
      <div className='w-full max-w-[800px] mx-auto px-[16px] md:px-[24px] pt-[100px] md:pt-[140px] pb-[60px] md:pb-[80px]'>
        <Link href='/' className='inline-flex items-center gap-[8px] text-[14px] text-white opacity-[.6] hover:opacity-100 transition-all duration-300 mb-[32px]'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </Link>

        <h1 className='text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] -tracking-[1.5px] text-white font-hedvig font-normal mb-[16px]'>
          Cookie Policy
        </h1>
        <p className='text-[14px] md:text-[16px] text-white opacity-[.5]'>Last updated: May 12, 2025</p>
      </div>

      {/* Content */}
      <div className='w-full max-w-[800px] mx-auto px-[16px] md:px-[24px] pb-[80px] md:pb-[120px]'>
        <div className='prose prose-invert max-w-none'>
          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>1. Introduction</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              This Cookie Policy explains how LockIn.bot (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on the LockIn.bot website and related services. This policy is part of our Privacy Policy and explains what cookies are, how we use them, and your choices regarding cookies.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>2. What Are Cookies</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners. They help us recognize your device and remember certain information about your visit, such as your preferences and actions on our site.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>3. Types of Cookies We Use</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[24px]'>We use the following types of cookies on our website:</p>
            
            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Essential Cookies</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[12px]'>
              These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and enable us to recognize you when you log in to your account. The website cannot function properly without these cookies.
            </p>
            <ul className='list-disc pl-[24px] space-y-[8px] mb-[24px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Session cookies for managing user sessions</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Security cookies for detecting authentication abuses</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Load balancing cookies</li>
            </ul>

            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Analytical/Performance Cookies</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[12px]'>
              These cookies allow us to recognize and count the number of visitors and see how visitors move around our website when they are using it. This helps us improve the way our website works.
            </p>
            <ul className='list-disc pl-[24px] space-y-[8px] mb-[24px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Google Analytics cookies to track user behavior</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Hotjar cookies to analyze user interactions</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Performance monitoring cookies</li>
            </ul>

            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Functionality Cookies</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[12px]'>
              These cookies are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.
            </p>
            <ul className='list-disc pl-[24px] space-y-[8px] mb-[24px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Language preference cookies</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>User interface customization cookies</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Remembering settings cookies</li>
            </ul>

            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Targeting/Advertising Cookies</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[12px]'>
              These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests.
            </p>
            <ul className='list-disc pl-[24px] space-y-[8px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Retargeting/advertising cookies</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Social media sharing cookies</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Ad performance measurement cookies</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>4. Third-Party Cookies</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. These cookies may be placed by:
            </p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Analytics providers</strong> such as Google Analytics, which helps us understand how users interact with our website</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Advertising networks</strong> such as Google AdSense, which help us deliver relevant advertisements</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Social media platforms</strong> such as Facebook, Twitter, and LinkedIn, which enable social sharing functionality</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Customer service providers</strong> to help us improve user experience and provide support</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>5. Cookie Duration</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>Cookies can remain on your device for different periods of time:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Session Cookies:</strong> These are temporary cookies that exist only during your website session. They are deleted from your device when you close your web browser.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Persistent Cookies:</strong> These cookies remain on your device after you close your browser and may be used by your browser on subsequent visits to our website. They typically have an expiration date and will automatically be deleted when that date is reached.</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>6. Your Choices Regarding Cookies</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of our website might no longer be fully accessible.
            </p>
            
            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Browser Controls</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              Most browsers allow you to view, manage, delete, and block cookies. To do this, follow the instructions provided by your browser (usually located within the &quot;Help,&quot; &quot;Tools,&quot; or &quot;Edit&quot; settings).
            </p>

            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Do Not Track</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are currently not set up to respond to such signals.
            </p>

            <h3 className='text-[18px] md:text-[20px] font-hedvig text-white mb-[12px]'>Cookie Consent Tool</h3>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We provide a cookie consent tool when you first visit our website that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the &quot;Cookie Settings&quot; link in the footer of our website.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>7. Cookies and Personal Data</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              When cookies collect personal data, we process this data in accordance with our Privacy Policy. Please refer to our <Link href='/privacy' className='text-[#429DED] hover:underline'>Privacy Policy</Link> for more information about how we process your personal data and your related rights.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>8. Changes to This Cookie Policy</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised policy on our website. We encourage you to periodically review this page for the latest information on our cookie practices.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>9. Contact Us</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:<br /><br />
              Email: support@lockin.bot
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className='w-full border-t border-[#272727] py-[24px] px-[16px] md:px-[24px]'>
        <div className='w-full max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[16px]'>
          <Link href='/' className='flex items-center'>
            <Image src='/brand/logo.svg' width={64} height={26} alt='LockIn' />
          </Link>
          <div className='flex items-center gap-[24px]'>
            <Link href='/privacy' className='text-[14px] text-white opacity-[.6] hover:opacity-100 transition-all'>Privacy</Link>
            <Link href='/terms' className='text-[14px] text-white opacity-[.6] hover:opacity-100 transition-all'>Terms</Link>
            <Link href='/cookies' className='text-[14px] text-white opacity-[.6] hover:opacity-100 transition-all'>Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

