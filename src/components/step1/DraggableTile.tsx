'use client'
import { useRef, useState, useCallback, type ReactNode } from 'react'

interface Props {
  id: string                    // unique tile id
  label: string                 // text to display (single letter)
  children?: ReactNode          // overrides label when provided (e.g. SVG image)
  color?: string                // Tailwind bg class e.g. 'bg-red-200'
  borderColor?: string          // Tailwind border class
  textColor?: string            // Tailwind text class
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean            // already placed / locked
  className?: string
  noSnapBack?: boolean          // on wrong drop, stay in place instead of snapping back
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
  children,
  color = 'bg-yellow-100',
  borderColor = 'border-yellow-400',
  textColor = 'text-yellow-700',
  size = 'md',
  disabled = false,
  className = '',
  noSnapBack = false,
  onDropped,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const startClient = useRef({ x: 0, y: 0 })
  const baseOffset = useRef({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [rejected, setRejected] = useState(false)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startClient.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    if (!noSnapBack) {
      setOffset({ x: 0, y: 0 })
      baseOffset.current = { x: 0, y: 0 }
    }
    // noSnapBack: keep current baseOffset so tile starts from its last position
  }, [disabled, noSnapBack])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setOffset({
      x: baseOffset.current.x + (e.clientX - startClient.current.x),
      y: baseOffset.current.y + (e.clientY - startClient.current.y),
    })
  }, [dragging])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)

    const dx = e.clientX - startClient.current.x
    const dy = e.clientY - startClient.current.y
    const finalOffset = { x: baseOffset.current.x + dx, y: baseOffset.current.y + dy }

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
      if (accepted) {
        baseOffset.current = { x: 0, y: 0 }
        // parent handles hiding/locking this tile
      } else if (noSnapBack) {
        // Stay in place — tile remains where user dropped it
        baseOffset.current = finalOffset
        setOffset(finalOffset)
        setRejected(true)
        setTimeout(() => setRejected(false), 400)
      } else {
        // Classic snap back
        setRejected(true)
        setOffset({ x: 0, y: 0 })
        baseOffset.current = { x: 0, y: 0 }
        setTimeout(() => setRejected(false), 400)
      }
    } else {
      if (noSnapBack) {
        // Dropped on empty space — stay there
        baseOffset.current = finalOffset
        setOffset(finalOffset)
      } else {
        setOffset({ x: 0, y: 0 })
        baseOffset.current = { x: 0, y: 0 }
      }
    }
  }, [dragging, id, onDropped, noSnapBack])

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
      {children ?? label}
    </div>
  )
}
