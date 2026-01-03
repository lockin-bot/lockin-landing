'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className='text-[14px] md:text-[16px] text-white opacity-[.5]'>Last updated: May 12, 2025</p>
      </div>

      {/* Content */}
      <div className='w-full max-w-[800px] mx-auto px-[16px] md:px-[24px] pb-[80px] md:pb-[120px]'>
        <div className='prose prose-invert max-w-none'>
          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>1. Agreement to Terms</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and LockIn.bot (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the LockIn.bot website, Telegram bot, and related services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>2. Description of Services</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              LockIn.bot is an AI-powered sales assistant for Telegram that helps users automate follow-ups and manage their sales pipeline. Our Services include, but are not limited to, automated messaging, contact management, deal tracking, and sales analytics.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>3. Eligibility</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              You must be at least 16 years old to use our Services. By using our Services, you represent and warrant that you meet this requirement and that you have the right, authority, and capacity to enter into these Terms.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>4. User Accounts</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>To use certain features of our Services, you may need to create an account. You are responsible for:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Providing accurate and complete information when creating your account</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Maintaining the confidentiality of your account credentials</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>All activities that occur under your account</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mt-[16px]'>
              We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>5. Subscription and Payment</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>Some of our Services require payment of fees. By subscribing to a paid plan, you agree to pay all fees in accordance with the pricing and payment terms presented to you. Unless otherwise stated:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>All fees are quoted in US dollars</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Payments are non-refundable except as expressly set forth in these Terms or as required by applicable law</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>You authorize us to charge your designated payment method for all fees</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>If your payment method fails or your account is past due, we may restrict or suspend access to our Services</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>6. Acceptable Use</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>You agree not to use our Services to:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Violate any applicable laws or regulations</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Send spam, unsolicited messages, or engage in any form of harassment</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Infringe upon the intellectual property rights of others</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Transmit any viruses, malware, or other harmful code</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>Interfere with or disrupt the integrity or performance of our Services</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>7. Intellectual Property</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              The Services and all content, features, and functionality are owned by the Company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>8. User Content</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              You retain ownership of any content you submit through our Services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing our Services to you. You represent and warrant that you have all necessary rights to grant this license.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>9. Termination</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>10. Disclaimer of Warranties</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>11. Limitation of Liability</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>12. Governing Law</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              These Terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Delaware.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>13. Changes to Terms</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We may modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or through our Services. Your continued use of the Services after such notification constitutes your acceptance of the modified Terms.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>14. Contact Us</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              If you have any questions about these Terms, please contact us at:<br /><br />
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

