'use client';

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// Telegram icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

// X/Twitter icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// Bell/notification icon
const BellIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)

// Lightning bolt icon
const LightningIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
)

// Chat icon
const ChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
)

// Close icon
const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Send icon
const SendIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
)

const companies = [
  { name: 'Jupiter', type: 'DEX', stage: 'Series A', logo: '/avatars/jupiter.jpg' },
  { name: 'Phantom', type: 'Wallet', stage: 'Series B', logo: '/avatars/phantom.jpg' },
  { name: 'Jito', type: 'MEV', stage: 'Series A', logo: '/avatars/jito.png' },
]

// Sparkles icon for AI typing indicator
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
  </svg>
)

// Intro Request Modal with typing animation
function IntroModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [typedMessage, setTypedMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const fullMessage = "Hey Sarah, saw Mert just posted about hiring engineers at Helius. Could you intro me? I think our infra solution could help them scale their RPC services."

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTypedMessage('')
      setIsTyping(true)
      setIsSent(false)
    }
  }, [isOpen])

  // Typing animation effect
  useEffect(() => {
    if (isOpen && isTyping) {
      let i = 0
      const interval = setInterval(() => {
        if (i < fullMessage.length) {
          setTypedMessage(fullMessage.substring(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, 18)
      return () => clearInterval(interval)
    }
  }, [isOpen, isTyping, fullMessage])

  // Auto-send after typing completes
  useEffect(() => {
    if (isOpen && !isTyping && typedMessage === fullMessage && !isSent) {
      const timer = setTimeout(() => {
        setIsSent(true)
        setTimeout(() => {
          onClose()
        }, 1500)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isTyping, typedMessage, fullMessage, isSent, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isTyping && onClose()}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px] bg-[#111] border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                {isTyping ? (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-purple-400 animate-pulse" />
                  </div>
                ) : (
                  <img
                    src="/avatars/sarah-chen.jpg"
                    alt="Sarah Chen"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="text-white text-sm font-medium">Message Sarah</div>
                  <div className="text-xs h-4">
                    {isTyping ? (
                      <span className="text-purple-400 font-medium">AI drafting message...</span>
                    ) : (
                      <span className="text-gray-500">via Telegram</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 text-gray-500 hover:text-white transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Target info */}
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl mb-4">
                <img
                  src="/avatars/mert-mumtaz.jpg"
                  alt="Mert"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-white text-sm font-medium">Mert Mumtaz</div>
                  <div className="text-gray-500 text-xs">Co-founder & CEO at Helius</div>
                </div>
              </div>

              {/* Message with typing animation */}
              <div className="mb-4">
                <label className="text-gray-500 text-xs mb-2 block">Message to Sarah</label>
                <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-800 min-h-[100px]">
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {typedMessage}
                    {isTyping && <span className="inline-block w-0.5 h-4 bg-purple-400 animate-pulse ml-0.5 align-middle" />}
                  </p>
                </div>
              </div>

              {/* Context badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <LightningIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">Hiring Signal</span>
                </div>
                <span className="text-gray-600 text-xs">attached as context</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 bg-[#0D0D0D]">
              <div className="h-10 flex items-center justify-center">
                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-emerald-400 font-medium"
                  >
                    <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Message sent!
                  </motion.div>
                ) : (
                  <button
                    disabled={isTyping}
                    className={cn(
                      "w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all",
                      isTyping
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    )}
                  >
                    <SendIcon className="w-4 h-4" />
                    Send Message
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Step title component for consistent styling
function StepTitle({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex flex-col items-center md:items-start mb-4 md:mb-3">
      <span className="text-white text-base md:text-sm font-medium text-center md:text-left">
        <span className="text-emerald-400">{number}.</span> {title}
      </span>
    </div>
  )
}

export function ProcessDemo() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {/* Column 1: Build list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <StepTitle number={1} title="Build your target list" />
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 flex-1">
            {/* List header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">DeFi on Solana</div>
                <div className="text-gray-500 text-xs">247 companies</div>
              </div>
            </div>

            {/* Companies */}
            <div className="space-y-3">
              {companies.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-white text-sm font-medium">{company.name}</div>
                      <div className="text-gray-500 text-xs">{company.type}</div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">{company.stage}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Column 2: Set up monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <StepTitle number={2} title="Set up signal monitoring" />
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 flex-1">
            {/* Signal header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BellIcon className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm font-medium">Hiring Signal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Active</span>
              </div>
            </div>

            {/* Signal rule */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              When <span className="text-purple-400 font-medium">anyone</span> in{' '}
              <span className="text-purple-400 font-medium">Target List</span> posts about{' '}
              <span className="text-emerald-400 font-medium">"hiring"</span>
            </p>

            {/* Watching */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
              <span className="text-gray-500 text-xs">Watching</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#229ED9] flex items-center justify-center">
                  <TelegramIcon className="w-3 h-3 text-white" />
                </div>
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <XIcon className="w-3 h-3 text-black" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Identify warm path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col"
        >
          <StepTitle number={3} title="Identify the warmest path" />
          <div className="space-y-3 flex-1">
            {/* Signal detected card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="bg-[#111] border border-emerald-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                  <LightningIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-emerald-400 text-sm font-semibold">Signal detected!</div>
                  <div className="text-gray-400 text-xs">
                    <span className="text-white font-medium">Mert</span> from Helius
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic">"We're hiring engineers..."</p>
            </motion.div>

            {/* Warm path card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="bg-[#111] border border-gray-800 rounded-xl p-4"
            >
              <div className="text-gray-500 text-[10px] font-medium tracking-wider mb-3">YOUR PATH TO MERT</div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/avatars/sarah-chen.jpg"
                  alt="Sarah Chen"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-white text-sm font-medium">Via Sarah</div>
                  <div className="text-purple-400 text-xs">Your teammate</div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ChatIcon className="w-4 h-4" />
                Ask for Intro
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Intro Modal */}
      <IntroModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
