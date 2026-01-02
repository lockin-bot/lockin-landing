'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <div className='fixed top-0 left-0 w-full py-[10px] md:py-[14px] px-[12px] md:px-[20px] z-10'>
         {/* Navbar Inner */}
         <div
            className={`w-full max-w-[900px] ${menuOpen ? 'h-[260px] md:h-[270px]' : 'h-[48px] md:h-[54px]'} mx-auto flex flex-col ${menuOpen ? 'rounded-[20px]' : 'rounded-[20px] md:rounded-[100px]'} py-[6px] md:py-[8px] pl-[6px] md:pl-[8px] lg:pl-[20px] pr-[6px] md:pr-[8px] lg:pr-[10px] overflow-hidden will-change-auto`}
            style={{
               background: 'rgba(0, 0, 0, 0.16)',
               border: '1px solid rgba(255, 255, 255, 0.06)',
               boxShadow: '0 14px 144px 0 rgba(255, 255, 255, 0.05), 0 0 30px 0 rgba(255, 255, 255, 0.12) inset',
               backdropFilter: 'blur(292px)',
               transition: 'all 0.3s ease-in-out',
            }}
         >
            <div className='relative flex items-center justify-end lg:justify-between w-full'>
               {/* LEft Nav */}
               <div className='hidden lg:flex items-center gap-[24px]'>
                  <div className='flex items-center group'>
                     <Link href={'#features'}>
                        <span className='text-[16px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Features</span>
                     </Link>
                  </div>

                  <div className='flex items-center group'>
                     <Link href={'#pricing'}>
                        <span className='text-[16px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Pricing</span>
                     </Link>
                  </div>

                  <div className='flex items-center group'>
                     <Link href={'#security'}>
                        <span className='text-[16px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Security</span>
                     </Link>
                  </div>
               </div>

               {/* Logo */}
               <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[26px]'>
                  <Link href={'/'}>
                     <Image
                        src={'/logo.svg'}
                        width={76}
                        height={30}
                        alt='Logo'
                        className='w-full h-full object-contain'
                     />
                  </Link>
               </div>

               {/* Right Nav */}
               <div className='hidden lg:flex items-center gap-[20px]'>
                  <div className='flex items-center group'>
                     <Link href={'/pricing'}>
                        <span className='text-[16px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Book a Demo</span>
                     </Link>
                  </div>

                  {/* Get Started Button */}
                  <div
                     className='w-[120px] h-[38px] rounded-[38px] flex items-center justify-center group bg-[rgba(255,255,255,0.10)] hover:bg-white transition-all duration-300'
                     style={{
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(162px)'
                     }}
                  >
                     <Link href={'/pricing'} className='flex items-center justify-center w-full h-full'>
                        <span className='text-[15px] leading-[150%] -tracking-[0.2px] font-semibold text-white group-hover:text-black opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Get Started</span>
                     </Link>
                  </div>
               </div>

               {/* Burger Btn */}
               <div
                  className='lg:hidden w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-[48px] flex items-center justify-center'
                  style={{
                     border: '1px solid rgba(255, 255, 255, 0.05)',
                     background: 'rgba(255, 255, 255, 0.10)',
                     backdropFilter: 'blur(162px)'
                  }}
                  onClick={() => setMenuOpen(!menuOpen)}
               >
                  <div className='relative w-[18px] md:w-[20px] h-[10px]'>
                     <span
                        className='absolute top-1/2 left-1/2 w-full h-[3px] bg-white rounded-full transition-all duration-300 will-change-transform'
                        style={{
                           transform: menuOpen
                              ? 'translate(-50%, -50%) rotate(-45deg)'
                              : 'translate(-50%, -5.5px)',
                        }}
                     />
                     <span
                        className='absolute top-1/2 h-[3px] bg-white rounded-full transition-all duration-300 will-change-transform'
                        style={{
                           transform: menuOpen
                              ? 'translate(50%, -50%) rotate(45deg)'
                              : 'translate(0, 3px)',
                           right: menuOpen ? '50%' : '0',
                           width: menuOpen ? '100%' : '50%',
                        }}
                     />
                  </div>
               </div>
            </div>

            {/* Menu Wrapper */}
            <div className='flex w-full h-full'>
               <div className='w-full max-w-[500px] mx-auto h-full flex flex-col gap-[24px] pt-[24px]'>
                  {/* Navs */}
                  <div className='flex flex-col gap-[14px] pl-[8px]'>
                     <Link href={'#features'}>
                        <span className='text-[17px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Features</span>
                     </Link>
                     <Link href={'#pricing'}>
                        <span className='text-[17px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Pricing</span>
                     </Link>
                     <Link href={'#security'}>
                        <span className='text-[17px] leading-[150%] font-medium text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Security</span>
                     </Link>
                  </div>

                  {/* Get Started Button */}
                  <div
                     className='w-full h-[42px] rounded-[38px] flex items-center justify-center group'
                     style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(162px)'
                     }}
                  >
                     <Link href={'/pricing'} className='flex items-center justify-center w-full h-full'>
                        <span className='text-[17px] leading-[150%] -tracking-[0.2px] font-semibold text-white opacity-[.8] group-hover:opacity-100 transition-all duration-300'>Get Started</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>

         {/* Menu Layer */}
         <div className={`fixed top-0 left-0 w-full h-full bg-black z-[-1] ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300`} onClick={() => setMenuOpen(false)}></div>
      </div >
   )
}
