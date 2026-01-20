'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const signalCards = [
  {
    name: 'Stani Kulechov',
    company: 'Aave',
    message: '"Our GHO stablecoin contracts need auditing before mainnet. Any auditors with lending protocol experience?"',
    platform: 'Post',
    avatar: '/features/know-the-right-moment/stani-kulechov.png',
    icon: '/features/find-strongest-path/x-icon.svg',
  },
  {
    name: 'Mert Mumtaz',
    company: 'Helius',
    message: '"Need recommendations for security audits = preferably someone who\'s done Solana programs."',
    platform: 'Solana Devs',
    avatar: '/features/know-the-right-moment/mert-mumtaz.png',
    icon: '/features/know-the-right-moment/telegram-send-icon.svg',
  },
];

const CARD_DISPLAY_DURATION = 3000;
const CARD_TRANSITION_DURATION = 500;

export function SignalCardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setDirection('up');

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % signalCards.length);
        setDirection('down');

        setTimeout(() => {
          setIsAnimating(false);
        }, CARD_TRANSITION_DURATION);
      }, CARD_TRANSITION_DURATION);
    }, CARD_DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, []);

  const card = signalCards[activeIndex];

  return (
    <div className='absolute top-[365px] left-1/2 -translate-x-1/2 w-[441px] max-w-[calc(100%-48px)] z-10'>
      <div
        className='w-full bg-[rgba(0,0,0,0.4)] backdrop-blur-[25px] border-[0.884px] border-[#272727] rounded-[20px] shadow-[0px_4px_84px_0px_rgba(255,255,255,0.19)] p-[23px] flex items-start gap-[21px] transition-all'
        style={{
          transform: isAnimating
            ? direction === 'up'
              ? 'translateY(-20px)'
              : 'translateY(20px)'
            : 'translateY(0)',
          opacity: isAnimating ? 0 : 1,
          transitionDuration: `${CARD_TRANSITION_DURATION}ms`,
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <div className='w-[57px] h-[57px] rounded-full border-[0.385px] border-white/20 overflow-hidden bg-[#090e21] flex-shrink-0'>
          <Image src={card.avatar} width={57} height={57} alt={card.name} className='w-full h-full object-cover' />
        </div>

        <div className='flex flex-col gap-[17px] flex-1 min-w-0'>
          <div className='flex flex-col gap-[10px]'>
            <p className='text-[19px] leading-[21px] tracking-[-0.39px] text-white/80'>
              <span className='text-white font-semibold'>{card.name}</span> · {card.company}
            </p>
            <p className='text-[17px] leading-[26px] tracking-[-0.33px] text-white opacity-80 text-shadow-[0px_0px_20px_rgba(255,255,255,0.45)]'>
              {card.message}
            </p>
          </div>

          <div className='flex items-center gap-[6px]'>
            <Image src={card.icon} width={16} height={16} alt={card.platform} className='w-[16px] h-[16px] opacity-80' />
            <span className='text-[17px] leading-[21px] tracking-[-0.33px] text-white opacity-80 text-shadow-[0px_0px_20px_rgba(255,255,255,0.45)]'>{card.platform}</span>
            <span className='text-[17px] leading-[21px] tracking-[-0.33px] text-white opacity-80 text-shadow-[0px_0px_20px_rgba(255,255,255,0.45)]'>· Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
