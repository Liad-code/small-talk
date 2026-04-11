'use client'
import type { CVCWord } from '@/data/step1/cvcWords'

interface Props {
  word: CVCWord
  className?: string
}

/**
 * Renders the emoji for a CVC word.
 * For 'rug', shows an inline SVG carpet instead of the plain emoji.
 * For all other words, renders the emoji in a <span>.
 */
export function WordEmoji({ word, className }: Props) {
  if (word.word === 'rug') {
    return (
      <span
        role="img"
        aria-label="rug"
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          viewBox="0 0 44 28"
          width="1.45em"
          height="0.92em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ verticalAlign: 'middle', display: 'block' }}
        >
          {/* Main rug body */}
          <rect x="0" y="0" width="44" height="28" rx="3" fill="#8B2252" />
          {/* Fringe left */}
          <rect x="0" y="3"  width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="0" y="8"  width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="0" y="13" width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="0" y="18" width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="0" y="23" width="3" height="2" rx="1" fill="#E8C866" />
          {/* Fringe right */}
          <rect x="41" y="3"  width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="41" y="8"  width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="41" y="13" width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="41" y="18" width="3" height="2" rx="1" fill="#E8C866" />
          <rect x="41" y="23" width="3" height="2" rx="1" fill="#E8C866" />
          {/* Outer border stripes */}
          <rect x="3" y="2"  width="38" height="4" rx="1" fill="#A52A52" />
          <rect x="3" y="22" width="38" height="4" rx="1" fill="#A52A52" />
          {/* Center panel */}
          <rect x="6" y="8" width="32" height="12" rx="2" fill="#C0357A" />
          {/* Diamond motif */}
          <path d="M22 10 L26 14 L22 18 L18 14 Z" fill="#E8C866" />
        </svg>
      </span>
    )
  }

  return <span className={className}>{word.emoji}</span>
}
