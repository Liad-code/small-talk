'use client'
import { useState } from 'react'

interface Props {
  id: string                     // unique drop target id
  expectedIds: string[]          // tile ids that are valid drops (e.g. ['A_upper','a_lower'])
  acceptedCount?: number         // how many tiles this target accepts (default = expectedIds.length)
  size?: 'sm' | 'md' | 'lg'
  shape?: 'square' | 'circle' | 'pot'
  color?: string                 // Tailwind bg when empty
  label?: string                 // small label shown inside (e.g. letter name hint)
  className?: string
  children?: React.ReactNode     // content to show when filled
  filled?: boolean               // controlled — show filled state
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

const SIZE = {
  sm: 'w-14 h-14 text-sm',
  md: 'w-20 h-20 text-base',
  lg: 'w-24 h-24 text-lg',
}

export function DropTarget({
  id,
  expectedIds,
  size = 'md',
  shape = 'square',
  color = 'bg-white',
  label,
  className = '',
  children,
  filled = false,
  onPointerEnter,
  onPointerLeave,
}: Props) {
  const [hovered, setHovered] = useState(false)

  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
  const s = SIZE[size]

  return (
    <div
      data-drop-target="true"
      data-expected-ids={JSON.stringify(expectedIds)}
      data-target-id={id}
      onPointerEnter={() => { setHovered(true); onPointerEnter?.() }}
      onPointerLeave={() => { setHovered(false); onPointerLeave?.() }}
      className={`
        ${s}
        ${color} border-4
        ${filled ? 'border-green-400 drop-success' : hovered ? 'border-purple-400 drop-hover' : 'border-dashed border-gray-300'}
        ${radius}
        flex flex-col items-center justify-center gap-1
        transition-all duration-150
        ${className}
      `}
      aria-label={`Drop zone: ${id}`}
    >
      {filled ? children : (
        label ? <span className="text-gray-300 font-bold text-sm">{label}</span> : (
          <span className="text-gray-200 text-2xl">⬇</span>
        )
      )}
    </div>
  )
}
