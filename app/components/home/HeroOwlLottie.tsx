'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';

const heroOwlLotties = ['/hero/owl-1.lottie', '/hero/owl-2.lottie', '/hero/owl-3.lottie'];
const OVERLAP_SECONDS = 3;
const FADE_DURATION = 2;
const PLAYBACK_SPEED = 1.6;

export function HeroOwlLottie() {
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

      return [
        ...prev.map(a => ({ ...a, opacity: 0 })),
        { index: nextIndex, key: newKey, opacity: 1 }
      ];
    });

    setTimeout(() => {
      setAnimations(prev => prev.filter(a => a.opacity === 1));
    }, FADE_DURATION * 1000);
  }, []);

  const dotLottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
    if (dotLottie) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const handleLoad = () => {
        const duration = dotLottie.duration / PLAYBACK_SPEED;
        const transitionTime = Math.max(0, (duration - OVERLAP_SECONDS)) * 1000;

        timerRef.current = setTimeout(() => {
          startNextAnimation();
        }, transitionTime);
      };

      if (dotLottie.isLoaded) {
        handleLoad();
      } else {
        dotLottie.addEventListener('load', handleLoad);
      }
    }
  }, [startNextAnimation]);

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
