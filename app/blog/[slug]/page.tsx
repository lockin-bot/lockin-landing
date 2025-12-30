'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "introducing-lockin": {
    slug: "introducing-lockin",
    title: "Introducing LockIn: Lead Intelligence for Web3",
    date: "Oct 25, 2025",
    excerpt: "Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X.",
    category: "Product",
    content: `
      <p class="text-lg font-light leading-relaxed mb-6 text-gray-700">
        Today we're launching LockIn to help Web3 teams surface qualified leads from the noise of Telegram and X. After talking to dozens of BD and sales teams in crypto, we kept hearing the same problem: the best deals don't happen over email or LinkedIn—they happen in Telegram groups and X threads.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        The Problem with Web3 Sales
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Traditional CRMs weren't built for how Web3 deals actually happen. Your best prospects are having conversations in public Telegram channels, announcing projects in Discord, and signaling intent through X posts. But tracking all of this manually is impossible at scale.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        How LockIn Works
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        LockIn connects to your Telegram and X accounts to automatically surface qualified leads based on your criteria. We use AI to enrich contact profiles, bridge identities across platforms, and identify buying signals in real-time.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Connect
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Bring together all your contacts from Telegram and X into one unified platform. Sync with your existing CRM tools like Hubspot and Pipedrive.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Enrich
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Automatically link Telegram profiles to X accounts using public data. Generate context on each contact so you know exactly how to approach them.
      </p>

      <h3 class="text-2xl font-light mt-8 mb-4">
        Discover
      </h3>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        Monitor groups, posts, and news signals to discover qualified opportunities. Get alerts when prospects show buying intent.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Built for Privacy
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        All your data is encrypted inside a Trusted Execution Environment. We never send your conversations to third-party AI providers. Our code and security proofs are published on-chain so you can verify exactly what we're doing.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Get Started
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        We're opening up early access to LockIn today. If you're a BD or sales professional in Web3, we'd love to have you try it out. Get started at lockin.ai.
      </p>
    `
  },
  "why-web3-sales-different": {
    slug: "why-web3-sales-different",
    title: "Why Web3 Sales is Different",
    date: "Oct 20, 2025",
    excerpt: "Deals in Web3 don't happen over email or LinkedIn. They happen in Telegram groups and X threads.",
    category: "Insights",
    content: `
      <p class="text-lg font-light leading-relaxed mb-6 text-gray-700">
        If you've ever tried to apply traditional B2B sales tactics to Web3, you've probably noticed they don't quite work. The entire sales motion is fundamentally different.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        Where Deals Actually Happen
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        In traditional B2B, you might cold email a prospect, set up a call, send a deck, and close over Zoom. In Web3, your best prospects are already in your Telegram groups. They're engaging with your content on X. They're asking questions in Discord.
      </p>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The deal doesn't start with an outbound email—it starts with a reply in a group chat.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        The Signal Problem
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The challenge is volume. A single Telegram group might have hundreds of messages per day. Multiply that across 10, 20, 50 groups, and it's impossible to manually track every potential lead signal.
      </p>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        You need automation, but not the kind that feels robotic. You need intelligence that surfaces the right opportunities at the right time.
      </p>

      <h2 class="text-3xl font-light mt-12 mb-6">
        What Good Web3 Sales Looks Like
      </h2>
      <p class="font-light leading-relaxed mb-6 text-gray-700">
        The best BD teams in crypto have systems for this. They track conversations, enrich contacts, and respond quickly when opportunities emerge. LockIn automates this entire workflow.
      </p>
    `
  }
};

