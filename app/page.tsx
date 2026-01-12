'use client';
import React, { useRef, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollTrigger);

// Hook to detect mobile
function useIsMobile() {
   const [isMobile, setIsMobile] = useState(false);
   
   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);
   
   return isMobile;
}

// Hero Owl Lottie component that cycles through animations with crossfade
const heroOwlLotties = ['/hero/owl-1.lottie', '/hero/owl-2.lottie', '/hero/owl-3.lottie'];
const OVERLAP_SECONDS = 3; // seconds before end to start next animation
const FADE_DURATION = 2; // seconds for crossfade transition
const PLAYBACK_SPEED = 1.5; // animation speed multiplier

function HeroOwlLottie() {
   const [animations, setAnimations] = useState<{ index: number; key: number; opacity: number }[]>([
      { index: 0, key: 0, opacity: 1 }
   ]);
   const keyCounterRef = useRef(1);
   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const startNextAnimation = useCallback(() => {
      setAnimations(prev => {
         const currentIndex = prev[prev.length - 1].index;
         const nextIndex = (currentIndex + 1) % heroOwlLotties.length;
         const newKey = keyCounterRef.current++;
         
         // Add new animation, mark old one to fade out
         return [
            ...prev.map(a => ({ ...a, opacity: 0 })),
            { index: nextIndex, key: newKey, opacity: 1 }
         ];
      });

      // Remove old animations after fade completes
      setTimeout(() => {
         setAnimations(prev => prev.filter(a => a.opacity === 1));
      }, FADE_DURATION * 1000);
   }, []);

   const dotLottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
      if (dotLottie) {
         // Clear any existing timer
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }

         // Wait for the animation to be ready to get duration
         const handleLoad = () => {
            const duration = dotLottie.duration / PLAYBACK_SPEED; // actual duration accounting for speed
            const transitionTime = Math.max(0, (duration - OVERLAP_SECONDS)) * 1000;
            
            timerRef.current = setTimeout(() => {
               startNextAnimation();
            }, transitionTime);
         };

         // Check if already loaded
         if (dotLottie.isLoaded) {
            handleLoad();
         } else {
            dotLottie.addEventListener('load', handleLoad);
         }
      }
   }, [startNextAnimation]);

   // Cleanup timers on unmount
   useEffect(() => {
      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }
      };
   }, []);

   return (
      <div className='absolute -top-[120px] md:-top-[310px] lg:-top-[560px] left-1/2 -translate-x-[50%] md:-translate-x-1/2 w-[500px] md:w-[1050px] lg:w-[1600px] xl:w-[1800px] 2xl:w-[2200px] h-[345px] md:h-[724px] lg:h-[1100px] xl:h-[1240px] 2xl:h-[1500px] z-0 pointer-events-none'>
         {animations.map((anim) => (
            <div
               key={anim.key}
               className='absolute inset-0'
               style={{
                  opacity: anim.opacity,
                  transition: `opacity ${FADE_DURATION}s ease-in-out`
               }}
            >
               <DotLottieReact
                  src={heroOwlLotties[anim.index]}
                  autoplay
                  speed={PLAYBACK_SPEED}
                  dotLottieRefCallback={anim.opacity === 1 ? dotLottieRefCallback : undefined}
                  style={{ width: '100%', height: '100%' }}
               />
            </div>
         ))}
      </div>
   );
}

const carouselData = [
   {
      desc: 'Built for the way Web3 deals actually happen – in Telegram groups and X threads for the way Web3 deals actually happen',
      avatar: '/testimonials/ceo-image.webp',
      avatarWidth: 30,
      avatarHeight: 30,
      name: 'Bob Mark',
      role: 'CEO'
   },
   {
      desc: 'Built for the way Web3 deals actually happen – in Telegram groups and X threads for the way Web3 deals actually happen',
      avatar: '/testimonials/ceo-image.webp',
      avatarWidth: 30,
      avatarHeight: 30,
      name: 'Bob Mark',
      role: 'CEO'
   },
   {
      desc: 'Built for the way Web3 deals actually happen – in Telegram groups and X threads for the way Web3 deals actually happen',
      avatar: '/testimonials/ceo-image.webp',
      avatarWidth: 30,
      avatarHeight: 30,
      name: 'Bob Mark',
      role: 'CEO'
   }
];

const faqData = [
   {
      question: 'How does LockIn know which conversations are sales-related?',
      desc: 'LockIn uses AI to automatically identify and categorize conversations relevant to your business from all your Telegram chats. It analyzes message content, context, and patterns to distinguish sales opportunities from casual conversations.'
   },
   {
      question: 'Do I need to add the bot to each Telegram chat?',
      desc: 'No, LockIn works seamlessly in the background across all your Telegram conversations. Once set up, it automatically monitors and tracks relevant conversations without requiring manual configuration for each chat.'
   },
   {
      question: 'Is my business data private and secure?',
      desc: 'Absolutely. All your data is encrypted inside a Trusted Execution Environment (TEE), meaning your messages, deal flow, and private group chats stay completely private. We never send your conversations to third-party AI providers.'
   },
   {
      question: 'Can I customize the sales pipeline stages?',
      desc: 'Yes, Pro plan users can create custom sales pipeline stages to match their specific workflow. You can define your own stages, labels, and criteria for how deals progress through your pipeline.'
   },
   {
      question: 'How accurate is the AI in detecting sales opportunities?',
      desc: 'Our AI has been trained specifically on sales and BD conversations in Web3 and tech industries. Users report high accuracy in identifying leads and deal progress, with continuous improvements based on feedback.'
   },
   {
      question: 'Can I export my data to other CRM systems?',
      desc: 'Yes, you can export your deal data, contact lists, and conversation history. We support CSV exports and are working on direct integrations with popular CRM platforms.'
   }
]

