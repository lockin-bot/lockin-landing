'use client';

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface OtherPath {
  name: string
  via: string
  color?: 'emerald' | 'blue' | 'purple' | 'amber'
}

interface Company {
  id: string
  name: string
  description: string
  avatarUrl?: string
  categories: string[]
  funding: string
  stage: string
  contacts: number
  bestPath: {
    name: string
    title: string
    label: string
    color: 'emerald' | 'blue' | 'purple' | 'amber'
    initials: string
    avatarUrl?: string
  }
  otherPaths: OtherPath[]
}

const companies: Company[] = [
  {
    id: '1',
    name: 'Monad',
    description: 'High-performance EVM L1',
    avatarUrl: '/avatars/monad.jpg',
    categories: ['Blockchain', 'L1'],
    funding: '225M',
    stage: 'Series A',
    contacts: 6,
    bestPath: {
      name: 'Keone Hon',
      title: 'Co-founder & CEO',
      label: 'Active DM',
      color: 'emerald',
      initials: 'KH',
      avatarUrl: '/avatars/keone-hon.jpg',
    },
    otherPaths: [
      { name: 'James Hunsaker', via: 'Solana Devs', color: 'purple' },
      { name: 'Eunice Giarta', via: 'Twitter', color: 'amber' },
      { name: 'Kevin Galler', via: 'Via Alex', color: 'blue' },
    ],
  },
  {
    id: '2',
    name: 'Paradigm',
    description: 'Crypto venture fund',
    avatarUrl: '/avatars/paradigm.jpg',
    categories: ['VC', 'Crypto'],
    funding: '2.5B+',
    stage: 'AUM',
    contacts: 4,
    bestPath: {
      name: 'Dan Robinson',
      title: 'General Partner',
      label: 'Via Sarah',
      color: 'blue',
      initials: 'DR',
      avatarUrl: '/avatars/dan-robinson.jpg',
    },
    otherPaths: [
      { name: 'Georgios K.', via: 'Follows you', color: 'amber' },
      { name: 'Matt Huang', via: 'Crypto VCs', color: 'purple' },
    ],
  },
  {
    id: '3',
    name: 'Helius',
    description: 'Solana RPC & APIs',
    avatarUrl: '/avatars/helius.jpg',
    categories: ['Infrastructure', 'RPC'],
    funding: '9.5M',
    stage: 'Series A',
    contacts: 7,
    bestPath: {
      name: 'Mert Mumtaz',
      title: 'Co-founder & CEO',
      label: 'Active DM',
      color: 'emerald',
      initials: 'MM',
      avatarUrl: '/avatars/mert-mumtaz.jpg',
    },
    otherPaths: [
      { name: 'Noah Prince', via: 'Helius Devs', color: 'purple' },
      { name: 'Wilson Chen', via: 'Via Mike', color: 'blue' },
    ],
  },
  {
    id: '4',
    name: 'Jupiter',
    description: 'Solana DEX aggregator',
    avatarUrl: '/avatars/jupiter.jpg',
    categories: ['DeFi', 'DEX'],
    funding: '10M',
    stage: 'Seed',
    contacts: 3,
    bestPath: {
      name: 'Meow',
      title: 'Co-founder',
      label: 'Shared Group',
      color: 'purple',
      initials: 'MW',
      avatarUrl: '/avatars/meow.jpg',
    },
    otherPaths: [
      { name: 'Ben Chow', via: 'Follows you', color: 'amber' },
      { name: 'Siong', via: 'Active DM', color: 'emerald' },
    ],
  },
  {
    id: '5',
    name: 'Farcaster',
    description: 'Decentralized social',
    avatarUrl: '/avatars/farcaster.jpg',
    categories: ['Social', 'Web3'],
    funding: '150M',
    stage: 'Series A',
    contacts: 5,
    bestPath: {
      name: 'Dan Romero',
      title: 'Co-founder & CEO',
      label: 'Mutual Follow',
      color: 'amber',
      initials: 'DR',
      avatarUrl: '/avatars/dan-romero.png',
    },
    otherPaths: [
      { name: 'Varun Srinivasan', via: 'Protocol Guild', color: 'purple' },
      { name: 'Cassie Heart', via: 'Via Lisa', color: 'blue' },
    ],
  },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// X icon for close button
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Chevron icon
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

// Users icon
const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

function CompanyRow({
  company,
  index,
  showPath,
  isSelected,
  onClick,
}: {
  company: Company
  index: number
  showPath: boolean
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.06, duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "grid grid-cols-[1fr_90px_70px_60px_130px_24px] md:grid-cols-[1fr_140px_90px_80px_155px_32px] items-center h-[60px] md:h-[68px] px-3 md:px-5 cursor-pointer transition-all border-b border-gray-800/50 last:border-b-0",
        isSelected
          ? "bg-purple-500/10 border-l-2 border-l-purple-500"
          : "hover:bg-white/[0.02] border-l-2 border-l-transparent"
      )}
    >
      {/* Company */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {company.avatarUrl ? (
          <img
            src={company.avatarUrl}
            alt={company.name}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-400 shrink-0">
            {company.name.substring(0, 2).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-semibold text-white text-xs md:text-sm truncate">{company.name}</div>
          <div className="text-[10px] md:text-xs text-gray-500 truncate">{company.description}</div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1 overflow-hidden">
        {company.categories.slice(0, 2).map((cat, i) => (
          <span key={i} className="text-[9px] md:text-[11px] px-1.5 md:px-2 py-0.5 rounded bg-gray-800 text-gray-400 truncate">
            {cat}
          </span>
        ))}
      </div>

      {/* Funding */}
      <div className="text-xs md:text-sm text-gray-300">
        <span className="text-emerald-400">$</span>{company.funding}
      </div>

      {/* Coverage */}
      <div className="flex items-center gap-1 text-xs md:text-sm text-gray-400">
        <UsersIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
        {company.contacts}
      </div>

      {/* Best Path */}
      <div className="flex items-center h-[40px] md:h-[44px]">
        <AnimatePresence mode="wait">
          {showPath ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "w-full max-w-[130px] md:max-w-[155px] h-[40px] md:h-[44px] flex items-center gap-2 md:gap-2.5 px-2 md:px-3 rounded-lg",
                company.bestPath.color === 'emerald' && "bg-emerald-500/20 border border-emerald-500/30",
                company.bestPath.color === 'blue' && "bg-blue-500/20 border border-blue-500/30",
                company.bestPath.color === 'purple' && "bg-purple-500/20 border border-purple-500/30",
                company.bestPath.color === 'amber' && "bg-amber-500/20 border border-amber-500/30",
              )}
            >
              <div className={cn(
                "w-6 h-6 md:w-7 md:h-7 rounded-full shrink-0 overflow-hidden",
                company.bestPath.color === 'emerald' && "ring-2 ring-emerald-500/50",
                company.bestPath.color === 'blue' && "ring-2 ring-blue-500/50",
                company.bestPath.color === 'purple' && "ring-2 ring-purple-500/50",
                company.bestPath.color === 'amber' && "ring-2 ring-amber-500/50",
              )}>
                {company.bestPath.avatarUrl ? (
                  <img
                    src={company.bestPath.avatarUrl}
                    alt={company.bestPath.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={cn(
                    "w-full h-full flex items-center justify-center text-[9px] md:text-[10px] font-bold",
                    company.bestPath.color === 'emerald' && "bg-emerald-500/40 text-emerald-200",
                    company.bestPath.color === 'blue' && "bg-blue-500/40 text-blue-200",
                    company.bestPath.color === 'purple' && "bg-purple-500/40 text-purple-200",
                    company.bestPath.color === 'amber' && "bg-amber-500/40 text-amber-200",
                  )}>
                    {company.bestPath.initials}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] md:text-[13px] font-semibold text-white leading-tight truncate">
                  {company.bestPath.name}
                </span>
                <span className={cn(
                  "text-[9px] md:text-[10px] leading-tight",
                  company.bestPath.color === 'emerald' && "text-emerald-400",
                  company.bestPath.color === 'blue' && "text-blue-400",
                  company.bestPath.color === 'purple' && "text-purple-400",
                  company.bestPath.color === 'amber' && "text-amber-400",
                )}>
                  {company.bestPath.label}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="h-[44px] flex items-center text-sm text-gray-600">—</div>
          )}
        </AnimatePresence>
      </div>

      <ChevronRight className={cn(
        "w-4 h-4 transition-colors justify-self-end",
        isSelected ? "text-purple-400" : "text-gray-700"
      )} />
    </motion.div>
  )
}

// Detail sidebar
function DetailSidebar({
  company,
  onClose,
}: {
  company: Company | null
  onClose: () => void
}) {
  if (!company) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute right-0 top-0 bottom-0 w-[220px] md:w-[260px] bg-[#0D0D0D] border-l border-gray-800 flex flex-col shadow-2xl z-10"
    >
      <div className="p-3 md:p-4 border-b border-gray-800">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {company.avatarUrl ? (
              <img
                src={company.avatarUrl}
                alt={company.name}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-300">
                {company.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-white text-xs md:text-sm">{company.name}</div>
              <div className="text-[9px] md:text-[10px] text-gray-500">{company.stage} · ${company.funding}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center hover:bg-gray-800 text-gray-500 cursor-pointer"
          >
            <XIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-3 md:p-4 border-b border-gray-800">
        <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 mb-2">Your Best Path</div>
        <div className={cn(
          "p-2.5 md:p-3 rounded-xl border",
          company.bestPath.color === 'emerald' && "bg-emerald-500/10 border-emerald-500/20",
          company.bestPath.color === 'blue' && "bg-blue-500/10 border-blue-500/20",
          company.bestPath.color === 'purple' && "bg-purple-500/10 border-purple-500/20",
          company.bestPath.color === 'amber' && "bg-amber-500/10 border-amber-500/20",
        )}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 overflow-hidden",
              company.bestPath.color === 'emerald' && "ring-2 ring-emerald-500/50",
              company.bestPath.color === 'blue' && "ring-2 ring-blue-500/50",
              company.bestPath.color === 'purple' && "ring-2 ring-purple-500/50",
              company.bestPath.color === 'amber' && "ring-2 ring-amber-500/50",
            )}>
              {company.bestPath.avatarUrl ? (
                <img
                  src={company.bestPath.avatarUrl}
                  alt={company.bestPath.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center text-[10px] md:text-xs font-bold",
                  company.bestPath.color === 'emerald' && "bg-emerald-500/30 text-emerald-300",
                  company.bestPath.color === 'blue' && "bg-blue-500/30 text-blue-300",
                  company.bestPath.color === 'purple' && "bg-purple-500/30 text-purple-300",
                  company.bestPath.color === 'amber' && "bg-amber-500/30 text-amber-300",
                )}>
                  {company.bestPath.initials}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs md:text-sm font-medium text-white">{company.bestPath.name}</div>
              <div className="text-[9px] md:text-[10px] text-gray-400">{company.bestPath.title}</div>
              <div className={cn(
                "text-[9px] md:text-[10px] mt-0.5",
                company.bestPath.color === 'emerald' && "text-emerald-400",
                company.bestPath.color === 'blue' && "text-blue-400",
                company.bestPath.color === 'purple' && "text-purple-400",
                company.bestPath.color === 'amber' && "text-amber-400",
              )}>
                {company.bestPath.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {company.otherPaths.length > 0 && (
        <div className="p-3 md:p-4 flex-1 overflow-auto">
          <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 mb-2">
            Other Paths ({company.otherPaths.length})
          </div>
          <div className="space-y-1.5 md:space-y-2">
            {company.otherPaths.map((path, i) => (
              <div key={i} className={cn(
                "flex items-center gap-2 py-1.5 md:py-2 px-2 rounded-lg transition-all",
                path.color === 'emerald' && "bg-emerald-500/10 border border-emerald-500/20",
                path.color === 'blue' && "bg-blue-500/10 border border-blue-500/20",
                path.color === 'purple' && "bg-purple-500/10 border border-purple-500/20",
                path.color === 'amber' && "bg-amber-500/10 border border-amber-500/20",
                !path.color && "bg-gray-800/30 border border-gray-700/50"
              )}>
                <div className={cn(
                  "w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[8px] md:text-[9px] font-medium shrink-0",
                  path.color === 'emerald' && "bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/50",
                  path.color === 'blue' && "bg-blue-500/30 text-blue-300 ring-1 ring-blue-500/50",
                  path.color === 'purple' && "bg-purple-500/30 text-purple-300 ring-1 ring-purple-500/50",
                  path.color === 'amber' && "bg-amber-500/30 text-amber-300 ring-1 ring-amber-500/50",
                  !path.color && "bg-gray-800 text-gray-400"
                )}>
                  {path.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] md:text-xs text-gray-300 truncate">{path.name}</div>
                  <div className={cn(
                    "text-[9px] md:text-[10px] truncate",
                    path.color === 'emerald' && "text-emerald-400",
                    path.color === 'blue' && "text-blue-400",
                    path.color === 'purple' && "text-purple-400",
                    path.color === 'amber' && "text-amber-400",
                    !path.color && "text-gray-500"
                  )}>{path.via}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export function TargetListDemo() {
  const [revealedPaths, setRevealedPaths] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  // Start reveal sequence
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsRevealing(true)
    }, 800)
    return () => clearTimeout(startTimer)
  }, [])

  // Reveal paths one by one
  useEffect(() => {
    if (!isRevealing) return
    if (revealedPaths < companies.length) {
      const timer = setTimeout(() => {
        setRevealedPaths(prev => prev + 1)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [isRevealing, revealedPaths])

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative bg-[#0A0A0A] rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col">
          {/* Browser header */}
          <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-[#111] border-b border-gray-800">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-3 md:px-4 py-1 md:py-1.5 bg-gray-900 rounded-md text-[10px] md:text-xs text-gray-500 border border-gray-800">
                app.lockin.bot/lists/q4-targets
              </div>
            </div>
          </div>

          {/* List header */}
          <div className="px-3 md:px-5 py-3 md:py-4 border-b border-gray-800 bg-[#0D0D0D]">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-gray-800 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="font-semibold text-white text-sm md:text-base">Q4 Target Accounts</span>
                  <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    72% coverage
                  </span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-0.5">Infrastructure & DeFi protocols</div>
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_90px_70px_60px_130px_24px] md:grid-cols-[1fr_140px_90px_80px_155px_32px] items-center py-2 md:py-2.5 px-3 md:px-5 bg-[#0D0D0D] border-b border-gray-800 text-[9px] md:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            <div>Company</div>
            <div>Categories</div>
            <div>Funding</div>
            <div>Coverage</div>
            <div>Best Path</div>
            <div></div>
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-hidden">
            {companies.map((company, index) => (
              <CompanyRow
                key={company.id}
                company={company}
                index={index}
                showPath={index < revealedPaths}
                isSelected={selectedCompany?.id === company.id}
                onClick={() => setSelectedCompany(
                  selectedCompany?.id === company.id ? null : company
                )}
              />
            ))}
          </div>

          {/* Counter bar */}
          <div className="px-3 md:px-5 py-2.5 md:py-3 bg-[#0D0D0D] border-t border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-gray-400">
                <span className="text-purple-400 font-semibold">{revealedPaths}</span> / {companies.length} warm paths discovered
              </span>
            </div>
            {revealedPaths === companies.length && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] md:text-sm text-gray-500"
              >
                Click a row to explore →
              </motion.span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedCompany && (
            <DetailSidebar
              company={selectedCompany}
              onClose={() => setSelectedCompany(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