function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts[slug];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Send iframe context to parent window (scroll position and page)
  useEffect(() => {
    const sendContext = () => {
      window.parent.postMessage({
        type: 'IFRAME_CONTEXT',
        page: window.location.pathname,
        scroll: window.scrollY
      }, '*');
    };

    // Send initial context
    sendContext();

    // Update on scroll
    const handleScroll = () => {
      sendContext();
    };

    // Update on navigation
    const handlePopState = () => {
      sendContext();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Listen for navigation commands from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE_TO') {
        if (event.data.page && event.data.page !== window.location.pathname) {
          window.history.pushState({}, '', event.data.page);
        }
        if (typeof event.data.scroll === 'number') {
          window.scrollTo(0, event.data.scroll);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Find the Strongest Path to Any Deal */}
      <div className='w-full h-auto flex px-[16px] md:px-[28px] relative z-1'>
        <div className='w-full max-w-[1168px] mx-auto flex flex-col lg:px-[28px] rounded-[24px] md:rounded-[32px] lg:rounded-[44px] bg-black overflow-hidden' style={{ border: '1px solid rgba(255, 255, 255, 0.10)' }}>

          {/* Find the Strongest Path to Any Deal Block */}
          <div className='w-full h-auto flex flex-col items-center pt-[24px] md:pt-[36px] lg:pt-[56px] pb-[212px] md:pb-[354px] lg:pb-[404px] px-[22px] md:px-[66px] overflow-hidden relative'>
            {/* Content Block */}
            <div className='w-full max-w-[881px] mx-auto flex flex-col items-center gap-[12px] lg:gap-[20px]'>
              <h2 className='flex max-md:max-w-[267px] text-[24px] md:text-[36px] lg:text-[44px] leading-[32px] md:leading-[54px] lg:leading-[64px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal'>Find the Strongest Path to Any Deal</h2>

              <span className='flex w-full max-w-[297px] md:max-w-[583px] lg:max-w-[751px] text-[15px] md:text-[20px] leading-[22px] md:leading-[28px] -tracking-[0.22px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>LockIn maps your team's network across Telegram and X into a living relationship graph. Instantly figure out your best path to any account.</span>
            </div>

            {/* Founder & CEO Block */}
            {/* Back Layer */}
            <div className='absolute -bottom-[59px] md:-bottom-[99px] lg:-bottom-[111px] left-1/2 -translate-x-1/2
                  w-[347px] md:w-[622px] lg:w-[723px] h-[216px] md:h-[388px] lg:h-[451px]
                  drop-shadow-[0_6.719px_54.712pxrgba(255,255,255,0.11)] md:drop-shadow-[0_12.047px_98.093px_rgba(255,255,255,0.11)] lg:drop-shadow-[0_14px_114px_rgba(255,255,255,0.11)]
                  '>
              {/* Back Layer Left */}
              <div className='w-[317px] md:w-[568px] lg:w-[660px] h-full flex absolute left-0 top-0 bg-black border border-[#272727] rounded-[15px] md:rounded-[26px] lg:rounded-[31px] opacity-[.7]'></div>

              {/* Back Layer Right */}
              <div className='w-[317px] md:w-[568px] lg:w-[660px] h-full flex absolute right-0 top-0 bg-black border border-[#272727] rounded-[15px] md:rounded-[26px] lg:rounded-[31px] opacity-[.7]'></div>
            </div>

            {/* Main Layer */}
            <div className='w-[317px] md:w-[568px] lg:w-[660px] h-[216px] md:h-[388px] lg:h-[451px] px-[16px] md:px-[28px] lg:px-[24px] pt-[14px] md:pt-[25px] lg:pt-[29px] flex items-start absolute left-1/2 -translate-x-1/2 -bottom-[48px] md:-bottom-[80px] lg:-bottom-[89px] bg-black border border-[#272727] rounded-[15px] md:rounded-[26px] lg:rounded-[31px]'>
              <Image
                src={'/find-the-strongest-path.svg'}
                width={592}
                height={282}
                alt='Founder & CEO'
                className='w-full h-auto'
                priority
                draggable={false}
              />
            </div>

            {/* Line Wrapper */}
            <div className='w-full h-px absolute bottom-0 left-0 px-[12px] md:px-[16px]'>
              <div className='w-full max-w-[982px] mx-auto h-full bg-[#272727]'></div>
            </div>
          </div>

          {/* Know the Right Moment to Reach Out */}
          <div className='w-full h-auto flex flex-col items-center pt-[24px] md:pt-[36px] lg:pt-[56px] px-[16px] md:px-[46px] pb-[95px] md:pb-[148px] lg:pb-[182px] relative overflow-hidden'>
            {/* Content Block */}
            <div className='w-full max-w-[751px] mx-auto flex flex-col items-center gap-[12px] lg:gap-[20px] mb-[25px] md:mb-[37px] lg:mb-[42px]'>
              <h2 className='flex max-md:max-w-[288px] text-[24px] md:text-[36px] lg:text-[44px] leading-[32px] md:leading-[54px] lg:leading-[48px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal'>Know the Right Moment to Reach Out</h2>

              <span className='flex w-full text-[15px] md:text-[20px] leading-[22px] md:leading-[28px] -tracking-[0.22px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>Define detailed, granular rules for how signals are detected and delivered, ensuring you’re alerted only to the interactions that actually move deals forward.</span>
            </div>

            {/* Notify Me Block */}
            <div className='w-[311px] md:w-[637px] lg:w-[741px] h-[59px] md:h-[121px] lg:h-[141px] relative'>
              {/* Little Block */}
              <div className='w-[243px] md:w-[497px] lg:w-[579px] h-[36px] md:h-[75px] lg:h-[87px] absolute left-1/2 -translate-x-1/2 bottom-0 border border-[#272727] bg-black opacity-[.1] rounded-[368px] md:rounded-[754px] lg:rounded-[878px]'></div>

              {/* Middle Block */}
              <div className='w-[269px] md:w-[552px] lg:w-[642px] h-[40px] md:h-[83px] lg:h-[96px] absolute left-1/2 -translate-x-1/2 bottom-[8px] md:bottom-[17px] lg:bottom-[19px] border border-[#272727] bg-black opacity-[.5] rounded-[368px] md:rounded-[754px] lg:rounded-[878px]'></div>

              {/* Top Block */}
              <div className='w-full h-[45px] md:h-[93px] lg:h-[108px] absolute left-1/2 -translate-x-1/2 top-0 border border-[#272727] bg-[#060606] rounded-[37px] md:rounded-[75px] lg:rounded-[88px] z-1 shadow-[0_5.145px_41.898px_0_rgba(255,255,255,0.11)] md:shadow-[0_10.55px_85.911px_0_rgba(255,255,255,0.11)] lg:shadow-[0_12.277px_99.969px_0_rgba(255,255,255,0.11)] flex items-center justify-center gap-[9px] md:gap-[18px] lg:gap-[21px]'>
                <svg className='w-[10px] md:w-[20px] lg:w-[23px] h-auto' xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M10.5032 16.8469C10.4015 16.4524 10.1958 16.0924 9.90774 15.8043C9.61964 15.5162 9.25961 15.3106 8.8651 15.2088L1.87138 13.4054C1.75206 13.3715 1.64705 13.2996 1.57227 13.2007C1.49749 13.1017 1.45703 12.9811 1.45703 12.857C1.45703 12.733 1.49749 12.6123 1.57227 12.5134C1.64705 12.4144 1.75206 12.3426 1.87138 12.3087L8.8651 10.5041C9.25947 10.4025 9.61941 10.197 9.90749 9.90911C10.1956 9.62123 10.4013 9.26143 10.5032 8.86713L12.3067 1.87341C12.3402 1.75361 12.412 1.64808 12.5111 1.5729C12.6102 1.49772 12.7312 1.45703 12.8556 1.45703C12.98 1.45703 13.1009 1.49772 13.2 1.5729C13.2991 1.64808 13.3709 1.75361 13.4045 1.87341L15.2068 8.86713C15.3085 9.26164 15.5142 9.62167 15.8023 9.90977C16.0903 10.1979 16.4504 10.4035 16.8449 10.5053L23.8386 12.3076C23.9589 12.3407 24.0649 12.4125 24.1405 12.5117C24.2161 12.611 24.257 12.7323 24.257 12.857C24.257 12.9818 24.2161 13.1031 24.1405 13.2024C24.0649 13.3016 23.9589 13.3733 23.8386 13.4065L16.8449 15.2088C16.4504 15.3106 16.0903 15.5162 15.8023 15.8043C15.5142 16.0924 15.3085 16.4524 15.2068 16.8469L13.4033 23.8407C13.3698 23.9604 13.298 24.066 13.1989 24.1412C13.0998 24.2163 12.9788 24.257 12.8544 24.257C12.73 24.257 12.6091 24.2163 12.5099 24.1412C12.4108 24.066 12.3391 23.9604 12.3055 23.8407L10.5032 16.8469Z" fill="white" stroke="white" stroke-width="2.91542" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                {/* Content */}
                <div className='flex flex-col items-start gap-[8px] md:gap-[16px] lg:gap-[18px]'>
                  <h5 className='whitespace-nowrap text-[8.7px] md:text-[18px] lg:text-[21px] leading-[10.2px] md:leading-[21px] lg:leading-[24.4px] -tracking-[0.175px] md:-tracking-[0.36px] lg:-tracking-[0.419px] text-white font-medium inline-block'>
                    When <p className='inline-block text-[#7796F1] relative'>anyone
                      <Image
                        src={'/find-the-strongest-path/text-line-1.svg'}
                        width={71}
                        height={1.7}
                        alt='Text Line 1'
                        className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                        priority
                        draggable={false}
                      />
                    </p> <p className='inline-block text-[#CC77F1] relative'>in my ICP
                      <Image
                        src={'/find-the-strongest-path/text-line-2.svg'}
                        width={87}
                        height={1.7}
                        alt='Text Line 1'
                        className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                        priority
                        draggable={false}
                      />
                    </p> is <p className='inline-block text-[#77F1D9] relative'>active
                      <Image
                        src={'/find-the-strongest-path/text-line-3.svg'}
                        width={56}
                        height={1.7}
                        alt='Text Line 1'
                        className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                        priority
                        draggable={false}
                      />
                    </p> in <p className='inline-block text-[#F1C477] relative'>any of my groups
                      <Image
                        src={'/find-the-strongest-path/text-line-4.svg'}
                        width={165}
                        height={1.7}
                        alt='Text Line 1'
                        className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                        priority
                        draggable={false}
                      />
                    </p> on <p className='inline-block text-[#F177BE] relative'>Telegram
                      <Image
                        src={'/find-the-strongest-path/text-line-5.svg'}
                        width={88}
                        height={1.7}
                        alt='Text Line 1'
                        className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                        priority
                        draggable={false}
                      />
                    </p>

                  </h5>

                  {/* Notify me on telegram */}
                  <div className='flex items-center gap-[3px] md:gap-[6px] lg:gap-[7px]'>
                    {/* Single signal Alert */}
                    <div className='w-[95px] md:w-[194px] lg:w-[227px] h-[13.4px] md:h-[27px] lg:h-[32px] flex items-center justify-center gap-[3px] md:gap-[6px] lg:gap-[7px] bg-[rgba(255,255,255,0.10)] rounded-[37px] md:rounded-[75px] lg:rounded-[88px]'>
                      <svg className='w-[6px] md:w-[12px] lg:w-[14px] h-auto' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <g opacity="0.8">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56348 10.5156V10.8151C5.56348 11.2012 5.71694 11.5715 5.99009 11.8444C6.26323 12.1173 6.63365 12.2705 7.01978 12.2702C7.40596 12.2704 7.77637 12.1171 8.0495 11.844C8.32262 11.571 8.47607 11.2007 8.47607 10.8145V10.5156" fill="white" />
                          <path d="M5.56348 10.5156V10.8151C5.56348 11.2012 5.71694 11.5715 5.99009 11.8444C6.26323 12.1173 6.63365 12.2705 7.01978 12.2702V12.2702C7.40596 12.2704 7.77637 12.1171 8.0495 11.844C8.32262 11.571 8.47607 11.2007 8.47607 10.8145V10.5156" stroke="white" stroke-width="0.876923" stroke-linecap="round" stroke-linejoin="round" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.493 10.5151C11.1561 10.5151 11.6937 9.97749 11.6937 9.31436C11.6934 8.97749 11.5597 8.65446 11.3217 8.41601L10.524 7.61885V5.25134C10.524 3.31329 8.95286 1.74219 7.01481 1.74219C5.07676 1.74219 3.50566 3.31329 3.50566 5.25134V7.61885L2.70791 8.41601C2.46996 8.65446 2.33621 8.97749 2.33594 9.31436C2.33594 9.63281 2.46244 9.93821 2.68762 10.1634C2.9128 10.3886 3.2182 10.5151 3.53665 10.5151H10.493Z" fill="white" stroke="white" stroke-width="0.876923" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                      </svg>

                      <span className='text-[7px] md:text-[15px] lg:text-[17px] leading-[9px] md:leading-[18px] lg:leading-[21px] -tracking-[0.146px] md:-tracking-[0.3px] lg:-tracking-[0.349px] text-white font-normal'>Notify me on Telegram</span>
                    </div>

                    {/* Single signal Alert */}
                    <div className='w-[63px] md:w-[128px] lg:w-[150px] h-[13.4px] md:h-[27px] lg:h-[32px] flex items-center justify-center gap-[3px] md:gap-[6px] lg:gap-[7px] bg-[rgba(255,255,255,0.10)] rounded-[37px] md:rounded-[75px] lg:rounded-[88px]'>
                      <svg className='w-[6px] md:w-[12px] lg:w-[14px] h-auto' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <g opacity="0.8">
                          <path d="M7.03027 1.02148C10.1795 1.02148 12.7324 3.57443 12.7324 6.72363C12.7324 9.87287 10.1795 12.4258 7.03027 12.4258C3.88107 12.4257 1.32812 9.87285 1.32812 6.72363C1.32816 3.57445 3.88109 1.02152 7.03027 1.02148ZM6.67578 3.35742C6.43383 3.35766 6.2373 3.55389 6.2373 3.7959V7.07227C6.2373 7.31428 6.43383 7.51051 6.67578 7.51074L6.67676 7.50977L6.67773 7.51074H9.39746C9.63956 7.51067 9.83594 7.31438 9.83594 7.07227C9.8357 6.83036 9.63941 6.63386 9.39746 6.63379H7.11426V3.7959C7.11426 3.55374 6.91794 3.35742 6.67578 3.35742Z" fill="white" />
                        </g>
                      </svg>

                      <span className='text-[7px] md:text-[15px] lg:text-[17px] leading-[9px] md:leading-[18px] lg:leading-[21px] -tracking-[0.146px] md:-tracking-[0.3px] lg:-tracking-[0.349px] text-white font-normal'>Once a week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Signal Block */}
            <div className='px-[6px] md:px-[9px] lg:px-[10px] py-[3.75px] md:py-[5px] lg:py-[6px] flex items-center justify-center gap-[5px] md:gap-[7px] lg:gap-[8px] rounded-[23px] md:rounded-[34px] lg:rounded-[40px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[13px] md:backdrop-blur-[19px] lg:backdrop-blur-[22px] mt-[16px] md:mt-[16px] lg:mt-[18px]'>
              {/* Circle */}
              <div className='w-[6.5px] md:w-[9px] lg:w-[11px] h-[6px] md:h-[9px] lg:h-[11px] rounded-full bg-[#42ED8C]'></div>

              {/* Text */}
              <span className='text-[9px] md:text-[14px] lg:text-[16px] leading-[13px] md:leading-[18px] lg:leading-[21px] -tracking-[0.189px] md:-tracking-[0.277px] lg:-tracking-[0.322px] text-white font-semibold'>New Signal </span>
            </div>

            {/* Cards Block */}
            <div className='w-[317px] md:w-[634px] lg:w-[738px] h-[81px] md:h-[151px] lg:h-[175px] absolute -bottom-[12px] md:-bottom-[36px] lg:-bottom-[32px] left-1/2 -translate-x-1/2 md:-translate-x-[calc(50%-22px)] lg:-translate-x-[calc(50%-26px)] drop-shadow-[0_5.635px_45.889px_rgba(255,255,255,0.11)] md:drop-shadow-[0_10.55px_85.911px_rgba(255,255,255,0.11)] lg:drop-shadow-[0_12.277px_99.969px_rgba(255,255,255,0.11)]'>
              {/* Card 1 */}
              <div className='w-[181px] md:w-[338px] lg:w-[393px] h-[66px] md:h-[123px] lg:h-[143px] absolute top-[9px] md:top-[16px] lg:top-[19px] left-0 rounded-[9px] md:rounded-[18px] lg:rounded-[21px] border-[.3px] md:border-[.6px] lg:border-[.7px] border-[#272727] bg-[rgba(0,0,0,1)] backdrop-blur-[9px] md:backdrop-blur-[17px] lg:backdrop-blur-[19px] p-[8px] md:p-[16px] lg:p-[18px]'>
                <div className='w-full h-full flex items-start gap-[6px] md:gap-[11px] lg:gap-[12px]'>
                  {/* Logo */}
                  <div className='w-[23px] md:w-[42px] lg:w-[49px] min-w-[23px] md:min-w-[42px] lg:min-w-[49px] h-[23px] md:h-[42px] lg:h-[49px] p-[3px] md:p-[5px] lg:p-[6px] flex items-center justify-center rounded-[7px] md:rounded-[13px] lg:rounded-[15px] border-[.5px] border-[rgba(255,255,255,0.20)] bg-black'>
                    <Image
                      src={'/know-the-right-moment/logo-1.png'}
                      width={38}
                      height={38}
                      alt='Logo 1'
                      className='w-full h-auto'
                      priority
                      draggable={false}
                    />
                  </div>

                  {/* Content Block */}
                  <div className='w-full h-full flex flex-col'>
                    <h5 className='text-[8px] md:text-[14px] lg:text-[17px] leading-none text-white font-semibold flex mb-[5px] md:mb-[9px] lg:mb-[11px]'>Helius – Product Launch</h5>

                    <span className='text-[6px] md:text-[11px] lg:text-[12px] leading-normal -tracking-[0.113px] text-white opacity-[.8] font-normal flex mb-[6px] md:mb-[10px] lg:mb-[12px]'>Helius just announced a major upgrade in Solana Builders Group. This is a warm intro opportunity through your mutual connection.</span>

                    <p className='text-[6px] md:text-[11px] lg:text-[12px] leading-none -tracking-[0.113px] text-white opacity-[.4] font-normal flex'>Sent via email & Telegram</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className='w-[181px] md:w-[338px] lg:w-[393px] h-[66px] md:h-[123px] lg:h-[143px] absolute top-0 left-[66px] md:left-[124px] lg:left-[144px] rounded-[9px] md:rounded-[18px] lg:rounded-[21px] border-[.3px] md:border-[.6px] lg:border-[.7px] border-[#272727] bg-[rgba(0,0,0,1)] backdrop-blur-[9px] md:backdrop-blur-[17px] lg:backdrop-blur-[19px] p-[8px] md:p-[16px] lg:p-[18px]'>
                <div className='w-full h-full flex items-start gap-[6px] md:gap-[11px] lg:gap-[12px]'>
                  {/* Logo */}
                  <div className='w-[23px] md:w-[42px] lg:w-[49px] min-w-[23px] md:min-w-[42px] lg:min-w-[49px] h-[23px] md:h-[42px] lg:h-[49px] p-[3px] md:p-[5px] lg:p-[6px] flex items-center justify-center rounded-[7px] md:rounded-[13px] lg:rounded-[15px] border-[.5px] border-[rgba(255,255,255,0.20)] bg-[#090E21]'>
                    <Image
                      src={'/know-the-right-moment/logo-2.png'}
                      width={24}
                      height={31}
                      alt='Logo 2'
                      className='w-full max-w-[11px] md:max-w-[24px] h-auto'
                      priority
                      draggable={false}
                    />
                  </div>

                  {/* Content Block */}
                  <div className='w-full h-full flex flex-col'>
                    <h5 className='text-[8px] md:text-[14px] lg:text-[17px] leading-none text-white font-semibold flex mb-[5px] md:mb-[9px] lg:mb-[11px]'>Drift – Mobile App Beta</h5>

                    <span className='text-[6px] md:text-[11px] lg:text-[12px] leading-normal -tracking-[0.113px] text-white opacity-[.8] font-normal flex mb-[6px] md:mb-[10px] lg:mb-[12px]'>Drift just launched their mobile app beta in Solana Trading Hub. This is a warm intro opportunity through your mutual connection.</span>

                    <p className='text-[6px] md:text-[11px] lg:text-[12px] leading-none -tracking-[0.113px] text-white opacity-[.4] font-normal flex'>Sent via email & Telegram</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className='w-[181px] md:w-[338px] lg:w-[393px] h-[66px] md:h-[123px] lg:h-[143px] absolute top-[15px] md:top-[28px] lg:top-[32px] right-0 rounded-[9px] md:rounded-[18px] lg:rounded-[21px] border-[.3px] md:border-[.6px] lg:border-[.7px] border-[#272727] bg-[rgba(0,0,0,1)] backdrop-blur-[9px] md:backdrop-blur-[17px] lg:backdrop-blur-[19px] p-[8px] md:p-[16px] lg:p-[18px]'>
                <div className='w-full h-full flex items-start gap-[6px] md:gap-[11px] lg:gap-[12px]'>
                  {/* Logo */}
                  <div className='w-[23px] md:w-[42px] lg:w-[49px] min-w-[23px] md:min-w-[42px] lg:min-w-[49px] h-[23px] md:h-[42px] lg:h-[49px] p-[3px] md:p-[5px] lg:p-[6px] flex items-center justify-center rounded-[7px] md:rounded-[13px] lg:rounded-[15px] border-[.5px] border-[rgba(255,255,255,0.20)]' style={{ background: 'linear-gradient(180deg, #825AA0 17.19%, #F2878A 84.38%), #090E21' }}>
                    <Image
                      src={'/know-the-right-moment/logo-3.png'}
                      width={39}
                      height={38}
                      alt='Logo 2'
                      className='w-full max-w-[18px] md:max-w-[39px] h-auto'
                      priority
                      draggable={false}
                    />
                  </div>

                  {/* Content Block */}
                  <div className='w-full h-full flex flex-col'>
                    <h5 className='text-[8px] md:text-[14px] lg:text-[17px] leading-none text-white font-semibold flex mb-[5px] md:mb-[9px] lg:mb-[11px]'>Clockwork – Automation SDK 2.0</h5>

                    <span className='text-[6px] md:text-[11px] lg:text-[12px] leading-normal -tracking-[0.113px] text-white opacity-[.8] font-normal flex mb-[6px] md:mb-[10px] lg:mb-[12px]'>Clockwork introduced SDK 2.0 with major performance boosts in Solana Devs Circle. Consider reaching out via mutuals.</span>

                    <p className='text-[6px] md:text-[11px] lg:text-[12px] leading-none -tracking-[0.113px] text-white opacity-[.4] font-normal flex'>Sent via email & Telegram</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Wrapper */}
            <div className='w-full h-px absolute bottom-0 left-0 px-[12px] md:px-[16px] z-1'>
              <div className='w-full max-w-[982px] mx-auto h-full bg-[#272727]'></div>
            </div>

            {/* Bottom Gradient */}
            <div className='absolute left-0 md:-bottom-[194px] lg:-bottom-[133px] w-full hidden md:flex h-[229px] z-0' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 37.57%)' }}></div>
          </div>

          {/* Expand Beyond Your Own Network */}
          <div className='w-full h-auto flex flex-col items-center pt-[29px] md:pt-[38px] lg:pt-[56px] px-[16px] md:px-[46px] pb-[185px] md:pb-[352px] lg:pb-[376px] relative overflow-hidden'>
            {/* Content Block */}
            <div className='w-full max-w-[751px] mx-auto flex flex-col items-center gap-[12px] lg:gap-[20px] mb-[25px] md:mb-[37px] lg:mb-[42px]'>
              <h2 className='flex max-md:max-w-[272px] text-[24px] md:text-[36px] lg:text-[44px] leading-[32px] md:leading-[54px] lg:leading-[48px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal'>Expand Beyond Your Own Network</h2>

              <span className='flex w-full text-[15px] md:text-[20px] leading-[22px] md:leading-[28px] -tracking-[0.22px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>Our shared intelligence graph spans 20k+ web3 organizations, 2m+ social profiles, and hundreds of Telegram hubs. Build new connections and opportunities across the broader ecosystem.</span>
            </div>

            {/* Globe image block */}
            <div className='w-full min-w-[620px] md:min-w-[875px] lg:min-w-[1016px] h-auto absolute left-1/2 -translate-x-1/2 bottom-0 flex'>
              <Image
                src={'/globe-expand-beyond.png'}
                width={1110}
                height={419}
                alt='Globe'
                className='w-full h-auto'
                priority
                draggable={false}
              />
            </div>

            {/* Bottom Gradient */}
            <div className='absolute left-0 md:-bottom-[143px] lg:-bottom-[83px] w-full hidden md:flex h-[229px] z-0' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 37.57%)' }}></div>
          </div>

          {/* <div className='w-full h-screen bg-black'></div> */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <span className="text-lg sm:text-xl font-light">LockIn</span>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="/" className="text-sm font-light hover:text-gray-600">Home</a>
            <a href="/#pricing" className="text-sm font-light hover:text-gray-600">Pricing</a>
            <a href="/blog" className="text-sm font-light hover:text-gray-600">Blog</a>
            <button className="px-4 lg:px-6 py-2 bg-gray-900 text-white text-sm font-light rounded hover:bg-gray-800">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Blog Post Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
        <a href="/blog" className="text-sm font-light text-gray-600 hover:text-gray-900 mb-8 inline-block">
          ← Back to blog
        </a>

        <div className="mb-6">
          <span className="text-xs font-light text-gray-500 mb-2 block">
            {post.category} · {post.date}
          </span>
          <h1 className="text-4xl sm:text-5xl font-light mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6">
            Ready to Lock In More Deals?
          </h2>
          <p className="text-lg font-light text-gray-400 mb-8">
            Join top Web3 teams turning Telegram noise into qualified pipeline
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 text-sm font-light rounded hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <span className="text-sm font-light">LockIn</span>
            </div>
            <p className="text-xs font-light text-gray-600">
              Lead intelligence for Web3
            </p>
          </div>

          <div>
            <h4 className="text-sm font-light mb-4">Product</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="/#features" className="hover:text-gray-900">Features</a></li>
              <li><a href="/#pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light mb-4">Company</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="/blog" className="hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light mb-4">Connect</h4>
            <ul className="space-y-2 text-xs font-light text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900">Telegram</a></li>
              <li><a href="#" className="hover:text-gray-900">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500">
          <p className="text-center sm:text-left">© 2025 LockIn. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