export default function page() {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const boxWidthRef = useRef(0);
   const gapRef = useRef(0);
   const activeIndexRef = useRef(0);
   const [activeIndex, setActiveIndex] = useState(0);
   const progressRefs = useRef<HTMLDivElement[]>([]);
   const progressTweenRef = useRef<gsap.core.Tween | null>(null);
   const nextRef = useRef<() => void>(() => { });
   const [activeFaq, setActiveFaq] = useState<number | null>(null);
   const [activePrevFaq, setActivePrevFaq] = useState<number | null>(null);
   const isMobile = useIsMobile();

   const setActive = useCallback((idx: number) => {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
   }, []);

   const updateOpacity = useCallback(() => {
      if (!containerRef.current) return;
      const items = containerRef.current.children;
      const centerIndex = Math.floor(items.length / 2);
      gsap.set(items, {
         opacity: (i: number) => (i === centerIndex ? 1 : 0.2)
      });
   }, []);

   const fadeToCenter = useCallback((targetIndex: number) => {
      if (!containerRef.current) return;
      const items = containerRef.current.children;
      gsap.to(items, {
         opacity: (i: number) => (i === targetIndex ? 1 : 0.2),
         duration: 0.6,
         ease: 'power2.inOut'
      });
   }, []);

   const measureBox = useCallback(() => {
      if (!containerRef.current) return;

      const items = containerRef.current.children;
      const firstBox = items[0] as HTMLElement;
      if (!firstBox) return;

      boxWidthRef.current = firstBox.getBoundingClientRect().width;
      const computedGap = parseFloat(
         window.getComputedStyle(containerRef.current).columnGap ||
         window.getComputedStyle(containerRef.current).gap ||
         '0'
      );
      gapRef.current = Number.isNaN(computedGap) ? 0 : computedGap;

      // reset track position after resize
      gsap.set(containerRef.current, { x: 0 });
      setActive(0);
      updateOpacity();
   }, [setActive, updateOpacity]);

   const startProgress = useCallback((targetIndex?: number): void => {
      if (!progressRefs.current.length) return;
      // reset all bars
      progressRefs.current.forEach((bar) => {
         if (bar) gsap.set(bar, { width: '0%' });
      });

      // kill previous tween
      if (progressTweenRef.current) {
         progressTweenRef.current.kill();
         progressTweenRef.current = null;
      }

      const idx = targetIndex ?? activeIndexRef.current;
      const activeBar = progressRefs.current[idx];
      if (!activeBar) return;

      progressTweenRef.current = gsap.fromTo(
         activeBar,
         { width: '0%' },
         {
            width: '100%',
            duration: 5,
            ease: 'linear',
            onComplete: () => {
               nextRef.current();
               startProgress();
            }
         }
      );
   }, []);

   const next = useCallback(() => {
      if (!containerRef.current || !boxWidthRef.current) return;

      const track = containerRef.current;
      const stepWidth = boxWidthRef.current + gapRef.current;
      const centerIndex = Math.floor(track.children.length / 2);
      const targetIndex = (centerIndex + 1) % track.children.length;
      const nextActive = (activeIndexRef.current + 1) % carouselData.length;

      setActive(nextActive);
      startProgress(nextActive);
      fadeToCenter(targetIndex);

      gsap.to(track, {
         x: `-=${stepWidth}`,
         duration: 1,
         ease: 'power2.inOut',
         onComplete: () => {
            // move first to end and reset position
            track.appendChild(track.children[0]);
            gsap.set(track, { x: 0 });
            updateOpacity();
         }
      });
   }, [fadeToCenter, setActive, startProgress, updateOpacity]);

  useEffect(() => {
      nextRef.current = next;
   }, [next]);

   const prev = useCallback(() => {
      if (!containerRef.current || !boxWidthRef.current) return;

      const track = containerRef.current;
      const stepWidth = boxWidthRef.current + gapRef.current;
      const centerIndex = Math.floor(track.children.length / 2);
      const targetIndex = (centerIndex - 1 + track.children.length) % track.children.length;
      const prevActive = (activeIndexRef.current - 1 + carouselData.length) % carouselData.length;

      setActive(prevActive);
      startProgress(prevActive);
      // move last to front then animate back to zero
      track.prepend(track.children[track.children.length - 1]);
      gsap.set(track, { x: -stepWidth });
      fadeToCenter(targetIndex);

      gsap.to(track, {
         x: 0,
         duration: 1,
         ease: 'power2.inOut',
         onComplete: () => {
            updateOpacity();
         }
      });
   }, [fadeToCenter, setActive, startProgress, updateOpacity]);

   useEffect(() => {
      measureBox();

      const rafId = requestAnimationFrame(measureBox);
      const timerId = setTimeout(measureBox, 300);
      const handleLoad = () => measureBox();
      window.addEventListener('load', handleLoad);

      window.addEventListener('resize', measureBox);

      startProgress();

    return () => {
         cancelAnimationFrame(rafId);
         clearTimeout(timerId);
         window.removeEventListener('load', handleLoad);
         window.removeEventListener('resize', measureBox);
         if (progressTweenRef.current) progressTweenRef.current.kill();
      };
   }, [measureBox, next, startProgress]);

   const toggleFaq = (index: number) => {
      if (activeFaq === index) {
         setActiveFaq(null);
         setActivePrevFaq(null);
      } else {
         setActiveFaq(index);
         setActivePrevFaq(index - 1);
      }
   };

   //// Progress Bar Animation
  useEffect(() => {
      const trigger = document.querySelector('.sticky-parent-container');
      const pinEl = document.querySelector('.progress-bar-sticky-block');

      if (!trigger || !pinEl) return;

      ScrollTrigger.create({
         trigger,
         start: 'top top',
         end: 'bottom bottom',

         onEnter: () => {
            (pinEl as HTMLElement).style.position = 'fixed';
            (pinEl as HTMLElement).style.bottom = '0';
            (pinEl as HTMLElement).style.left = '0';
            (pinEl as HTMLElement).style.width = '100%';
            (pinEl as HTMLElement).style.opacity = '1';
            (pinEl as HTMLElement).style.visibility = 'visible';
         },

         onLeave: () => {
            (pinEl as HTMLElement).style.position = 'absolute';
            (pinEl as HTMLElement).style.bottom = '0';
            (pinEl as HTMLElement).style.opacity = '0';
            (pinEl as HTMLElement).style.visibility = 'hidden';
         },

         onEnterBack: () => {
            (pinEl as HTMLElement).style.position = 'fixed';
            (pinEl as HTMLElement).style.bottom = '0';
            (pinEl as HTMLElement).style.opacity = '1';
            (pinEl as HTMLElement).style.visibility = 'visible';
         },

         onLeaveBack: () => {
            (pinEl as HTMLElement).style.opacity = '0';
            (pinEl as HTMLElement).style.visibility = 'hidden';
            (pinEl as HTMLElement).style.position = 'absolute';
            (pinEl as HTMLElement).style.bottom = '0';
         }
      });

      const progressBar1 = document.querySelector('.progress-bar-1');
      const progressBar2 = document.querySelector('.progress-bar-2');
      const progressBar3 = document.querySelector('.progress-bar-3');
      const singleProgressBlock1 = document.querySelector('.single-progress-block-1');
      const singleProgressBlock2 = document.querySelector('.single-progress-block-2');
      const singleProgressBlock3 = document.querySelector('.single-progress-block-3');

      if (!progressBar1 || !progressBar2 || !progressBar3 || !singleProgressBlock1 || !singleProgressBlock2 || !singleProgressBlock3) return;

      gsap.to(progressBar1, {
         width: '100%',
         scrollTrigger: {
            trigger: singleProgressBlock1,
            start: `top top`,
            end: `bottom bottom`,
            scrub: true,
         }
      });

      gsap.to(progressBar2, {
         width: '100%',
         scrollTrigger: {
            trigger: singleProgressBlock2,
            start: `top top`,
            end: `bottom bottom`,
            scrub: true,
         }
      });

      // Only run icon animations on tablet/desktop (icons hidden on mobile via CSS)
      const isMobileDevice = window.innerWidth < 768;
      
      if (!isMobileDevice) {
         const singleProgressBlock2TopLeftIcon = document.querySelector('.single-progress-block-2-top-left-icon');
         const singleProgressBlock2TopRightIcon = document.querySelector('.single-progress-block-2-top-right-icon');
         const singleProgressBlock2BottomLeftIcon = document.querySelector('.single-progress-block-2-bottom-left-icon');
         const singleProgressBlock2BottomRightIcon = document.querySelector('.single-progress-block-2-bottom-right-icon');

         const icons = [
            singleProgressBlock2TopLeftIcon,
            singleProgressBlock2TopRightIcon,
            singleProgressBlock2BottomLeftIcon,
            singleProgressBlock2BottomRightIcon,
         ];

         gsap.set(icons, { opacity: 0 });

         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: singleProgressBlock2,
               start: 'top top',
               end: 'bottom bottom',
               scrub: 0.5,
            }
         });

         tl.to(singleProgressBlock2TopLeftIcon, { opacity: 1, duration: 1 })
            .to(singleProgressBlock2TopRightIcon, { opacity: 1, duration: 1 })
            .to(singleProgressBlock2BottomLeftIcon, { opacity: 1, duration: 1 })
            .to(singleProgressBlock2BottomRightIcon, { opacity: 1, duration: 1 });
      }

      gsap.to(progressBar3, {
         width: '100%',
         scrollTrigger: {
            trigger: singleProgressBlock3,
            start: `top top`,
            end: `bottom bottom`,
            scrub: true,
         }
      });
   }, []);

   //// Hero Anim - TEMPORARILY DISABLED
   // useEffect(() => {
   //    gsap.set(".hero-cluster-svg", { autoAlpha: 0 });

   //    const tl = gsap.timeline({
   //       repeat: -1,
   //       defaults: { ease: "power2.inOut" }
   //    });

   //    // 1. grup
   //    tl.to([".hero-cluster-svg-1", ".hero-cluster-svg-2"], {
   //       autoAlpha: 1,
   //       duration: 1.5
   //    })
   //       .to({}, { duration: 2.5 }) // 3 saniye bekle
   //       .to([".hero-cluster-svg-1", ".hero-cluster-svg-2"], {
   //          autoAlpha: 0,
   //          duration: 1.5
   //       });

   //    // 2. grup
   //    tl.to([".hero-cluster-svg-3", ".hero-cluster-svg-4"], {
   //       autoAlpha: 1,
   //       duration: 1.5
   //    })
   //       .to({}, { duration: 2.5 })
   //       .to([".hero-cluster-svg-3", ".hero-cluster-svg-4"], {
   //          autoAlpha: 0,
   //          duration: 1.5
   //       });

   //    // 3. grup
   //    tl.to([".hero-cluster-svg-5", ".hero-cluster-svg-6"], {
   //       autoAlpha: 1,
   //       duration: 1.5
   //    })
   //       .to({}, { duration: 2.5 })
   //       .to([".hero-cluster-svg-5", ".hero-cluster-svg-6"], {
   //          autoAlpha: 0,
   //          duration: 1.5
   //       });
   // }, []);

   // Aurora Borealis-style animation - smooth, constant, visible
   useEffect(() => {
      // Start with visible base opacity
      gsap.set(".hero-tail-gradient-1", { autoAlpha: 0.15 });
      gsap.set(".hero-tail-gradient-2", { autoAlpha: 0.1 });
      gsap.set(".hero-tail-gradient-3", { autoAlpha: 0.1 });

      // Layer 1 - primary glow, most visible
      gsap.to(".hero-tail-gradient-1", {
         autoAlpha: 0.75,
         duration: 2,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
      });

      // Layer 2 - offset timing
      gsap.to(".hero-tail-gradient-2", {
         autoAlpha: 0.7,
         duration: 2.5,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
         delay: 0.7,
      });

      // Layer 3 - creates depth variation
      gsap.to(".hero-tail-gradient-3", {
         autoAlpha: 0.65,
         duration: 3,
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
         delay: 1.3,
      });
  }, []);

  return (
      <div className="min-h-screen bg-black">
         {/* Hero */}
         <div className='w-full h-screen min-h-[700px] md:min-h-[850px] lg:min-h-[900px] relative overflow-hidden'>
            {/* Cluster SVGs - TEMPORARILY DISABLED */}
            {/* <div className='hero-cluster-svg hero-cluster-svg-1 w-[280px] h-[320px] absolute top-[220px] md:top-[340px] -left-[237px] md:left-[48px] lg:left-[113px] z-2 opacity-0'>
               <Image
                  src={'/hero/cluster-1.svg'}
                  width={317}
                  height={360}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
          </div>
          
            <div className='hero-cluster-svg hero-cluster-svg-2 w-[180px] h-[250px] absolute top-[200px] -right-[150px] md:right-[28px] lg:right-[90px] z-2 opacity-0'>
               <Image
                  src={'/hero/cluster-2.svg'}
                  width={212}
                  height={296}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
          </div>
          
            <div className='hero-cluster-svg hero-cluster-svg-3 w-[130px] h-[160px] absolute top-[260px] md:top-[300px] -left-[60px] md:left-[28px] lg:left-[159px] z-2 opacity-0'>
               <Image
                  src={'/hero/cluster-3.svg'}
                  width={152}
                  height={187}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
            </div>

            <div className='hero-cluster-svg hero-cluster-svg-4 w-[420px] h-[400px] absolute top-[90px] md:top-[130px] -right-[380px] md:-right-[228px] lg:-right-[49px] z-2 opacity-0'>
               <Image
                  src={'/hero/cluster-4.svg'}
                  width={490}
                  height={476}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
            </div>

            <div className='hero-cluster-svg hero-cluster-svg-5 w-[220px] h-[185px] absolute top-[220px] md:top-[300px] -left-[120px] md:left-[28px] lg:left-[190px] z-2'>
               <Image
                  src={'/hero/cluster-5.svg'}
                  width={263}
                  height={221}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
            </div>

            <div className='hero-cluster-svg hero-cluster-svg-6 w-[200px] h-[135px] absolute top-[350px] md:top-[460px] -right-[120px] md:right-[49px] lg:right-[139px] z-2'>
               <Image
                  src={'/hero/cluster-6.svg'}
                  width={237}
                  height={160}
                  alt='Tail Gradient Left'
                  className='w-full h-full object-contain'
                  priority
                  draggable={false}
               />
            </div> */}

            {/* Stars Left */}
            <div className='w-[411px] md:w-[650px] 2xl:w-[850px] h-[500px] md:h-[650px] 2xl:h-[850px] absolute top-0 -left-[221px] md:-left-[322px] lg:left-0 z-3'>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-cover'
               />
            </div>

            {/* Stars Right */}
            <div className='w-[411px] md:w-[650px] 2xl:w-[850px] h-[500px] md:h-[650px] 2xl:h-[850px] absolute top-0 -right-[221px] md:-right-[322px] lg:right-0 z-3'>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-cover'
               />
            </div>

            {/* Circle Gradient Layer */}
            <div className='absolute top-0 left-0 w-full h-full z-1 pointer-events-none'>
               <div className='w-[1000px] md:w-[1400px] lg:w-[1700px] 2xl:w-[2100px] h-[700px] md:h-[900px] lg:h-[1100px] 2xl:h-[1400px] absolute -top-[89px] -left-[232px] md:-left-[290px] lg:-left-[104px] 2xl:left-[136px] rounded-full bg-[#0F0E38] filter-[blur(249px)] md:filter-[blur(348px)] lg:filter-[blur(432px)]'></div>
            </div>

            {/* Tail Gradient Layer 1 */}
            <div className='hero-tail-gradient hero-tail-gradient-1 w-full h-full absolute top-0 left-0 z-1 flex' style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)' }}>
               <Image
                  src='/backgrounds/glows/glows-png-1.webp'
                  width={1980}
                  height={1134}
                  alt='Tail Gradient Layer 1'
                  className='w-full h-full object-cover'
                  draggable={false}
               />
            </div>

            {/* Tail Gradient Layer 2 */}
            <div className='hero-tail-gradient hero-tail-gradient-2 w-full h-full absolute top-0 left-0 z-1 flex' style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)' }}>
               <Image
                  src='/backgrounds/glows/glows-png-2.webp'
                  width={1980}
                  height={1134}
                  alt='Tail Gradient Layer 2'
                  className='w-full h-full object-cover'
                  draggable={false}
               />
            </div>

            {/* Tail Gradient Layer 3 */}
            <div className='hero-tail-gradient hero-tail-gradient-3 w-full h-full absolute top-0 left-0 z-1 flex' style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 90%)' }}>
               <Image
                  src='/backgrounds/glows/glows-png-3.webp'
                  width={1980}
                  height={1134}
                  alt='Tail Gradient Layer 3'
                  className='w-full h-full object-cover'
                  draggable={false}
               />
            </div>

            {/* Hero Content */}
            <div className='w-full h-full flex flex-col items-center pt-[80px] md:pt-[100px] lg:pt-[120px] pb-[40px] md:pb-[60px] lg:pb-[60px] px-[12px] relative z-4'>
               {/* Content Wrapper - centers content while respecting padding */}
               <div className='w-full flex-1 flex flex-col items-center justify-center gap-[40px] md:gap-[24px] lg:gap-[8px]'>
               {/* Main Content */}
               <div className='w-full max-w-[587px] mx-auto flex flex-col items-center mt-[16px] md:mt-[24px] lg:mt-[32px]'>
                  {/* Hero Title */}
                  <h1 className='text-[44px] md:text-[68px] lg:text-[76px] leading-[50px] md:leading-[72px] lg:leading-[84px] -tracking-[2.28px] md:-tracking-[3.28px] lg:-tracking-[3.52px] text-center text-white font-hedvig font-normal mb-[16px] md:mb-[20px]'>Warm Paths,<br />Right Timing</h1>

                  {/* Desc */}
                  <span className='flex max-w-[300px] md:max-w-[480px] mx-auto text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] lg:leading-[28px] -tracking-[0.15px] md:-tracking-[0.2px] text-center text-white font-normal opacity-[.8]'>Unify your team's Telegram and X networks—revealing warm paths, buying signals, and more deals</span>

                  {/* Get Started Button */}
                  <div
                     className='w-[170px] md:w-[210px] h-[48px] md:h-[58px] rounded-[28px] flex items-center justify-center mt-[10px] md:mt-[16px] group border-[3px] border-[#8d8d8d] hover:border-black bg-white hover:bg-black transition-all duration-300'
                  >
                     <Link href={'/pricing'} className='flex items-center justify-center w-full h-full'>
                        <span className='text-[18px] md:text-[20px] leading-normal -tracking-[0.6px] md:-tracking-[0.72px] font-semibold text-black group-hover:text-white transition-all duration-300'>Get Started</span>
                     </Link>
            </div>
        </div>
        
               {/* Image Wrapper */}
               <div className='max-w-[260px] md:max-w-[440px] 2xl:max-w-[500px] w-full h-auto flex flex-col items-center gap-[18px] md:gap-0 lg:gap-[16px] relative -mt-[16px] md:-mt-[20px] lg:-mt-[24px]'>
                  {/* Lottie Animation - positioned behind owl, spanning full width */}
                  <HeroOwlLottie />
                  {/* Owl Image */}
                  <div className='w-full h-[230px] md:h-[360px] lg:h-[380px] 2xl:h-[500px] flex justify-center z-10'>
                     <Image
                        src={'/hero/owl-hero.webp'}
                        width={1042}
                        height={950}
                        alt='Owl'
                        className='w-full h-full object-contain'
                        priority
                        draggable={false}
                        unoptimized
                     />
              </div>

                  {/* Backed by Alliance */}
                  <div className='w-full flex items-center justify-center gap-[8px] md:gap-[11px] lg:gap-[14px]'>
                     <span className='text-[15px] md:text-[20px] lg:text-[24px] leading-[22px] md:leading-[150%] -tracking-[0.15px] md:-tracking-[0.2px] text-white font-medium'>Backed by Alliance</span>
                     <Image
                        src={'/hero/alliance-logo.svg'}
                        width={24}
                        height={24}
                        alt='Alliance'
                        className='w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] object-contain'
                        draggable={false}
                     />
          </div>
               </div>
               </div>
            </div>
            
            {/* Bottom Gradient Fade to #090821 */}
            <div className='absolute bottom-0 left-0 w-full h-[280px] md:h-[420px] lg:h-[550px] pointer-events-none z-[2]' style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(9,8,33,0.15) 20%, rgba(9,8,33,0.4) 45%, rgba(9,8,33,0.7) 65%, rgba(9,8,33,0.9) 80%, #090821 100%)' }}></div>
         </div>

         {/* Find the Strongest Path to Any Deal */}
         <div id="features" className='w-full h-auto flex relative z-1 -mt-[1px]' style={{ backgroundColor: '#090821' }}>
            {/* Top Gradient Fade - fades from #090821 for smooth transition */}
            <div className='absolute top-0 left-0 w-full h-[150px] md:h-[200px] lg:h-[250px] -translate-y-[20px] pointer-events-none z-[3]' style={{ background: 'linear-gradient(to bottom, #090821 0%, #090821 30%, rgba(9, 8, 33, 0.7) 60%, transparent 100%)' }}></div>
            <div className='w-full max-w-full mx-auto flex flex-col bg-black'>
               {/* Find the Strongest Path to Any Deal Block */}
               <div className='single-progress-block-1 w-full h-[167vh] relative'>
                  <div className='w-full h-screen flex flex-col items-center justify-center pt-[20px] md:pt-[28px] lg:pt-[44px] pb-[180px] md:pb-[280px] lg:pb-[320px] px-[22px] md:px-[66px] sticky top-0 left-0 overflow-hidden'>
                     {/* Content Block */}
                     <div className='w-full max-w-[800px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px]'>
                        <h2 className='flex max-md:max-w-[320px] text-[28px] md:text-[38px] lg:text-[44px] leading-[32px] md:leading-[48px] lg:leading-[64px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal'>Find the Strongest Path to Any Deal</h2>

                        <span className='flex w-full max-w-[280px] md:max-w-[520px] lg:max-w-[751px] text-[15px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[26px] lg:leading-[28px] -tracking-[0.22px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>LockIn maps your team's network across Telegram and X into a living relationship graph. Instantly figure out your best path to any account.</span>
              </div>

                     {/* Founder & CEO Block */}
                     {/* Back Layer */}
                     <div className='absolute bottom-[12px] md:bottom-[17px] lg:bottom-[21px] left-1/2 -translate-x-1/2
                  w-[355px] md:w-[520px] lg:w-[600px] h-[235px] md:h-[310px] lg:h-[360px]
                  drop-shadow-[0_6.719px_54.712pxrgba(255,255,255,0.11)] md:drop-shadow-[0_12.047px_98.093px_rgba(255,255,255,0.11)] lg:drop-shadow-[0_14px_114px_rgba(255,255,255,0.11)]
                  '>
                        {/* Back Layer Left */}
                        <div className='w-[335px] md:w-[480px] lg:w-[550px] h-full flex absolute left-0 top-0 bg-black border border-[#272727] rounded-[16px] md:rounded-[24px] lg:rounded-[28px] opacity-[.7]'></div>

                        {/* Back Layer Right */}
                        <div className='w-[335px] md:w-[480px] lg:w-[550px] h-full flex absolute right-0 top-0 bg-black border border-[#272727] rounded-[16px] md:rounded-[24px] lg:rounded-[28px] opacity-[.7]'></div>
            </div>

                     {/* Main Layer */}
                     <div className='w-[335px] md:w-[480px] lg:w-[550px] h-[235px] md:h-[310px] lg:h-[360px] px-[16px] md:px-[24px] lg:px-[20px] pt-[14px] md:pt-[20px] lg:pt-[24px] flex items-start absolute left-1/2 -translate-x-1/2 bottom-[17px] md:bottom-[23px] lg:bottom-[29px] bg-black border border-[#272727] rounded-[16px] md:rounded-[24px] lg:rounded-[28px]'>
                        <Image
                           src={'/features/find-the-strongest-path/find-the-strongest-path.webp'}
                           width={2371}
                           height={1128}
                           alt='Founder & CEO'
                           className='w-full h-auto'
                           quality={100}
                           draggable={false}
                        />
          </div>

                     {/* Line Wrapper - removed, replaced with gradient fade */}
                     
                     {/* Gradient fade to hide card bottoms cleanly */}
                     <div className='w-full h-[80px] md:h-[110px] lg:h-[140px] absolute bottom-0 left-0 z-[10] pointer-events-none' style={{ background: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)' }}></div>
            </div>
          </div>

               {/* Know the Right Moment to Reach Out */}
               <div className='single-progress-block-2 w-full h-[167vh] relative'>
                  <div className='w-full h-screen flex flex-col items-center justify-center pt-[20px] md:pt-[28px] lg:pt-[44px] px-[16px] md:px-[46px] pb-[80px] md:pb-[120px] lg:pb-[150px] sticky top-0 left-0 overflow-hidden'>
                     {/* Top Left Icon */}
                     <div className='single-progress-block-2-top-left-icon w-[130px] md:w-[130px] h-[100px] md:h-[140px] absolute -top-[25px] -left-[40px] md:left-[23px] hidden md:flex items-center justify-center z-2 rounded-full border-2 border-[#272727] bg-[#0E0E0E] opacity-[.34] md:blur-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
                           <path d="M38.3658 88.585C35.3195 88.585 35.8663 87.4134 34.7728 84.5233L25.8682 55.1537L81.1704 20.6289L87.6536 22.3473L82.2639 37.0321L38.3658 88.585Z" fill="#DEDEDE" />
                           <path d="M38.3662 88.5919C40.7097 88.5919 41.7252 87.4983 43.0532 86.2484C45.0842 84.2955 71.175 58.9078 71.175 58.9078L55.1612 55.002L40.3191 64.3759L38.3662 87.8108V88.5919Z" fill="#D0D0D0" />
                           <path d="M39.9319 64.6831L77.7402 92.5706C82.0365 94.9141 85.1612 93.7423 86.2548 88.5866L101.644 16.0948C103.206 9.76738 99.2221 6.9552 95.082 8.82999L4.77962 43.6698C-1.39156 46.1695 -1.31344 49.6067 3.68599 51.0909L26.8865 58.3557L80.5523 24.5314C83.0521 22.969 85.3955 23.8283 83.5208 25.5469L39.9319 64.6831Z" fill="url(#paint0_linear_122_1771)" />
                           <defs>
                              <linearGradient id="paint0_linear_122_1771" x1="62.5786" y1="48.556" x2="82.1076" y2="79.8025" gradientUnits="userSpaceOnUse">
                                 <stop stopColor="#EDEDED" />
                                 <stop offset="1" stopColor="white" />
                              </linearGradient>
                           </defs>
                        </svg>
        </div>

                     {/* Top Right Icon */}
                     <div className='single-progress-block-2-top-right-icon w-[108px] md:w-[138px] h-[108px] md:h-[138px] absolute -top-[13px] -right-[40px] hidden md:flex items-center justify-center z-2 rounded-full border-2 border-[#272727] bg-[#0E0E0E] opacity-[.7] md:[filter:drop-shadow(0_6.664px_289.864px_rgba(255,255,255,0.11))_blur(2.97px)]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="57" viewBox="0 0 58 57" fill="none">
                           <path d="M36.0722 23.6109L58.0903 0H52.4686L33.5424 20.2379L18.7388 0H0L23.0487 31.4812L0 56.2164H5.62164L25.5784 34.8541L41.2253 56.2164H59.9641L36.0722 23.6109ZM8.33876 3.74776H15.8343L51.5317 52.4686H44.0362L8.33876 3.74776Z" fill="white" />
                        </svg>
            </div>

                     {/* Bottom Left Icon */}
                     <div className='single-progress-block-2-bottom-left-icon w-[173px] md:w-[223px] h-[173px] md:h-[223px] absolute bottom-[70px] md:bottom-[30px] lg:bottom-[38px] -left-[70px] md:-left-[34px] hidden md:flex items-center justify-center z-2 rounded-full overflow-hidden border-2 border-[#272727] bg-[#0E0E0E] opacity-[.2] md:blur-[10px]' style={{ boxShadow: '0 8.751px 380.665px 0 rgba(255, 255, 255, 0.11)' }}>
                        <Image
                           src={'/features/find-the-strongest-path/bottom-left-image.jpg'}
                           width={400}
                           height={400}
                           alt='Bottom Left Icon'
                           className='w-full h-auto'
                           draggable={false}
                        />
            </div>

                     {/* Bottom Right Icon */}
                     <div className='single-progress-block-2-bottom-right-icon w-[102px] h-[102px] absolute bottom-[60px] md:bottom-[50px] lg:bottom-[60px] -right-[26px] md:right-[66px] hidden md:flex items-center justify-center z-2 rounded-full border-2 border-[#272727] bg-[#0E0E0E] opacity-[.6] md:[filter:drop-shadow(0_6.664px_289.864px_rgba(255,255,255,0.11))_blur(2.97px)]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="42" viewBox="0 0 54 42" fill="none">
                           <path d="M45.2333 3.46183C41.7768 1.84459 38.0809 0.66925 34.2169 0C33.7423 0.857955 33.1879 2.01192 32.8057 2.9299C28.6982 2.31218 24.6284 2.31218 20.5965 2.9299C20.2143 2.01192 19.6473 0.857955 19.1685 0C15.3004 0.66925 11.6002 1.84891 8.14365 3.47039C1.17174 14.0059 -0.71823 24.2797 0.226757 34.4076C4.85089 37.8607 9.33224 39.9585 13.738 41.3311C14.8258 39.834 15.7959 38.2425 16.6317 36.5653C15.0399 35.9605 13.5154 35.2141 12.0748 34.3475C12.457 34.0644 12.8308 33.7684 13.192 33.4638C21.9782 37.5734 31.5247 37.5734 40.206 33.4638C40.5714 33.7684 40.9452 34.0644 41.3232 34.3475C39.8784 35.2183 38.3496 35.9647 36.7579 36.5696C37.5937 38.2425 38.5596 39.8383 39.6516 41.3354C44.0616 39.9627 48.5471 37.8651 53.1712 34.4076C54.28 22.6667 51.2771 12.4873 45.2333 3.46183ZM17.8287 28.179C15.1912 28.179 13.0282 25.7167 13.0282 22.7182C13.0282 19.7197 15.145 17.2532 17.8287 17.2532C20.5125 17.2532 22.6754 19.7154 22.6293 22.7182C22.6334 25.7167 20.5125 28.179 17.8287 28.179ZM35.5693 28.179C32.9317 28.179 30.7687 25.7167 30.7687 22.7182C30.7687 19.7197 32.8855 17.2532 35.5693 17.2532C38.253 17.2532 40.416 19.7154 40.3698 22.7182C40.3698 25.7167 38.253 28.179 35.5693 28.179Z" fill="white" />
                        </svg>
                     </div>

                     {/* Content Block */}
                     <div className='w-full max-w-[680px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[20px] md:mb-[30px] lg:mb-[34px]'>
                        <h2 className='flex max-md:max-w-[340px] text-[28px] md:text-[38px] lg:text-[44px] leading-[32px] md:leading-[48px] lg:leading-[48px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal lg:whitespace-nowrap'>Know the Right Moment to Reach Out</h2>

                        <span className='flex w-full max-md:max-w-[311px] md:max-w-[751px] text-[15px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[26px] lg:leading-[28px] -tracking-[0.225px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>Define detailed, granular rules for how signals are detected and delivered, ensuring you're alerted only to the interactions that actually move deals forward.</span>
                     </div>

                     {/* Notify Me Block */}
                     <div className='w-[325px] md:w-[637px] lg:w-[741px] h-[62px] md:h-[121px] lg:h-[141px] relative'>
                        {/* Little Block */}
                        <div className='w-[254px] md:w-[497px] lg:w-[579px] h-[38px] md:h-[75px] lg:h-[87px] absolute left-1/2 -translate-x-1/2 bottom-0 border border-[#272727] bg-black opacity-[.1] rounded-[368px] md:rounded-[754px] lg:rounded-[878px]'></div>

                        {/* Middle Block */}
                        <div className='w-[282px] md:w-[552px] lg:w-[642px] h-[42px] md:h-[83px] lg:h-[96px] absolute left-1/2 -translate-x-1/2 bottom-[8px] md:bottom-[17px] lg:bottom-[19px] border border-[#272727] bg-black opacity-[.5] rounded-[368px] md:rounded-[754px] lg:rounded-[878px]'></div>

                        {/* Top Block */}
                        <div className='w-full h-[48px] md:h-[93px] lg:h-[108px] px-[12px] md:px-[20px] lg:px-[24px] absolute left-1/2 -translate-x-1/2 top-0 border border-[#272727] bg-[#060606] rounded-[38px] md:rounded-[75px] lg:rounded-[88px] z-1 md:shadow-[0_10.55px_85.911px_0_rgba(255,255,255,0.11)] lg:shadow-[0_12.277px_99.969px_0_rgba(255,255,255,0.11)] flex items-center justify-center gap-[8px] md:gap-[18px] lg:gap-[21px]'>
                           <svg className='w-[10px] md:w-[20px] lg:w-[23px] h-auto' xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                              <path d="M10.5032 16.8469C10.4015 16.4524 10.1958 16.0924 9.90774 15.8043C9.61964 15.5162 9.25961 15.3106 8.8651 15.2088L1.87138 13.4054C1.75206 13.3715 1.64705 13.2996 1.57227 13.2007C1.49749 13.1017 1.45703 12.9811 1.45703 12.857C1.45703 12.733 1.49749 12.6123 1.57227 12.5134C1.64705 12.4144 1.75206 12.3426 1.87138 12.3087L8.8651 10.5041C9.25947 10.4025 9.61941 10.197 9.90749 9.90911C10.1956 9.62123 10.4013 9.26143 10.5032 8.86713L12.3067 1.87341C12.3402 1.75361 12.412 1.64808 12.5111 1.5729C12.6102 1.49772 12.7312 1.45703 12.8556 1.45703C12.98 1.45703 13.1009 1.49772 13.2 1.5729C13.2991 1.64808 13.3709 1.75361 13.4045 1.87341L15.2068 8.86713C15.3085 9.26164 15.5142 9.62167 15.8023 9.90977C16.0903 10.1979 16.4504 10.4035 16.8449 10.5053L23.8386 12.3076C23.9589 12.3407 24.0649 12.4125 24.1405 12.5117C24.2161 12.611 24.257 12.7323 24.257 12.857C24.257 12.9818 24.2161 13.1031 24.1405 13.2024C24.0649 13.3016 23.9589 13.3733 23.8386 13.4065L16.8449 15.2088C16.4504 15.3106 16.0903 15.5162 15.8023 15.8043C15.5142 16.0924 15.3085 16.4524 15.2068 16.8469L13.4033 23.8407C13.3698 23.9604 13.298 24.066 13.1989 24.1412C13.0998 24.2163 12.9788 24.257 12.8544 24.257C12.73 24.257 12.6091 24.2163 12.5099 24.1412C12.4108 24.066 12.3391 23.9604 12.3055 23.8407L10.5032 16.8469Z" fill="white" stroke="white" strokeWidth="2.91542" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>

                           {/* Content */}
                           <div className='flex flex-col items-start gap-[8px] md:gap-[16px] lg:gap-[18px]'>
                              <h5 className='whitespace-nowrap text-[9px] md:text-[18px] lg:text-[21px] leading-[11px] md:leading-[21px] lg:leading-[24.4px] -tracking-[0.18px] md:-tracking-[0.36px] lg:-tracking-[0.419px] text-white font-medium inline-block'>
                                 When <p className='inline-block text-[#7796F1] relative'>anyone
                                    <Image
                                       src={'/features/find-the-strongest-path/text-line-1.svg'}
                                       width={71}
                                       height={1.7}
                                       alt='Text Line 1'
                                       className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                                       draggable={false}
                                    />
                                 </p> <p className='inline-block text-[#CC77F1] relative'>in my ICP
                                    <Image
                                       src={'/features/find-the-strongest-path/text-line-2.svg'}
                                       width={87}
                                       height={1.7}
                                       alt='Text Line 1'
                                       className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                                       draggable={false}
                                    />
                                 </p> is <p className='inline-block text-[#77F1D9] relative'>active
                                    <Image
                                       src={'/features/find-the-strongest-path/text-line-3.svg'}
                                       width={56}
                                       height={1.7}
                                       alt='Text Line 1'
                                       className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                                       draggable={false}
                                    />
                                 </p> in <p className='inline-block text-[#F1C477] relative'>any of my groups
                                    <Image
                                       src={'/features/find-the-strongest-path/text-line-4.svg'}
                                       width={165}
                                       height={1.7}
                                       alt='Text Line 1'
                                       className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                                       draggable={false}
                                    />
                                 </p> on <p className='inline-block text-[#F177BE] relative'>Telegram
                                    <Image
                                       src={'/features/find-the-strongest-path/text-line-5.svg'}
                                       width={88}
                                       height={1.7}
                                       alt='Text Line 1'
                                       className='absolute -bottom-[1.5px] md:-bottom-[3px] left-0 w-full h-auto'
                                       draggable={false}
                                    />
                                 </p>

                              </h5>

                              {/* Notify me on telegram */}
                              <div className='flex items-center gap-[3px] md:gap-[6px] lg:gap-[7px]'>
                                 {/* Single signal Alert */}
                                 <div className='w-[100px] md:w-[194px] lg:w-[227px] h-[14px] md:h-[27px] lg:h-[32px] flex items-center justify-center gap-[3px] md:gap-[6px] lg:gap-[7px] bg-[rgba(255,255,255,0.10)] rounded-[38px] md:rounded-[75px] lg:rounded-[88px]'>
                                    <svg className='w-[6px] md:w-[12px] lg:w-[14px] h-auto' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                       <g opacity="0.8">
                                          <path fillRule="evenodd" clipRule="evenodd" d="M5.56348 10.5156V10.8151C5.56348 11.2012 5.71694 11.5715 5.99009 11.8444C6.26323 12.1173 6.63365 12.2705 7.01978 12.2702C7.40596 12.2704 7.77637 12.1171 8.0495 11.844C8.32262 11.571 8.47607 11.2007 8.47607 10.8145V10.5156" fill="white" />
                                          <path d="M5.56348 10.5156V10.8151C5.56348 11.2012 5.71694 11.5715 5.99009 11.8444C6.26323 12.1173 6.63365 12.2705 7.01978 12.2702V12.2702C7.40596 12.2704 7.77637 12.1171 8.0495 11.844C8.32262 11.571 8.47607 11.2007 8.47607 10.8145V10.5156" stroke="white" strokeWidth="0.876923" strokeLinecap="round" strokeLinejoin="round" />
                                          <path fillRule="evenodd" clipRule="evenodd" d="M10.493 10.5151C11.1561 10.5151 11.6937 9.97749 11.6937 9.31436C11.6934 8.97749 11.5597 8.65446 11.3217 8.41601L10.524 7.61885V5.25134C10.524 3.31329 8.95286 1.74219 7.01481 1.74219C5.07676 1.74219 3.50566 3.31329 3.50566 5.25134V7.61885L2.70791 8.41601C2.46996 8.65446 2.33621 8.97749 2.33594 9.31436C2.33594 9.63281 2.46244 9.93821 2.68762 10.1634C2.9128 10.3886 3.2182 10.5151 3.53665 10.5151H10.493Z" fill="white" stroke="white" strokeWidth="0.876923" strokeLinecap="round" strokeLinejoin="round" />
                                       </g>
                                    </svg>

                                    <span className='text-[7.5px] md:text-[15px] lg:text-[17px] leading-[9px] md:leading-[18px] lg:leading-[21px] -tracking-[0.15px] md:-tracking-[0.3px] lg:-tracking-[0.349px] text-white font-normal'>Notify me on Telegram</span>
                                 </div>

                                 {/* Single signal Alert */}
                                 <div className='w-[66px] md:w-[128px] lg:w-[150px] h-[14px] md:h-[27px] lg:h-[32px] flex items-center justify-center gap-[3px] md:gap-[6px] lg:gap-[7px] bg-[rgba(255,255,255,0.10)] rounded-[38px] md:rounded-[75px] lg:rounded-[88px]'>
                                    <svg className='w-[6px] md:w-[12px] lg:w-[14px] h-auto' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                       <g opacity="0.8">
                                          <path d="M7.03027 1.02148C10.1795 1.02148 12.7324 3.57443 12.7324 6.72363C12.7324 9.87287 10.1795 12.4258 7.03027 12.4258C3.88107 12.4257 1.32812 9.87285 1.32812 6.72363C1.32816 3.57445 3.88109 1.02152 7.03027 1.02148ZM6.67578 3.35742C6.43383 3.35766 6.2373 3.55389 6.2373 3.7959V7.07227C6.2373 7.31428 6.43383 7.51051 6.67578 7.51074L6.67676 7.50977L6.67773 7.51074H9.39746C9.63956 7.51067 9.83594 7.31438 9.83594 7.07227C9.8357 6.83036 9.63941 6.63386 9.39746 6.63379H7.11426V3.7959C7.11426 3.55374 6.91794 3.35742 6.67578 3.35742Z" fill="white" />
                                       </g>
                                    </svg>

                                    <span className='text-[7.5px] md:text-[15px] lg:text-[17px] leading-[9px] md:leading-[18px] lg:leading-[21px] -tracking-[0.15px] md:-tracking-[0.3px] lg:-tracking-[0.349px] text-white font-normal'>Once a week</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Lottie Animation Card */}
                     <div className='w-[360px] md:w-[520px] lg:w-[610px] h-[192px] md:h-[277px] lg:h-[325px] absolute bottom-[50px] md:bottom-[50px] lg:bottom-[30px] left-1/2 -translate-x-1/2 z-[2] pointer-events-none'>
                        <DotLottieReact
                           src="/Graphic Animation V2.lottie"
                           loop={!isMobile}
                           autoplay={!isMobile}
                           style={{ width: '100%', height: '100%' }}
                        />
                     </div>
              
                     {/* Line Wrapper - removed, replaced with gradient fade */}
                     
                     {/* Gradient fade to hide card bottoms cleanly */}
                     <div className='w-full h-[100px] md:h-[140px] lg:h-[170px] absolute bottom-0 left-0 z-[10] pointer-events-none' style={{ background: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)' }}></div>

                     {/* Bottom Gradient */}
                     <div className='absolute left-0 md:-bottom-[194px] lg:-bottom-[133px] w-full hidden md:flex h-[229px] z-0' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 37.57%)' }}></div>
              </div>
            </div>

               {/* Expand Beyond Your Own Network */}
               <div className='single-progress-block-3 w-full h-[167vh] relative'>
                  <div className='w-full h-screen flex flex-col items-center justify-center pt-[24px] md:pt-[30px] lg:pt-[44px] px-[16px] md:px-[46px] pb-[150px] md:pb-[280px] lg:pb-[300px] sticky top-0 left-0 overflow-hidden bg-black'>
                     {/* Content Block */}
                     <div className='w-full max-w-[680px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[20px] md:mb-[30px] lg:mb-[34px]'>
                        <h2 className='flex max-md:max-w-[260px] text-[28px] md:text-[38px] lg:text-[44px] leading-[32px] md:leading-[48px] lg:leading-[64px] -tracking-[0.48px] md:-tracking-[0.72px] lg:-tracking-[0.88px] text-center text-white font-hedvig font-normal lg:whitespace-nowrap'>Expand Beyond Your Own Network</h2>

                        <span className='flex w-full max-w-[751px] text-[15px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[26px] lg:leading-[28px] -tracking-[0.22px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.7]'>Our shared intelligence graph spans 20k+ web3 organizations, 2m+ social profiles, and hundreds of Telegram hubs. Build new connections and opportunities across the broader ecosystem.</span>
          </div>

                     {/* Globe image block */}
                     <div className='w-full min-w-[620px] md:min-w-[875px] lg:min-w-[1016px] max-w-[1016px] h-auto absolute left-1/2 -translate-x-1/2 bottom-[25px] md:bottom-[34px] lg:bottom-[42px] flex'>
                        <Image
                           src={'/features/expand-beyond/globe-expand-beyond.webp'}
                           width={4440}
                           height={1676}
                           alt='Globe'
                           className='w-full h-auto'
                           draggable={false}
                           quality={100}
                        />
        </div>

                     {/* Bottom Gradient */}
                     <div className='absolute left-0 md:-bottom-[143px] lg:-bottom-[83px] w-full hidden md:flex h-[229px] z-0' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 37.57%)' }}></div>
                     
                     {/* Bottom Gradient Fade to #090821 */}
                     <div className='absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] lg:h-[200px] pointer-events-none z-[1]' style={{ background: 'linear-gradient(to bottom, transparent 0%, #090821 100%)' }}></div>
                  </div>
               </div>
            </div>

            {/* Progress Bar Wrapper */}
            <div className='sticky-parent-container absolute top-0 left-0 w-full h-full z-1 overflow-hidden pointer-events-none'>
               <div className='progress-bar-sticky-block fixed top-0 left-0 w-full h-dvh flex items-end opacity-0 invisible'>
                  <div className='w-full h-[120px] flex items-end justify-center pb-[24px] gap-[8px]' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)' }}>
                     <div className='flex flex-col items-center gap-[10px]'>
                        <span className='text-[13px] md:text-[16px] leading-[20px] -tracking-[0.32px] text-white font-medium'>Strongest Path</span>

                        <div className='w-[100px] md:w-[161px] h-[4px] rounded-[100px] bg-[rgba(255,255,255,0.20)] overflow-hidden'>
                           <div className='progress-bar-1 w-0 h-full bg-white'></div>
                        </div>
                     </div>

                     <div className='flex flex-col items-center gap-[10px]'>
                        <span className='text-[13px] md:text-[16px] leading-[20px] -tracking-[0.32px] text-white font-medium'>Reach Out</span>

                        <div className='w-[100px] md:w-[161px] h-[4px] rounded-[100px] bg-[rgba(255,255,255,0.20)] overflow-hidden'>
                           <div className='progress-bar-2 w-0 h-full bg-white'></div>
                        </div>
                     </div>

                     <div className='flex flex-col items-center gap-[10px]'>
                        <span className='text-[13px] md:text-[16px] leading-[20px] -tracking-[0.32px] text-white font-medium'>Own Network</span>

                        <div className='w-[100px] md:w-[161px] h-[4px] rounded-[100px] bg-[rgba(255,255,255,0.20)] overflow-hidden'>
                           <div className='progress-bar-3 w-0 h-full bg-white'></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Your Messages Are None Of Our Business */}
         <div className='w-full h-auto px-[12px] md:px-[36px] pt-[100px] md:pt-[140px] lg:pt-[180px] pb-[50px] md:pb-[60px] lg:pb-[70px] bg-black overflow-x-clip relative'>
            {/* Top Gradient Fade - fades from #090821 (own network section) for smooth transition */}
            <div className='absolute top-0 left-0 w-full h-[150px] md:h-[200px] lg:h-[250px] pointer-events-none z-[3]' style={{ background: 'linear-gradient(to bottom, #090821 0%, #090821 20%, rgba(9, 8, 33, 0.5) 50%, transparent 100%)' }}></div>
            
            {/* Circle Gradient - moved higher for better blending */}
            <div className='absolute left-1/2 -translate-x-1/2 -top-[100px] md:-top-[50px] lg:-top-[280px] w-[814px] md:w-[1222px] lg:w-[1443px] 2xl:w-[1800px] h-[662px] md:h-[994px] lg:h-[1174px] 2xl:h-[1500px] rounded-[169px] lg:rounded-[200px] bg-[#0F0E38] blur-[137px] lg:blur-[162px]'></div>

            {/* Stars Left */}
            <div className='w-[411px] md:w-[728px] 2xl:w-[950px] h-[778px] md:h-[1380px] 2xl:h-[1800px] absolute top-1/2 -left-[221px] md:-left-[322px] lg:left-0 -translate-y-1/2' style={{ maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 85%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 85%)' }}>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-contain'
               />
            </div>

            {/* Stars Right */}
            <div className='w-[411px] md:w-[728px] 2xl:w-[950px] h-[778px] md:h-[1380px] 2xl:h-[1800px] absolute top-1/2 -right-[221px] md:-right-[322px] lg:right-0 -translate-y-1/2' style={{ maskImage: 'linear-gradient(to left, black 0%, black 40%, transparent 85%)', WebkitMaskImage: 'linear-gradient(to left, black 0%, black 40%, transparent 85%)' }}>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-contain'
               />
            </div>

            {/* Content Block */}
            <div className='w-full max-w-[800px] mx-auto flex flex-col items-center relative z-[5] mb-[40px] lg:mb-[80px]'>
               <h2 className='text-[40px] md:text-[64px] lg:text-[72px] leading-[46px] md:leading-[70px] lg:leading-[80px] -tracking-[2.28px] md:-tracking-[3.28px] lg:-tracking-[3.52px] text-center text-white font-hedvig font-normal mb-[16px] md:mb-[20px]'>Your Messages Are None Of Our Business</h2>

               <span className='flex max-w-[300px] md:max-w-[580px] mx-auto text-[14px] md:text-[17px] leading-[20px] md:leading-[26px] lg:leading-[28px] -tracking-[0.15px] md:-tracking-[0.2px] text-center text-white font-normal opacity-[.8]'>Built on advanced TEE infrastructure—meaning your alpha, deal flow, and private group chats stay exactly that. Private.</span>
            </div>

            {/* Cards Block */}
            <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start justify-center gap-[24px] lg:gap-[20px] relative z-[5]'>
               {/* Single Cards 1 */}
               <div className='w-full h-auto px-[12px] md:px-[20px] flex flex-col items-center'>
                  {/* Icon Wrapper */}
                  <div className='w-[120px] h-[60px] flex items-center justify-center'>
                     <Image
                        src={'/security/trusted-execution-environment-icon.svg'}
                        width={110}
                        height={55}
                        alt='Trusted Execution Environment Icon'
                        draggable={false}
                     />
                  </div>

                  {/* Content Block */}
                  <div className='w-full flex flex-col items-center gap-[12px] mt-[16px]'>
                     <h5 className='max-md:max-w-[260px] w-full text-[18px] md:text-[21px] leading-[26px] md:leading-[36px] -tracking-[0.2px] md:-tracking-[0.24px] text-center text-white font-hedvig'>Trusted Execution Environment</h5>

                     <span className='w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[26px] -tracking-[0.25px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.8]'>All your messages and keys are encrypted inside of a Trusted Execution Environment so sensitive data stays completely private.</span>
                  </div>
               </div>

               {/* Single Cards 2 */}
               <div className='w-full h-auto px-[12px] md:px-[20px] flex flex-col items-center'>
                  {/* Icon Wrapper */}
                  <div className='w-[120px] h-[60px] flex items-center justify-center'>
                     <Image
                        src={'/security/secured-with-seal.svg'}
                        width={95}
                        height={44}
                        alt='Trusted Execution Environment Icon'
                        draggable={false}
                     />
                  </div>

                  {/* Content Block */}
                  <div className='w-full flex flex-col items-center gap-[12px] mt-[16px]'>
                     <h5 className='max-md:max-w-[260px] w-full text-[18px] md:text-[21px] leading-[26px] md:leading-[36px] -tracking-[0.2px] md:-tracking-[0.24px] text-center text-white font-hedvig'>Secured with Seal</h5>

                     <span className='w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[26px] -tracking-[0.25px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.8]'>Key access to unlock is secured with Seal. All proofs and code are posted to the blockchain so anyone can verify exactly what we're doing.</span>
                  </div>
               </div>
            </div>
         </div>

      {/* Case Study */}
         <div className='w-full h-auto px-[16px] relative'>
            <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] mx-auto p-[8px] md:p-[14px] lg:p-[20px] pb-[16px] md:pb-[20px] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] bg-black border border-[rgba(255,255,255,0.10)]'>
               <div className='w-full h-full flex max-lg:flex-col gap-[16px] md:gap-[24px] lg:gap-[28px]'>
                  {/* Image Block */}
                  <div className='w-full max-w-full lg:min-w-[450px] lg:max-w-[450px] h-auto rounded-[12px] md:rounded-[22px] lg:rounded-[18px] overflow-hidden'>
                     <Image
                        src={'/testimonials/case-study.webp'}
                        width={1310}
                        height={804}
                        alt='Case Study'
                        draggable={false}
                        className='w-full h-auto object-cover'
                     />
                  </div>

                  {/* Content Block */}
                  <div className='w-full flex items-stretch flex-col justify-between gap-[24px] max-md:pl-[14px]'>
                     <div className='w-full flex flex-col gap-[6px] md:gap-[10px]'>
                        <span className='text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.15px] md:-tracking-[0.2px] text-white font-semibold opacity-[.4]'>Case Study</span>

                        <h5 className='max-md:max-w-[260px] w-full text-[18px] md:text-[21px] leading-[26px] md:leading-[30px] -tracking-[0.2px] md:-tracking-[0.24px] text-white font-hedvig'>How LockIn Improved Nautilus's TEE Architecture</h5>

                        <span className='w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[26px] -tracking-[0.25px] md:-tracking-[0.3px] text-white font-normal opacity-[.8]'>How LockIn improved Nautilus's TEE architecture to operate private and secure AI inference on Telegram data.</span>
            </div>

                     {/* Link */}
                     <div className='w-full flex'>
                        <Link href='/' target='_blank' className='flex items-center gap-[8px] group'>
                           <h5 className='text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] -tracking-[0.15px] md:-tracking-[0.2px] text-center text-[#429DED] font-medium inline-block group-hover:text-[#429DED]/80 transition-all duration-300'>Read the full case study</h5>

                           <svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none">
                              <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" className='group-hover:stroke-[#429DED]/80 transition-all duration-300' stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1.32812 17.3307L6.66146 11.9974L1.32812 6.66406" stroke="url(#paint0_linear_32_3952)" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <defs>
                                 <linearGradient id="paint0_linear_32_3952" x1="3.99479" y1="12.3853" x2="3.99479" y2="17.3307" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0" />
                                    <stop offset="1" stopColor="white" />
                                 </linearGradient>
                              </defs>
                           </svg>
                        </Link>
          </div>
        </div>
               </div>
            </div>
         </div>

      {/* Why Sales & BD Pros Love LockIn */}
         <div className='w-full h-auto flex flex-col gap-[24px] md:gap-[32px] lg:gap-[40px] pt-[100px] md:pt-[160px] lg:pt-[220px] pb-[50px] md:pb-[80px] lg:pb-[110px] relative overflow-hidden'>
            {/* Content Block */}
            <div className='w-full max-w-[760px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px]'>
               <h2 className='flex max-md:max-w-[280px] text-[28px] md:text-[42px] lg:text-[44px] leading-[36px] md:leading-[54px] lg:leading-[58px] -tracking-[0.56px] md:-tracking-[0.72px] lg:-tracking-[0.84px] text-center text-white font-hedvig font-normal'>Sales & BD Pros Love LockIn</h2>

               <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-center text-white font-normal opacity-[.7]'>Built for the way Web3 deals actually happen—in Telegram groups and X threads</span>
            </div>

            {/* Carousel Container */}
            <div className='w-full flex justify-center overflow-hidden'>
               <div className='flex items-start gap-[12px] md:gap-[24px] will-change-transform' ref={containerRef}>
                  {/* Single Carousel Item */}
                  <div className='shrink-0 w-[290px] md:w-[550px] lg:w-[650px] h-auto flex flex-col items-center gap-[16px] md:gap-[24px] p-[24px] md:p-[32px] lg:p-[40px]'>
                     {/* Desc */}
                     <h2 className='text-[15px] md:text-[20px] lg:text-[22px] leading-[21px] md:leading-[30px] -tracking-[0.6px] md:-tracking-[0.8px] lg:-tracking-[0.88px] text-white text-center font-normal'>"{carouselData[0].desc}"</h2>

                     {/* Owner & Role */}
                     <div className='w-full flex items-center justify-center gap-[8px]'>
                        <Image
                           src={carouselData[0].avatar}
                           width={carouselData[0].avatarWidth}
                           height={carouselData[0].avatarHeight}
                           alt='Avatar'
                           className='w-full max-w-[26px] h-full max-h-[26px] object-cover rounded-full'
                           draggable={false}
                        />

                        <h5 className='inline-block text-[13px] md:text-[16px] leading-[20px] md:leading-[24px] -tracking-[0.225px] md:-tracking-[0.3px] text-white font-normal'>{carouselData[0].name} <p className='inline-block opacity-[.8]'>/ {carouselData[0].role}</p></h5>
                     </div>
                  </div>

                  {/* Single Carousel Item */}
                  {
                     carouselData.map((item, i) => (
                        <div key={i} className='shrink-0 w-[290px] md:w-[550px] lg:w-[650px] h-auto flex flex-col items-center gap-[16px] md:gap-[24px] p-[24px] md:p-[32px] lg:p-[40px]'>
                           {/* Desc */}
                           <h2 className='text-[15px] md:text-[20px] lg:text-[22px] leading-[21px] md:leading-[30px] -tracking-[0.6px] md:-tracking-[0.8px] lg:-tracking-[0.88px] text-white text-center font-normal'>"{item.desc}"</h2>

                           {/* Owner & Role */}
                           <div className='w-full flex items-center justify-center gap-[8px]'>
                              <Image
                                 src={item.avatar}
                                 width={item.avatarWidth}
                                 height={item.avatarHeight}
                                 alt='Avatar'
                                 className='w-full max-w-[26px] h-full max-h-[26px] object-cover rounded-full'
                                 draggable={false}
                              />

                              <h5 className='inline-block text-[13px] md:text-[16px] leading-[20px] md:leading-[24px] -tracking-[0.225px] md:-tracking-[0.3px] text-white font-normal'>{item.name} <p className='inline-block opacity-[.8]'>/ {item.role}</p></h5>
                           </div>
                        </div>
                     ))
                  }

                  {/* Single Carousel Item */}
                  <div className='shrink-0 w-[290px] md:w-[550px] lg:w-[650px] h-auto flex flex-col items-center gap-[16px] md:gap-[24px] p-[24px] md:p-[32px] lg:p-[40px]'>
                     {/* Desc */}
                     <h2 className='text-[15px] md:text-[20px] lg:text-[22px] leading-[21px] md:leading-[30px] -tracking-[0.6px] md:-tracking-[0.8px] lg:-tracking-[0.88px] text-white text-center font-normal'>"{carouselData[carouselData.length - 1].desc}"</h2>

                     {/* Owner & Role */}
                     <div className='w-full flex items-center justify-center gap-[8px]'>
                        <Image
                           src={carouselData[carouselData.length - 1].avatar}
                           width={carouselData[carouselData.length - 1].avatarWidth}
                           height={carouselData[carouselData.length - 1].avatarHeight}
                           alt='Avatar'
                           className='w-full max-w-[26px] h-full max-h-[26px] object-cover rounded-full'
                           draggable={false}
                        />

                        <h5 className='inline-block text-[13px] md:text-[16px] leading-[20px] md:leading-[24px] -tracking-[0.225px] md:-tracking-[0.3px] text-white font-normal'>{carouselData[carouselData.length - 1].name} <p className='inline-block opacity-[.8]'>/ {carouselData[carouselData.length - 1].role}</p></h5>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Progress Bar */}
            <div className='flex items-center justify-center gap-[8px] md:gap-[10px]'>
               {carouselData.map((_, i) => (
                  <div
                     key={i}
                     className='w-[80px] h-[4px] md:h-[5px] rounded-full bg-[rgba(255,255,255,0.2)] overflow-hidden transition-all duration-300'
                  >
                     <div
                        ref={(el) => {
                           if (el) progressRefs.current[i] = el;
                        }}
                        className='h-full bg-white'
                        style={{ width: activeIndex === i ? '100%' : '0%' }}
                     />
            </div>
               ))}
          </div>
        </div>

         {/* Private & Security - COMMENTED OUT
         <div id="security" className='w-full h-auto flex flex-col items-center gap-[36px] md:gap-[48px] lg:gap-[60px] pt-[36px] md:pt-[80px] pb-[40px] md:pb-[90px] lg:pb-[140px] relative z-1'>
            <div className='w-full max-w-[1050px] mx-auto flex flex-col lg:flex-row gap-[14px] lg:gap-[20px] px-[16px] md:px-[20px]'>
               <div className='relative overflow-hidden w-full h-[132px] md:h-[176px] lg:h-[320px] rounded-[24px] lg:rounded-[36px] border border-[rgba(255,255,255,0.1)] bg-black backdrop-blur-[50px]'>
                  <div className='w-[173px] md:w-[302px] h-[179px] md:h-[312px] flex absolute top-[18px] md:top-[28px] lg:top-[13px] left-[196px] md:left-[368px] lg:left-[23px] max-lg:z-1'>
                     <Image
                        src={'/security/private-secure-1.svg'}
                        width={302}
                        height={312}
                        alt='Trusted Execution Environment Icon'
                        draggable={false}
                        className='shadow-[0_4px_54px_0_rgba(255,255,255,0.12)] rounded-full'
                     />
                  </div>
                  <div className='hidden lg:block absolute bottom-0 left-0 w-full h-[230px] z-[1]' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 43.91%)' }}></div>
                  <div className='absolute top-[18px] md:top-[28px] left-[18px] md:left-[28px] lg:bottom-[34px] lg:left-1/2 lg:-translate-x-1/2 lg:top-auto w-full max-w-[168px] md:max-w-[232px] lg:max-w-[301px] flex flex-col items-start lg:items-center justify-start lg:justify-center gap-[12px] md:gap-[18px] lg:text-center z-[2]'>
                     <h2 className='text-[40px] md:text-[48px] leading-[100%] -tracking-[1.2px] lg:-tracking-[1.44px] text-white font-hedvig font-normal'>60%</h2>
                     <span className='text-start lg:text-center text-[15px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[27px] lg:leading-[1.35] -tracking-[0.225px] md:-tracking-[0.2px] lg:-tracking-[0.3px] text-white font-normal opacity-[.8]'>Reduction in time spent prospecting</span>
              </div>
               </div>
               <div className='relative overflow-hidden w-full h-[132px] md:h-[176px] lg:h-[320px] rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-black backdrop-blur-[50px]'>
                  <div className='w-[206px] md:w-[403px] lg:w-[300px] h-[89px] md:h-[121px] lg:h-[105px] flex absolute top-1/2 -translate-y-1/2 lg:top-[55px] lg:translate-y-0 left-[198px] md:left-[339px] lg:left-auto lg:right-1/2 lg:translate-x-1/2 max-lg:z-1 overflow-hidden'>
                     <Image
                        src={'/security/private-secure-2.svg'}
                        width={349}
                        height={121}
                        alt='Trusted Execution Environment Icon'
                        draggable={false}
                        className='shadow-[0_4px_54px_0_rgba(255,255,255,0.12)] w-full h-full'
                     />
                  </div>
                  <div className='absolute top-0 left-[198px] md:left-[339px] w-[67px] h-full bg-gradient-to-r from-black to-transparent lg:hidden z-[2]'></div>
                  <div className='absolute top-[17px] md:top-[28px] left-[17px] md:left-[28px] lg:bottom-0 lg:left-0 lg:top-auto w-full max-w-[170px] md:max-w-[232px] lg:max-w-full lg:p-[14px] lg:px-[20px] lg:py-[34px] flex flex-col items-start lg:items-center justify-start lg:justify-center gap-[12px] md:gap-[18px]'>
                     <h2 className='text-[40px] md:text-[48px] leading-[100%] -tracking-[1.2px] text-white font-hedvig font-normal'>3x</h2>
                     <span className='text-start lg:text-center text-[15px] md:text-[18px] lg:text-[17px] leading-[22px] md:leading-[27px] -tracking-[0.225px] md:-tracking-[0.2px] text-white font-normal opacity-[.8]'>Reduction in time spent prospecting</span>
                  </div>
               </div>
               <div className='relative overflow-hidden w-full h-[132px] md:h-[176px] lg:h-[320px] rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-black backdrop-blur-[50px]'>
                  <div className='w-[190px] md:w-[296px] lg:w-[296px] h-[184px] md:h-[287px] lg:h-[287px] flex flex-col gap-[8px] md:gap-[10px] lg:gap-[10px] absolute top-[17px] md:top-[28px] lg:top-[25px] left-[198px] md:left-[368px] lg:left-auto lg:right-1/2 lg:translate-x-1/2 rounded-[13px] md:rounded-[21px] lg:rounded-[21px] overflow-hidden border border-[rgba(255,255,255,0.11)] shadow-[0_4px_54px_0_rgba(255,255,255,0.12)] p-[14px] md:p-[24px] lg:p-[24px] max-lg:z-1'>
                     <div className='w-full h-[30px] md:h-[38px] lg:h-[47px] bg-[rgba(255,255,255,0.1)] rounded-[22px] md:rounded-[28px] lg:rounded-[34px] flex items-center px-[5px] md:px-[6px] lg:px-[7px] gap-[6px] md:gap-[8px]'>
                        <div className='w-[22px] md:w-[28px] lg:w-[33px] h-[22px] md:h-[28px] lg:h-[33px] rounded-full overflow-hidden border border-[rgba(255,255,255,0.15)] flex-shrink-0'>
                           <Image src='/security/avatar-top.webp' width={33} height={33} alt='Avatar' className='w-full h-full object-cover' />
                        </div>
                        <div className='flex-1 h-[12px] md:h-[16px] lg:h-[19px] rounded-[16px] md:rounded-[20px] lg:rounded-[25px]' style={{ background: 'linear-gradient(-5deg, rgba(255,255,255,0.4) 32%, transparent 82%), linear-gradient(90deg, #1363A9 0%, #1363A9 100%)' }} />
                     </div>
                     <div className='w-full h-[30px] md:h-[38px] lg:h-[47px] bg-[rgba(255,255,255,0.1)] rounded-[22px] md:rounded-[28px] lg:rounded-[34px] flex items-center px-[5px] md:px-[6px] lg:px-[7px] gap-[6px] md:gap-[8px]'>
                        <div className='w-[22px] md:w-[28px] lg:w-[33px] h-[22px] md:h-[28px] lg:h-[33px] rounded-full overflow-hidden border border-[rgba(255,255,255,0.15)] flex-shrink-0'>
                           <Image src='/security/avatar-bottom.webp' width={33} height={33} alt='Avatar' className='w-full h-full object-cover' />
                        </div>
                        <div className='w-[65%] h-[12px] md:h-[16px] lg:h-[19px] rounded-[16px] md:rounded-[20px] lg:rounded-[25px]' style={{ background: 'linear-gradient(-5deg, rgba(255,255,255,0.4) 32%, transparent 82%), linear-gradient(90deg, #1363A9 0%, #1363A9 100%)' }} />
                     </div>
                     <div className='w-full h-[30px] md:h-[38px] lg:h-[47px] bg-[rgba(255,255,255,0.1)] rounded-[22px] md:rounded-[28px] lg:rounded-[34px] flex items-center px-[5px] md:px-[6px] lg:px-[7px] gap-[6px] md:gap-[8px]'>
                        <div className='w-[22px] md:w-[28px] lg:w-[33px] h-[22px] md:h-[28px] lg:h-[33px] rounded-full bg-[#d9d9d9] opacity-10 flex-shrink-0' />
                        <div className='flex-1 h-[12px] md:h-[16px] lg:h-[19px] rounded-[16px] md:rounded-[20px] lg:rounded-[25px] bg-[#d9d9d9] opacity-10' />
                     </div>
                     <div className='w-full h-[30px] md:h-[38px] lg:h-[47px] bg-[rgba(255,255,255,0.1)] rounded-[22px] md:rounded-[28px] lg:rounded-[34px] flex items-center px-[5px] md:px-[6px] lg:px-[7px] gap-[6px] md:gap-[8px]'>
                        <div className='w-[22px] md:w-[28px] lg:w-[33px] h-[22px] md:h-[28px] lg:h-[33px] rounded-full bg-[#d9d9d9] opacity-10 flex-shrink-0' />
                        <div className='flex-1 h-[12px] md:h-[16px] lg:h-[19px] rounded-[16px] md:rounded-[20px] lg:rounded-[25px] bg-[#d9d9d9] opacity-10' />
                     </div>
                     <div className='w-full h-[30px] md:h-[38px] lg:h-[47px] bg-[rgba(255,255,255,0.1)] rounded-[22px] md:rounded-[28px] lg:rounded-[34px] flex items-center px-[5px] md:px-[6px] lg:px-[7px] gap-[6px] md:gap-[8px]'>
                        <div className='w-[22px] md:w-[28px] lg:w-[33px] h-[22px] md:h-[28px] lg:h-[33px] rounded-full bg-[#d9d9d9] opacity-10 flex-shrink-0' />
                        <div className='flex-1 h-[12px] md:h-[16px] lg:h-[19px] rounded-[16px] md:rounded-[20px] lg:rounded-[25px] bg-[#d9d9d9] opacity-10' />
                     </div>
                  </div>
                  <div className='absolute top-[18px] md:top-[28px] left-[18px] md:left-[28px] lg:bottom-0 lg:left-0 lg:top-auto w-full max-w-[160px] md:max-w-[215px] lg:max-w-full lg:p-[14px] lg:px-[20px] lg:py-[34px] flex flex-col items-start lg:items-center justify-start lg:justify-center gap-[12px] md:gap-[18px] lg:bg-gradient-to-b lg:from-transparent lg:to-black lg:to-[44%]'>
                     <h2 className='text-[40px] md:text-[48px] leading-[100%] -tracking-[1.2px] lg:-tracking-[1.44px] text-white font-hedvig font-normal'>5x</h2>
                     <span className='max-w-[160px] md:max-w-[215px] lg:max-w-[230px] w-full text-start lg:text-center text-[15px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[27px] lg:leading-[1.35] -tracking-[0.225px] md:-tracking-[0.2px] lg:-tracking-[0.3px] text-white font-normal opacity-[.8]'>More qualified leads identified</span>
                  </div>
               </div>
            </div>
            <div className='w-full flex items-center justify-center'>
               <div className='flex flex-col lg:flex-row items-center gap-[32px] lg:gap-[77px] px-[45px]'>
                  <div className='w-full md:max-w-[608px] lg:max-w-[457px] h-auto px-[12px] md:px-[24px] flex flex-col items-center'>
                     <div className='w-[140px] h-[71px] flex items-center justify-center'>
                        <Image
                           src={'/security/private-secure-card-icon.svg'}
                           width={122}
                           height={50}
                           alt='Trusted Execution Environment Icon'
                           draggable={false}
                        />
                     </div>
                     <div className='w-full flex flex-col items-center gap-[16px] mt-[20px]'>
                        <h5 className='max-md:max-w-[274px] w-full text-[20px] md:text-[24px] leading-[28px] md:leading-[42px] -tracking-[0.2px] md:-tracking-[0.24px] text-center text-white font-hedvig'>Private & Secure</h5>
                        <span className='w-full text-[15px] md:text-[20px] leading-[22px] md:leading-[28px] -tracking-[0.25px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.8]'>All data encrypted in a Trusted Execution Environment. We never send your conversations to third-party AI providers.</span>
                     </div>
                  </div>
                  <div className='w-full md:max-w-[608px] lg:max-w-[457px] h-auto px-[12px] md:px-[24px] flex flex-col items-center'>
                     <div className='w-[140px] h-[71px] flex items-center justify-center'>
                        <Image
                           src={'/features/build-for-web3/build-for-web-3-card-icon.svg'}
                           width={98}
                           height={66}
                           alt='Trusted Execution Environment Icon'
                           draggable={false}
                        />
                     </div>
                     <div className='w-full flex flex-col items-center gap-[16px] mt-[20px]'>
                        <h5 className='max-md:max-w-[274px] w-full text-[20px] md:text-[24px] leading-[28px] md:leading-[42px] -tracking-[0.2px] md:-tracking-[0.24px] text-center text-white font-hedvig'>Built for Web3</h5>
                        <span className='w-full text-[15px] md:text-[20px] leading-[22px] md:leading-[28px] -tracking-[0.25px] md:-tracking-[0.3px] text-center text-white font-normal opacity-[.8]'>Designed for L1s, L2s, and B2B crypto companies where deals happen in Telegram channels and X threads.</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         */}

         {/* Transparent Pricing */}
         <div id="pricing" className='w-full h-auto flex flex-col items-center relative px-[16px] md:px-[24px] pt-[50px] md:pt-[80px] lg:pt-[110px] overflow-x-clip'>
            {/* Content Block */}
            <div className='w-full max-w-[760px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[24px] md:mb-[40px] lg:mb-[56px] relative z-1'>
               <h2 className='flex max-md:max-w-[280px] text-[28px] md:text-[42px] lg:text-[44px] leading-[36px] md:leading-[54px] lg:leading-[58px] -tracking-[0.56px] md:-tracking-[0.72px] lg:-tracking-[0.84px] text-center text-white font-hedvig font-normal'>Transparent Pricing</h2>

               <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-center text-white font-normal opacity-[.7]'>Choose the plan that scales with your team</span>
            </div>

            {/* Circle Gradient */}
            <div className='w-[1208px] md:w-[1222px] lg:w-[1443px] 2xl:w-[1800px] h-[650px] md:h-[700px] lg:h-[800px] 2xl:h-[1000px] absolute top-[50px] md:top-[80px] lg:top-[120px] left-1/2 -translate-x-1/2 rounded-[169px] lg:rounded-[200px] bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

            {/* Stars Left */}
            <div className='w-[411px] md:w-[728px] 2xl:w-[950px] h-[550px] md:h-[800px] 2xl:h-[1100px] absolute top-[50px] md:top-[80px] lg:top-[120px] -left-[221px] md:-left-[322px] lg:left-0'>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-contain'
               />
            </div>

            {/* Stars Right */}
            <div className='w-[411px] md:w-[728px] 2xl:w-[950px] h-[550px] md:h-[800px] 2xl:h-[1100px] absolute top-[50px] md:top-[80px] lg:top-[120px] -right-[221px] md:-right-[322px] lg:right-0'>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-contain'
               />
            </div>

            {/* Plans Block */}
            <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row gap-[12px] md:gap-[16px] lg:gap-[22px]'>
               {/* Standart Plan */}
               <div className='w-full h-auto rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border border-[#272727] bg-black backdrop-blur-md p-[16px] lg:p-[24px]'>
                  {/* Title Text */}
                  <div className='w-full flex flex-col gap-[6px] mb-[18px] lg:mb-[22px]'>
                     <h5 className='text-[18px] lg:text-[24px] leading-[100%] text-white font-hedvig font-normal'>Standard Plan</h5>
                     <span className='text-[14px] lg:text-[17px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.8]'>Perfect for individuals and small teams</span>
                  </div>

                  {/* Price Block */}
                  <div className='flex items-center gap-[8px] lg:gap-[16px]'>
                     <h1 className='text-[42px] lg:text-[60px] leading-[52px] lg:leading-[70px] -tracking-[1.56px] lg:-tracking-[2.22px] text-white font-hedvig font-normal'>$120</h1>
                     <div className='flex flex-col gap-[2px]'>
                        <span className='text-[14px] lg:text-[17px] leading-[16px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.5]'>per month,</span>
                        <span className='text-[14px] lg:text-[17px] leading-[16px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.5]'>per seat</span>
                     </div>
                  </div>

                  {/* Get Started Btn */}
                  <div className='w-full h-[40px] lg:h-[48px] rounded-[28px] lg:rounded-[100px] flex items-center justify-center border border-[rgba(255,255,255,0.15)] mt-[10px] lg:mt-[16px] mb-[18px] lg:mb-[24px] group hover:bg-white transition-all duration-300 relative'>
                     <Link href={'/pricing'} className='flex items-center justify-center w-full h-full'>
                        <span className='text-[14px] lg:text-[17px] leading-[150%] -tracking-[0.2px] font-semibold text-white group-hover:text-black transition-all duration-300'>Get Started</span>
                     </Link>
                  </div>

                  <span className='flex mb-[14px] lg:mb-[22px] text-[14px] lg:text-[17px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-semibold'>7-day free trial, no credit card required</span>

                  {/* Features List */}
                  <ul className='w-full flex flex-col gap-[12px] lg:gap-[18px]'>
                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M5.40558 20.0258C2.2753 15.5578 3.07973 9.43824 7.25837 5.93101C11.437 2.42377 17.6034 2.69259 21.4609 6.55017C25.3185 10.4077 25.5873 16.5741 22.0801 20.7527C18.5729 24.9314 12.4533 25.7358 7.9853 22.6055L4.66856 23.3426L5.40558 20.0258Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Track up to 100 conversations</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M3.95312 13.6418C9.30407 13.6418 13.6418 9.30407 13.6418 3.95312" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M13.6406 3.95312C13.6406 9.30407 17.9783 13.6418 23.3293 13.6418" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M23.3293 13.6406C17.9783 13.6406 13.6406 17.9783 13.6406 23.3293" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M13.6418 23.3293C13.6418 17.9783 9.30407 13.6406 3.95312 13.6406" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Daily AI-generated follow-up suggestions</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M25.1276 8.08008L19.2114 13.9962C18.7553 14.4524 18.0168 14.4524 17.5618 13.9962L15.0639 11.4984C14.6078 11.0422 13.8693 11.0422 13.4143 11.4984L6.46094 18.4517" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M25.1274 24.3293H2.87207V3.66992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Standard sales pipeline tracking</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M7.58333 11.6667V11.6667C5.32817 11.6667 3.5 9.8385 3.5 7.58333V7.58333C3.5 5.32817 5.32817 3.5 7.58333 3.5V3.5C9.8385 3.5 11.6667 5.32817 11.6667 7.58333V7.58333C11.6667 9.8385 9.8385 11.6667 7.58333 11.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M20.4163 11.6667V11.6667C18.1612 11.6667 16.333 9.8385 16.333 7.58333V7.58333C16.333 5.32817 18.1612 3.5 20.4163 3.5V3.5C22.6715 3.5 24.4997 5.32817 24.4997 7.58333V7.58333C24.4997 9.8385 22.6715 11.6667 20.4163 11.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M7.58333 24.5007V24.5007C5.32817 24.5007 3.5 22.6725 3.5 20.4173V20.4173C3.5 18.1622 5.32817 16.334 7.58333 16.334V16.334C9.8385 16.334 11.6667 18.1622 11.6667 20.4173V20.4173C11.6667 22.6725 9.8385 24.5007 7.58333 24.5007Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M24.4997 20.4173V20.4173C24.4997 18.1622 22.6715 16.334 20.4163 16.334V16.334C18.1612 16.334 16.333 18.1622 16.333 20.4173V20.4173C16.333 22.6725 18.1612 24.5007 20.4163 24.5007V24.5007C22.6715 24.5007 24.4997 22.6725 24.4997 20.4173Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Basic analytics dashboard</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <rect x="3.5" y="5.25" width="21" height="17.5" rx="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8.16699 10.4805L13.0724 12.6192C13.6648 12.8776 14.3378 12.8786 14.931 12.6221L19.8337 10.5022" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Email support</span>
                </li>
              </ul>
            </div>
            
            {/* Pro Plan */}
               <div className='w-full h-auto rounded-[20px] md:rounded-[28px] lg:rounded-[36px] border border-[#429DED] bg-black backdrop-blur-md p-[16px] lg:p-[24px]' style={{ boxShadow: '0 4px 54px 0 rgba(66, 157, 237, 0.25) inset' }}>
                  {/* Recomended Block */}
                  <div className='absolute top-[14px] lg:top-[24px] right-[14px] md:right-[16px] lg:right-[24px] flex items-center justify-center px-[8px] py-[3px] rounded-[40px] bg-[rgba(66,157,237,0.17)]'>
                     <span className='text-[13px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] font-normal text-[#429DED]'>Recommended</span>
              </div>

                  {/* Owl Image */}
                  <div className='w-[100px] md:w-[105px] lg:w-[170px] h-[63px] md:h-[67px] lg:h-[108px] flex items-center justify-center absolute top-[76px] md:top-[70px] lg:top-[72px] right-[10px] md:right-[16px] lg:right-[24px]'>
                     <Image
                        src={'/pricing/pro-plan-owl.webp'}
                        width={210}
                        height={134}
                        alt='Pro Plan Owl'
                        draggable={false}
                        className='w-full h-full object-contain'
                     />
                  </div>

                  {/* Title Text */}
                  <div className='w-full flex flex-col gap-[6px] mb-[18px] lg:mb-[22px]'>
                     <h5 className='text-[18px] lg:text-[24px] leading-[100%] text-white font-hedvig font-normal'>Pro Plan</h5>
                     <span className='text-[14px] lg:text-[17px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.8]'>For serious sales professionals</span>
                  </div>

                  {/* Price Block */}
                  <div className='flex items-center gap-[8px] lg:gap-[16px]'>
                     <h1 className='text-[42px] lg:text-[60px] leading-[52px] lg:leading-[70px] -tracking-[1.56px] lg:-tracking-[2.22px] text-white font-hedvig font-normal'>$150</h1>
                     <div className='flex flex-col gap-[2px]'>
                        <span className='text-[14px] lg:text-[17px] leading-[16px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.5]'>per month,</span>
                        <span className='text-[14px] lg:text-[17px] leading-[16px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal opacity-[.5]'>per seat</span>
                     </div>
                  </div>

                  {/* Get Started Btn */}
                  <div className='w-full h-[40px] lg:h-[48px] rounded-[28px] lg:rounded-[100px] flex items-center justify-center border border-[rgba(255,255,255,0.15)] mt-[10px] lg:mt-[16px] mb-[18px] lg:mb-[24px] group bg-white hover:bg-black transition-all duration-300 relative'>
                     <Link href={'/pricing'} className='flex items-center justify-center w-full h-full'>
                        <span className='text-[14px] lg:text-[17px] leading-[150%] -tracking-[0.2px] font-semibold text-black group-hover:text-white transition-all duration-300'>Get Started</span>
                     </Link>
                  </div>

                  <span className='flex mb-[14px] lg:mb-[22px] text-[14px] lg:text-[17px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-semibold'>7-day free trial, no credit card required</span>

                  {/* Features List */}
                  <ul className='w-full flex flex-col gap-[12px] lg:gap-[18px]'>
                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M8.25747 25.4427C11.4168 25.4427 13.9788 22.8807 13.9788 19.7213C13.9788 16.562 11.418 14 8.25747 14C5.09697 14 2.53613 16.562 2.53613 19.7213" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8.26317 25.4479C7.40217 25.4479 6.58667 25.2577 5.85401 24.9182L2.33301 25.666L3.06917 22.138C2.72734 21.403 2.53601 20.584 2.53601 19.7207" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.64983 14.0324C7.23217 13.0746 7 12.0304 7 10.9349C7 6.24845 11.1977 2.48828 16.3333 2.48828C21.469 2.48828 25.6667 6.24845 25.6667 10.9349C25.6667 13.7046 24.1943 16.1429 21.9345 17.6806C21.9357 18.5626 21.9333 19.7514 21.9333 20.9998L18.2712 19.1961C17.6447 19.3163 16.9972 19.3816 16.3333 19.3816C15.5085 19.3816 14.7082 19.2836 13.9452 19.1004" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Track up to 500 conversations</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M7.00033 19.834V24.5007" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.66699 22.1673H9.33366" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M19.8333 3.5V8.16667" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17.5 5.83333H22.1667" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.58301 5.83398C7.58301 8.08915 9.41117 9.91732 11.6663 9.91732" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M11.6663 9.91602C9.41117 9.91602 7.58301 11.7442 7.58301 13.9993" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.58333 13.9993C7.58333 11.7442 5.75517 9.91602 3.5 9.91602" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3.5 9.91732C5.75517 9.91732 7.58333 8.08915 7.58333 5.83398" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M13.5439 18.4072C16.5691 18.4072 19.0214 15.9549 19.0214 12.9297" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M19.0225 12.9297C19.0225 15.9549 21.4748 18.4072 24.5 18.4072" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M24.5 18.4082C21.4748 18.4082 19.0225 20.8605 19.0225 23.8857" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M19.0224 23.8857C19.0224 20.8605 16.5701 18.4082 13.5449 18.4082" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>AI insights (lead intent, urgency detection)</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M5.83301 18.5365L11.7492 12.6203C12.2053 12.1642 12.9438 12.1642 13.3988 12.6203L15.8967 15.1182C16.3528 15.5743 17.0913 15.5743 17.5463 15.1182L24.4997 8.16602" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M21.3887 8.16602H24.5002V11.2775" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M24.5003 24.4171H2.24609V3.75781" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Custom sales pipeline stages</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M22.1663 19.8327H20.9997C20.3557 19.8327 19.833 19.31 19.833 18.666V12.8327C19.833 12.1887 20.3557 11.666 20.9997 11.666H22.1663C23.4555 11.666 24.4997 12.7102 24.4997 13.9993V17.4993C24.4997 18.7885 23.4555 19.8327 22.1663 19.8327Z" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M7 19.8327H5.83333C4.54417 19.8327 3.5 18.7885 3.5 17.4993V13.9993C3.5 12.7102 4.54417 11.666 5.83333 11.666H7C7.644 11.666 8.16667 12.1887 8.16667 12.8327V18.666C8.16667 19.31 7.644 19.8327 7 19.8327Z" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M21.5837 11.6667V11.0833C21.5837 6.895 18.1887 3.5 14.0003 3.5V3.5C9.81199 3.5 6.41699 6.895 6.41699 11.0833V11.6667" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.7292 24.7917H13.2708C12.4658 24.7917 11.8125 24.1383 11.8125 23.3333V23.3333C11.8125 22.5283 12.4658 21.875 13.2708 21.875H14.7292C15.5342 21.875 16.1875 22.5283 16.1875 23.3333V23.3333C16.1875 24.1383 15.5342 24.7917 14.7292 24.7917Z" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16.1875 23.334H18.6667C19.9558 23.334 21 22.2898 21 21.0007V19.834" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Priority support</span>
                </li>

                     <li className='flex items-center gap-[10px]'>
                        <div className='w-[22px] lg:w-[24px] h-[22px] lg:h-[24px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                              <path d="M18.6663 23.3333V22.1667C18.6663 19.5893 16.577 17.5 13.9997 17.5H6.99967C4.42235 17.5 2.33301 19.5893 2.33301 22.1667V23.3333" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="10.4997" cy="8.16667" r="4.66667" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M25.6667 23.3333V22.1667C25.6667 19.5893 23.5773 17.5 21 17.5V17.5" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333" stroke="#429DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                        </div>

                        <span className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white font-normal'>Team collaboration features</span>
                </li>
              </ul>
            </div>
          </div>
          
            {/* Pricing Text Block */}
            <div className='w-full max-w-[270px] md:max-w-[420px] lg:max-w-[680px] mx-auto flex justify-center mt-[22px] md:mt-[36px] lg:mt-[50px] mb-[16px] md:mb-[24px] lg:mb-[32px]'>
               <span className='text-[14px] md:text-[17px] leading-[22px] md:leading-[26px] text-white opacity-[.8] text-center'>Need more than 500 conversations? Contact us for enterprise pricing.</span>
        </div>

            {/* Contact Us Button */}
            <div className='rounded-[100px] border border-[#272727] relative z-1 group hover:bg-white transition-all duration-300'>
               <Link className='px-[20px] py-[13px] w-full h-full flex items-center justify-center gap-[8px]' href={'/'}>
                  <span className='flex text-[15px] lg:text-[20px] leading-[22px] lg:leading-[24px] -tracking-[0.15px] lg:-tracking-[0.2px] text-white group-hover:text-black transition-all duration-300 font-semibold'>Contact Us</span>

                  <div className='w-[24px] lg:w-[28px] h-[24px] lg:h-[28px] [&>svg]:w-full [&>svg]:h-full flex items-center justify-center'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path className='group-hover:stroke-black transition-all duration-300' fillRule="evenodd" clipRule="evenodd" d="M17.0848 23.2263L23.4501 6.05295C23.7966 5.11729 22.8854 4.20729 21.9509 4.55379L4.77176 10.9238C3.69726 11.3228 3.78126 12.8698 4.89309 13.1486L12.8661 15.1518L14.8576 23.1038C15.1376 24.2168 16.6858 24.302 17.0848 23.2263V23.2263Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path className='group-hover:stroke-black transition-all duration-300' d="M23.1815 4.81836L12.8682 15.155" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
               </Link>
            </div>
         </div>

      {/* FAQ */}
         <div className='w-full h-auto flex flex-col items-center relative z-1 px-[16px] md:px-[24px] pt-[100px] md:pt-[160px] lg:pt-[220px] pb-[60px] md:pb-[120px] lg:pb-[160px]'>
            {/* Content Block */}
            <div className='w-full max-w-[760px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[22px] md:mb-[30px] lg:mb-[36px] relative z-1'>
               <h2 className='flex max-md:max-w-[280px] text-[28px] md:text-[42px] lg:text-[44px] leading-[36px] md:leading-[54px] lg:leading-[58px] -tracking-[0.56px] md:-tracking-[0.72px] lg:-tracking-[0.84px] text-center text-white font-hedvig font-normal'>Frequently Asked Questions</h2>
            </div>

            {/* FAQ Wrapper */}
            <div className='w-full max-w-[1000px] 2xl:max-w-[1200px] flex flex-col'>
               {faqData.map((item, i) => (
                  // Single Faq Item
                  <div className={`w-full ${activeFaq === i ? 'h-[200px] md:h-[185px] lg:h-[160px] bg-black rounded-[20px] md:rounded-[36px] border border-[#272727]' : 'h-[64px] md:h-[72px] border-t border-x border-t-transparent border-x-transparent'} ${(i !== faqData.length - 1 && i !== activePrevFaq) ? 'border-b border-b-[#272727]' : ''} overflow-hidden pl-[12px] md:pl-[24px] lg:pl-[28px] pr-[12px] md:pr-[18px] lg:pr-[28px] transition-[height,background] duration-300`} key={i}>
                     {/* Question Block */}
                     <div className='w-full h-[64px] md:h-[72px] flex items-center justify-between gap-[8px]' onClick={() => toggleFaq(i)}>
                        <h5 className='text-[14px] md:text-[20px] leading-[20px] md:leading-[26px] -tracking-[0.15px] md:-tracking-0 text-white font-hedvig'>{item.question}</h5>

                        <div className='min-w-[28px] md:min-w-[34px] w-[28px] md:w-[34px] h-[28px] md:h-[34px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center'>
                           <svg className='w-[13px] h-auto' style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0)' }} xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                              <path d="M0.75 0.75L6.41667 6.41667L12.0833 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                  </div>
                     </div>

                     {/* Desc Wrapper */}
                     <div className='w-full flex'>
                        <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>{item.desc}</span>
                     </div>
              </div>
            ))}
          </div>
        </div>

         {/* Footer */}
         <div className='w-full h-auto flex flex-col items-center px-[16px] md:px-[18px] pt-[40px] md:pt-[60px] lg:pt-[80px] relative overflow-x-clip'>
            {/* Circle Gradient */}
            <div className='w-[493px] md:w-[1061px] lg:w-[1481px] 2xl:w-[1900px] h-[493px] md:h-[1048px] lg:h-[1100px] 2xl:h-[1400px] absolute bottom-0 left-1/2 -translate-x-1/2 lg:rounded-full bg-[#0F0E38] blur-[137px] lg:blur-[162px] z-0'></div>

            {/* Stars */}
            <div className='w-[348px] md:w-[728px] 2xl:w-[950px] h-[660px] md:h-[1380px] 2xl:h-[1800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90'>
               <Image
                  src={'/backgrounds/stars.svg'}
                  width={1380}
                  height={728}
                  alt='Stars Left'
                  draggable={false}
                  className='w-full h-full object-contain'
               />
        </div>

            {/* Content Block */}
            <div className='w-full max-w-[650px] mx-auto flex flex-col items-center gap-[10px] lg:gap-[16px] mb-[24px] md:mb-[40px] lg:mb-[56px] relative z-1'>
               <h2 className='text-[40px] md:text-[64px] lg:text-[72px] leading-[46px] md:leading-[70px] lg:leading-[80px] -tracking-[2.28px] md:-tracking-[3.28px] lg:-tracking-[3.52px] text-center text-white font-hedvig font-normal'>Ready to Lock In More Deals?</h2>

               <span className='flex max-w-[300px] md:max-w-[480px] lg:max-w-[420px] justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-center text-white font-normal opacity-[.7]'>Join top Web3 teams turning Telegram noise into qualified pipeline</span>

               {/* Get Started Button */}
               <div
                  className='w-[170px] md:w-[210px] h-[48px] md:h-[58px] rounded-[28px] flex items-center justify-center mt-[10px] md:mt-[16px] group border-[3px] border-[#8d8d8d] hover:border-black bg-white hover:bg-black transition-all duration-300'
               >
                  <Link href='#pricing' className='flex items-center justify-center w-full h-full'>
                     <span className='text-[18px] md:text-[20px] leading-normal -tracking-[0.6px] md:-tracking-[0.72px] font-semibold text-black group-hover:text-white transition-all duration-300'>Get Started</span>
                  </Link>
            </div>
          </div>
          
            {/* Footer Block */}
            <div className='w-full max-w-[1200px] 2xl:max-w-[1400px] min-h-[290px] md:min-h-[210px] lg:min-h-[280px] h-auto mx-auto bg-black border border-[#272727] rounded-[20px] md:rounded-[28px] lg:rounded-[36px] backdrop-blur-[27px] px-[16px] md:px-[24px] pt-[20px] md:pt-[24px] lg:pt-[48px]'>
               <div className='w-full max-w-[1110px] mx-auto flex flex-col md:flex-row items-start justify-between'>
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

                     <span className='flex justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>Lead intelligence for Web3</span>

                     {/* Social Icons */}
                     <div className='hidden md:flex items-center gap-[14px] md:mt-[14px] lg:mt-[30px]'>
                        {/* Telegram */}
                        <div className='w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                           <Link href='https://t.me/lockinbot' target='_blank' className='absolute inset-0'></Link>
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                              <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                              <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_32_2465)" />
                              <defs>
                                 <linearGradient id="paint0_linear_32_2465" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
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
                           <Link href='https://www.linkedin.com/company/lockinbot' target='_blank' className='absolute inset-0'></Link>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                           </svg>
                        </div>

                        {/* Instagram */}
                        <div className='w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.50)] transition-all duration-300 relative'>
                           <Link href='https://www.instagram.com/lockinbot' target='_blank' className='absolute inset-0'></Link>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white"/>
                           </svg>
                        </div>
          </div>
        </div>
        
                  {/* Nav Block */}
                  <div className='flex items-start gap-[48px] md:gap-[56px] lg:gap-[70px] max-md:mt-[24px]'>
                     <div className='flex flex-col gap-[14px] md:gap-[16px]'>
                        <h5 className='w-full text-[14px] lg:text-[20px] leading-[20px] lg:leading-[36px] -tracking-[0.2px] lg:-tracking-[0.24px] text-white font-hedvig'>Product</h5>

                        <div className='flex flex-col gap-[10px] lg:gap-[12px]'>
                           <Link href='#features' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Features</Link>
                           <Link href='#pricing' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Pricing</Link>
                           <Link href='#security' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Security</Link>
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
                           <Link href='/cookies' className='text-[14px] lg:text-[17px] leading-[24px] -tracking-[0.3px] opacity-[.8] font-normal text-white hover:opacity-100 transition-all duration-300'>Cookie Policy</Link>
                        </div>
                     </div>
                  </div>

                  {/* Social Icons */}
                  <div className='flex md:hidden items-center gap-[12px] mt-[28px] flex-wrap'>
                     {/* Telegram */}
                     <div className='whitespace-nowrap w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                        <Link href='https://t.me/lockinbot' target='_blank' className='absolute inset-0'></Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                           <path d="M6.76629 15.6159C6.22912 15.6159 6.32553 15.4093 6.1327 14.8997L4.5625 9.72079L14.3143 3.63281L15.4575 3.93583L14.5071 6.52529L6.76629 15.6159Z" fill="#DEDEDE" />
                           <path d="M6.76562 15.6184C7.17887 15.6184 7.35794 15.4256 7.59211 15.2052C7.95025 14.8608 12.551 10.384 12.551 10.384L9.72719 9.69531L7.10999 11.3483L6.76562 15.4807V15.6184Z" fill="#D0D0D0" />
                           <path d="M7.0411 11.4029L13.7081 16.3205C14.4657 16.7338 15.0167 16.5271 15.2095 15.618L17.9231 2.83507C18.1986 1.71932 17.4961 1.22343 16.766 1.55402L0.84248 7.69754C-0.245722 8.13833 -0.231947 8.74442 0.649634 9.00614L4.74072 10.2872L14.204 4.32274C14.6447 4.04724 15.058 4.19877 14.7274 4.50181L7.0411 11.4029Z" fill="url(#paint0_linear_32_2465-new)" />
                           <defs>
                              <linearGradient id="paint0_linear_32_2465-new" x1="11.0345" y1="8.55915" x2="14.4782" y2="14.069" gradientUnits="userSpaceOnUse">
                                 <stop stopColor="#EDEDED" />
                                 <stop offset="1" stopColor="white" />
                              </linearGradient>
                           </defs>
                        </svg>
                     </div>

                     {/* X (Twitter) */}
                     <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                        <Link href='https://x.com/thelockinbot' target='_blank' className='absolute inset-0'></Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 18 17" fill="none">
                           <path d="M10.6944 7L17.2222 0H15.5556L9.94444 6L5.55556 0H0L6.83333 9.33333L0 16.6667H1.66667L7.58333 10.3333L12.2222 16.6667H17.7778L10.6944 7ZM2.47222 1.11111H4.69444L15.2778 15.5556H13.0556L2.47222 1.11111Z" fill="white" />
                        </svg>
                     </div>

                     {/* LinkedIn */}
                     <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                        <Link href='https://www.linkedin.com/company/lockinbot' target='_blank' className='absolute inset-0'></Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                        </svg>
                     </div>

                     {/* Instagram */}
                     <div className='w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.10)] flex items-center justify-center relative'>
                        <Link href='https://www.instagram.com/lockinbot' target='_blank' className='absolute inset-0'></Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white"/>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>

            <span className='flex mt-[20px] md:mt-[24px] lg:mt-[32px] mb-[24px] lg:mb-[32px] justify-center w-full text-[14px] md:text-[17px] leading-[20px] md:leading-[22px] -tracking-[0.22px] md:-tracking-[0.4px] text-white font-normal opacity-[.8]'>© 2025 LockIn. All rights reserved.</span>
         </div>

         {/* <div className='w-full h-screen bg-black'></div> */}

      </div>
   )
}


