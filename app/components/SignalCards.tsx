'use client';

import { motion } from 'framer-motion'

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

interface Signal {
  platform: 'telegram' | 'x'
  author: {
    name: string
    avatar: string
    handle?: string
    avatarUrl?: string
  }
  group?: string
  content: string
  highlights: string[]
  time: string
  company: string
  engagement?: {
    likes: number
    retweets: number
    views: string
  }
}

const signals: Signal[] = [
  {
    platform: 'telegram',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
      avatarUrl: '/avatars/sarah-chen.jpg',
    },
    group: 'DeFi Builders',
    content: "Anyone know a good smart contract auditor? We're looking to get our v2 reviewed before launch",
    highlights: ['auditor', 'looking'],
    time: '2 min ago',
    company: 'Acme Protocol',
  },
  {
    platform: 'x',
    author: {
      name: 'Marcus Chen',
      avatar: 'MC',
      handle: '@marcus_nexus',
      avatarUrl: '/avatars/marcus-chen.jpg',
    },
    content: 'We need to hire 3 senior Rust engineers ASAP. Building something big in the Solana ecosystem. DM if interested',
    highlights: ['hire', 'Rust engineers'],
    time: '5 min ago',
    company: 'Nexus Labs',
    engagement: { likes: 127, retweets: 34, views: '12.4K' },
  },
]

// Highlight keywords in content
const HighlightedContent = ({ content, highlights }: { content: string, highlights: string[] }) => {
  let result = content
  highlights.forEach(h => {
    const regex = new RegExp(`(${h})`, 'gi')
    result = result.replace(regex, '|||$1|||')
  })

  return (
    <span>
      {result.split('|||').map((part, i) => {
        const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase())
        if (isHighlight) {
          return (
            <span key={i} className="bg-amber-500/20 text-amber-300 px-1 rounded font-medium">
              {part}
            </span>
          )
        }
        return part
      })}
    </span>
  )
}

function SignalCard({ signal, index }: { signal: Signal, index: number }) {
  const isTelegram = signal.platform === 'telegram'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.2 + index * 0.15,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={`
        relative bg-[#0a0a0a] rounded-2xl border shadow-lg p-4 md:p-5 w-full max-w-[340px]
        ${isTelegram ? "border-[#229ED9]/30" : "border-gray-700"}
      `}
    >
      {/* Platform badge */}
      <div className={`
        absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md
        ${isTelegram ? "bg-[#229ED9]" : "bg-white"}
      `}>
        {isTelegram ? (
          <TelegramIcon className="w-3.5 h-3.5 text-white" />
        ) : (
          <XIcon className="w-3.5 h-3.5 text-black" />
        )}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        {signal.author.avatarUrl ? (
          <img
            src={signal.author.avatarUrl}
            alt={signal.author.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className={`
            w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0
            ${isTelegram ? "bg-gradient-to-br from-purple-500 to-purple-700" : "bg-gradient-to-br from-gray-600 to-gray-800"}
          `}>
            {signal.author.avatar}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-[14px]">{signal.author.name}</span>
          </div>
          <div className="text-xs text-gray-400">
            {isTelegram ? (
              <span>in <span className="text-[#229ED9] font-medium">{signal.group}</span></span>
            ) : (
              <span>{signal.author.handle}</span>
            )}
          </div>
        </div>

        <span className="text-[10px] text-gray-500 flex-shrink-0">{signal.time}</span>
      </div>

      {/* Content */}
      <p className="text-[13px] md:text-[14px] text-gray-300 leading-relaxed mb-3">
        <HighlightedContent content={signal.content} highlights={signal.highlights} />
      </p>

      {/* Engagement stats for X posts */}
      {!isTelegram && signal.engagement && (
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {signal.engagement.likes}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            {signal.engagement.retweets}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {signal.engagement.views}
          </span>
        </div>
      )}

      {/* Company + Target list indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
        className="flex items-center justify-between pt-3 border-t border-gray-800"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
            {signal.company.charAt(0)}
          </div>
          <span className="text-xs font-medium text-gray-400">{signal.company}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          On target list
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SignalCards() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
      <motion.div
        initial={{ opacity: 0, rotate: -2 }}
        animate={{ opacity: 1, rotate: -2 }}
        transition={{ delay: 0.1 }}
        className="transform md:-translate-y-2"
      >
        <SignalCard signal={signals[0]} index={0} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 2 }}
        animate={{ opacity: 1, rotate: 2 }}
        transition={{ delay: 0.2 }}
        className="transform md:translate-y-2"
      >
        <SignalCard signal={signals[1]} index={1} />
      </motion.div>
    </div>
  )
}
