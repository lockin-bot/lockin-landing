'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { InlineWidget } from 'react-calendly'

const CALENDLY_URL = 'https://calendly.com/letslockin/demo'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background elements - shared across entire page */}
      <div className='absolute left-1/2 -translate-x-1/2 top-0 w-[814px] md:w-[1222px] lg:w-[1443px] h-[600px] md:h-[900px] lg:h-[1000px] rounded-[169px] lg:rounded-[200px] bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

      {/* Stars Left */}
      <div className='w-[411px] md:w-[728px] h-[778px] md:h-[1380px] absolute top-0 -left-[221px] md:-left-[322px] lg:left-0 z-0 pointer-events-none'>
        <Image
          src={'/backgrounds/stars.svg'}
          width={1380}
          height={728}
          alt='Stars'
          priority
          draggable={false}
          className='w-full h-full object-contain'
        />
      </div>

      {/* Stars Right */}
      <div className='w-[411px] md:w-[728px] h-[778px] md:h-[1380px] absolute top-0 -right-[221px] md:-right-[322px] lg:right-0 z-0 pointer-events-none'>
        <Image
          src={'/backgrounds/stars.svg'}
          width={1380}
          height={728}
          alt='Stars'
          priority
          draggable={false}
          className='w-full h-full object-contain'
        />
      </div>

      {/* Hero Section */}
      <div className='w-full h-auto pt-[120px] md:pt-[160px] lg:pt-[180px] pb-[60px] md:pb-[80px] px-[16px] md:px-[24px] relative z-1'>

        {/* Content - Centered single column */}
        <div className='w-full max-w-[800px] mx-auto relative z-2'>
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-[40px] md:mb-[56px]"
          >
            <h1 className='text-[36px] md:text-[52px] lg:text-[60px] leading-[42px] md:leading-[58px] lg:leading-[68px] -tracking-[1.44px] md:-tracking-[2.08px] lg:-tracking-[2.4px] text-white font-hedvig font-normal mb-[16px] md:mb-[20px]'>
              You know the game.
              <br />
              <span className="text-purple-400">Now see the entire board.</span>
            </h1>
            <p className='text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] -tracking-[0.15px] text-white font-normal opacity-[.7] max-w-[500px] mx-auto'>
              Book a demo to see how LockIn reveals your hidden network on Telegram and X.
            </p>
          </motion.div>

          {/* Calendly embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
              <InlineWidget
                url={CALENDLY_URL}
                styles={{
                  width: '520px',
                  height: '620px',
                }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                  hideGdprBanner: true,
                  primaryColor: '7c3aed',
                  textColor: '1f2937',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className='w-full h-auto flex flex-col items-center px-[16px] md:px-[18px] pt-[24px] md:pt-[32px] lg:pt-[40px] relative z-1'>
        {/* Back to Home Link */}
        <Link href="/" className='flex items-center justify-center gap-[8px] mb-[80px] md:mb-[100px] lg:mb-[120px] group'>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none" className='rotate-180'>
            <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-white transition-all duration-300' />
          </svg>
          <span className='text-[14px] md:text-[16px] leading-[20px] -tracking-[0.15px] text-white font-normal opacity-[.5] group-hover:opacity-100 transition-all duration-300'>Back to Home</span>
        </Link>

        {/* Footer Block */}
        <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] min-h-[290px] md:min-h-[210px] lg:min-h-[280px] h-auto mx-auto bg-black border border-[#272727] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] backdrop-blur-[27px] px-[24px] md:px-[32px] lg:px-[48px] pt-[20px] md:pt-[24px] lg:pt-[48px]'>
          <div className='w-full mx-auto flex flex-col md:flex-row items-start justify-between'>
            {/* Left Block */}
            <div className='flex flex-col'>
              {/* Logo */}
              <Link href='/' className='flex max-w-[64px] h-auto mb-[8px] md:mb-[14px] lg:mb-[20px]'>
                <Image
                  src={'/brand/logo.svg'}
                  width={64}
                  height={26}
                  alt={'logo'}
                  draggable={false}
                  className='w-full h-full object-fit'
                />
              </Link>

              <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>Sales intelligence for Telegram and X</span>

              {/* Social Icons */}
              <div className='hidden md:flex items-center gap-[14px] md:mt-[14px] lg:mt-[30px]'>
                {/* Telegram */}
                <div className='w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://t.me/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                    <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                    <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_demo_footer)" />
                    <defs>
                      <linearGradient id="paint0_linear_demo_footer" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EDEDED" />
                        <stop offset="1" stopColor="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X (Twitter) */}
                <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                    <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                  </svg>
                </div>

                {/* LinkedIn */}
                <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                  <Link href='https://www.linkedin.com/company/lockin-bot/' target='_blank' className='absolute inset-0'></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Nav Block */}
            <div className='flex items-start gap-[48px] md:gap-[56px] lg:gap-[70px] max-md:mt-[24px]'>
              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Product</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/#features' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Features</Link>
                  <Link href='/#pricing' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Pricing</Link>
                  <Link href='/#security' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Security</Link>
                </div>
              </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Company</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/blog' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Blog</Link>
                  <Link href='/' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Careers</Link>
                </div>
              </div>

              <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Legal</h5>
                <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                  <Link href='/privacy' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Privacy</Link>
                  <Link href='/terms' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Terms</Link>
                  <Link href='/cookies' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Cookies</Link>
                </div>
              </div>
            </div>

            {/* Mobile Social Icons */}
            <div className='flex md:hidden items-center gap-[12px] mt-[28px] flex-wrap'>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://t.me/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                  <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                  <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_demo_footer_mobile)" />
                  <defs>
                    <linearGradient id="paint0_linear_demo_footer_mobile" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EDEDED" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 18 17" fill="none">
                  <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                </svg>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                <Link href='https://www.linkedin.com/company/lockin-bot/' target='_blank' className='absolute inset-0'></Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <span className='flex mt-[20px] md:mt-[24px] lg:mt-[32px] mb-[24px] lg:mb-[32px] justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>© 2025 LockIn. All rights reserved.</span>
      </div>
    </div>
  );
}
