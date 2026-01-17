'use client';

import { motion } from 'framer-motion'

// Connection type labels
const CONNECTION_TYPES = [
  { label: "Direct Connect", color: "emerald", nudgeX: -15, nudgeY: 0 },
  { label: "Via Teammate", color: "purple", nudgeX: -30, nudgeY: 0 },
  { label: "Shared Group", color: "blue", nudgeX: -35, nudgeY: 0 },
  { label: "Mutual Follow", color: "gray", nudgeX: 0, nudgeY: -15 },
  { label: "Investor Intro", color: "amber", nudgeX: 0, nudgeY: 0 },
  { label: "Direct Connect", color: "emerald", nudgeX: -20, nudgeY: 0 },
]

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function NetworkGraph() {
  const NODE_COUNT = 24
  const CENTER = 200

  const nodes = Array.from({ length: NODE_COUNT }).map((_, i) => {
    const seed = (i + 1) * 997
    const random1 = (seed % 1000) / 1000
    const random2 = ((seed * 31) % 1000) / 1000
    const random3 = ((seed * 71) % 1000) / 1000

    const baseAngle = (i / NODE_COUNT) * 360
    const angleJitter = (random1 - 0.5) * 20
    const angle = baseAngle + angleJitter
    const distance = 80 + random2 * 100

    const radians = angle * (Math.PI / 180)
    const x = Math.cos(radians) * distance
    const y = Math.sin(radians) * distance

    const targetIndices = [2, 7, 11, 16, 20, 23]
    const isTarget = targetIndices.includes(i)
    const connectionType = isTarget
      ? CONNECTION_TYPES[targetIndices.indexOf(i) % CONNECTION_TYPES.length]
      : null

    return {
      angle, distance, x, y,
      size: 4 + random3 * 4,
      isTarget, connectionType,
      delay: i * 0.03,
    }
  })

  return (
    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center overflow-visible mx-auto">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        style={{ overflow: 'visible' }}
      >
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={CENTER + node.x}
            y2={CENTER + node.y}
            stroke={node.isTarget ? "rgba(16, 185, 129, 0.6)" : "rgba(147, 51, 234, 0.3)"}
            strokeWidth={node.isTarget ? 1.5 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: node.delay }}
          />
        ))}
      </svg>

      {/* Center node */}
      <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.5)]">
          <span className="text-white font-bold text-base md:text-lg">YOU</span>
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-purple-400"
          />
        </div>
      </div>

      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute z-10"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
          transition={{ duration: 1.5, delay: node.delay, ease: "easeOut" }}
        >
          <div
            className={cn(
              "rounded-full -translate-x-1/2 -translate-y-1/2",
              node.isTarget
                ? "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                : "bg-purple-400/50 shadow-sm"
            )}
            style={{ width: node.size, height: node.size }}
          />

          {node.isTarget && node.connectionType && (() => {
            const magnitude = Math.sqrt(node.x * node.x + node.y * node.y)
            const offsetDistance = 22
            const offsetX = (node.x / magnitude) * offsetDistance + (node.connectionType.nudgeX || 0)
            const offsetY = (node.y / magnitude) * offsetDistance + (node.connectionType.nudgeY || 0)

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + (i * 0.15), duration: 0.4 }}
                className={cn(
                  "absolute px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg text-[10px] md:text-xs font-semibold whitespace-nowrap border shadow-sm",
                  node.connectionType.color === "emerald" && "bg-emerald-950/80 border-emerald-700 text-emerald-300",
                  node.connectionType.color === "purple" && "bg-purple-950/80 border-purple-700 text-purple-300",
                  node.connectionType.color === "blue" && "bg-blue-950/80 border-blue-700 text-blue-300",
                  node.connectionType.color === "gray" && "bg-gray-900/80 border-gray-600 text-gray-300",
                  node.connectionType.color === "amber" && "bg-amber-950/80 border-amber-700 text-amber-300",
                )}
                style={{
                  left: offsetX,
                  top: offsetY,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {node.connectionType.label}
              </motion.div>
            )
          })()}
        </motion.div>
      ))}
    </div>
  )
}
