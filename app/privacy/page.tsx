'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className='text-[14px] md:text-[16px] text-white opacity-[.5]'>Last updated: May 12, 2025</p>
      </div>

      {/* Content */}
      <div className='w-full max-w-[800px] mx-auto px-[16px] md:px-[24px] pb-[80px] md:pb-[120px]'>
        <div className='prose prose-invert max-w-none'>
          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>1. Introduction</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              Welcome to LockIn.bot (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and share information about you when you use our website (lockin.bot), our Telegram bot, and related services (collectively, our &quot;Services&quot;).
            </p>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              Please read this privacy policy carefully. If you have any questions about this privacy policy or our data practices, please contact us at support@lockin.bot.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>2. Information We Collect</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>
              We collect several types of information from and about users of our Services:
            </p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Account Information:</strong> When you register for our Services, we collect your name, email address, Telegram username, and other contact details you provide.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Business Information:</strong> Information about your contacts, leads, deals, and sales pipeline that you manage through our Services.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Communication Data:</strong> Messages, conversations, and other content you share through our Services, including communications with your contacts via our Telegram bot.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Usage Data:</strong> Information about how you use our Services, including features you use, actions you take, and time spent on our Services.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Technical Data:</strong> IP address, device information, browser type and version, time zone setting, operating system, and other technology on the devices you use to access our Services.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Payment Information:</strong> If you subscribe to our paid services, we collect payment method information, transaction details, and billing information.</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>3. How We Collect Your Information</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>We collect information through:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Direct Interactions:</strong> Information you provide when you create an account, subscribe to our Services, request support, or communicate with us.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Automated Technologies:</strong> As you interact with our Services, we automatically collect Technical Data using cookies, server logs, and similar technologies.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Third Parties:</strong> We may receive information about you from third-party services such as Telegram, analytics providers, and payment processors.</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>4. How We Use Your Information</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>We use your information for the following purposes:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To provide, maintain, and improve our Services</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To process and complete transactions</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To manage your account and provide you with customer support</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To send you technical notices, updates, security alerts, and administrative messages</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To communicate with you about products, services, offers, and events</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To monitor and analyze trends, usage, and activities in connection with our Services</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To personalize your experience and deliver content and product features relevant to your interests</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>To comply with legal obligations</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>5. Legal Basis for Processing (For EEA Users)</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>If you are in the European Economic Area (EEA), we process your personal data when:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>We need to perform a contract with you</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>You have given us consent to do so</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>We have a legitimate interest in processing your information</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>We need to comply with legal obligations</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>6. How We Share Your Information</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>We may share your personal information with:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as hosting, data analysis, payment processing, customer service, and marketing assistance.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Business Partners:</strong> Companies we partner with to offer integrated or co-branded services.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Legal Requirements:</strong> When required by law or to protect our rights or the rights of others.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>With Your Consent:</strong> We may share information with third parties when you consent to such sharing.</li>
            </ul>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>7. Data Retention</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We will retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we process the data, and applicable legal requirements.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>8. Data Security</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              We have implemented appropriate security measures to protect your personal information from accidental loss, unauthorized access, use, alteration, and disclosure. We limit access to your personal information to employees, agents, contractors, and other third parties who have a business need to know. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>9. Your Data Protection Rights</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mb-[16px]'>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul className='list-disc pl-[24px] space-y-[12px]'>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Access:</strong> You can request copies of your personal information.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Rectification:</strong> You can ask us to correct inaccurate or incomplete information.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Erasure:</strong> You can ask us to delete your personal information in certain circumstances.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Restriction:</strong> You can ask us to restrict the processing of your information in certain circumstances.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Data Portability:</strong> You can ask us to transfer your information to another organization or to you.</li>
              <li className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'><strong className='text-white'>Objection:</strong> You can object to our processing of your personal information.</li>
            </ul>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8] mt-[16px]'>
              If you wish to exercise any of these rights, please contact us at support@lockin.bot.
            </p>
          </section>

          <section className='mb-[48px]'>
            <h2 className='text-[24px] md:text-[28px] font-hedvig text-white mb-[16px]'>10. Contact Us</h2>
            <p className='text-[15px] md:text-[17px] leading-[1.7] text-white opacity-[.8]'>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:<br /><br />
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

