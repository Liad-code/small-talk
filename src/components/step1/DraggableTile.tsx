'use client'
import { useRef, useState, useCallback } from 'react'

interface Props {
  id: string                    // unique tile id
  label: string                 // text to display (single letter)
  color?: string                // Tailwind bg class e.g. 'bg-red-200'
  borderColor?: string          // Tailwind border class
  textColor?: string            // Tailwind text class
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean            // already placed / locked
  className?: string
  onDropped?: (tileId: string, targetEl: Element) => boolean  // return true if accepted
}

const SIZE = {
  sm: { outer: 'w-12 h-12 text-xl', font: 'text-xl' },
  md: { outer: 'w-16 h-16 text-3xl', font: 'text-3xl' },
  lg: { outer: 'w-20 h-20 text-4xl', font: 'text-4xl' },
}

export function DraggableTile({
  id,
  label,
  color = 'bg-yellow-100',
  borderColor = 'border-yellow-400',
  textColor = 'text-yellow-700',
  size = 'md',
  disabled = false,
  className = '',
  onDropped,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const startClient = useRef({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [rejected, setRejected] = useState(false)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startClient.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    setOffset({ x: 0, y: 0 })
  }, [disabled])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setOffset({
      x: e.clientX - startClient.current.x,
      y: e.clientY - startClient.current.y,
    })
  }, [dragging])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)

    // Primary: bounding-rect intersection (robust — works when tile > target)
    let target: Element | null = null
    if (ref.current) {
      const tileRect = ref.current.getBoundingClientRect()
      let bestOverlap = 0
      document.querySelectorAll<Element>('[data-drop-target]').forEach(el => {
        const tr = el.getBoundingClientRect()
        const ox = Math.min(tileRect.right, tr.right) - Math.max(tileRect.left, tr.left)
        const oy = Math.min(tileRect.bottom, tr.bottom) - Math.max(tileRect.top, tr.top)
        if (ox > 0 && oy > 0) {
          const overlap = ox * oy
          if (overlap > bestOverlap) { bestOverlap = overlap; target = el }
        }
      })
    }

    // Fallback: pointer-position detection
    if (!target) {
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      target = elements.find(el => el.hasAttribute('data-drop-target')) ?? null
    }

    if (target && onDropped) {
      const accepted = onDropped(id, target)
      if (!accepted) {
        // snap back with rejection animation
        setRejected(true)
        setOffset({ x: 0, y: 0 })
        setTimeout(() => setRejected(false), 400)
      }
      // if accepted, parent handles hiding/locking this tile
    } else {
      setOffset({ x: 0, y: 0 })
    }
  }, [dragging, id, onDropped])

  const s = SIZE[size]

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      data-tile-id={id}
      style={{
        transform: dragging
          ? `translate(${offset.x}px, ${offset.y}px) scale(1.12) rotate(3deg)`
          : `translate(${offset.x}px, ${offset.y}px) scale(1)`,
        transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: dragging ? 999 : 'auto',
        touchAction: 'none',
        userSelect: 'none',
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
      }}
      className={`
        ${s.outer}
        ${color} border-4 ${borderColor}
        rounded-2xl flex items-center justify-center font-display font-black ${s.font} ${textColor}
        shadow-md select-none
        ${dragging ? 'dragging shadow-xl' : ''}
        ${rejected ? 'shake' : ''}
        ${className}
      `}
      aria-label={`Letter ${label}`}
    >
      {label}
    </div>
  )
}
