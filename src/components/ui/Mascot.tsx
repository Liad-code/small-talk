interface MascotProps {
  className?: string
  size?: number
}

/** Bubo — the Small Talk owl mascot. Inline SVG, no external files. */
export function Mascot({ className = '', size = 120 }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Body ── */}
      <ellipse cx="60" cy="95" rx="36" ry="30" fill="#FBBF24" />
      {/* Tummy */}
      <ellipse cx="60" cy="100" rx="20" ry="20" fill="#FEF3C7" />

      {/* ── Head ── */}
      <circle cx="60" cy="52" r="34" fill="#FBBF24" />

      {/* ── Ear tufts ── */}
      <path d="M 36 24 Q 28 6 42 15 L 39 27 Z" fill="#F59E0B" />
      <path d="M 84 24 Q 92 6 78 15 L 81 27 Z" fill="#F59E0B" />

      {/* ── Eye whites ── */}
      <circle cx="43" cy="50" r="15" fill="white" />
      <circle cx="77" cy="50" r="15" fill="white" />

      {/* ── Pupils ── */}
      <circle cx="44" cy="51" r="9" fill="#312E81" />
      <circle cx="78" cy="51" r="9" fill="#312E81" />

      {/* ── Eye shine ── */}
      <circle cx="48" cy="47" r="3.5" fill="white" />
      <circle cx="82" cy="47" r="3.5" fill="white" />

      {/* ── Beak ── */}
      <path d="M 52 62 L 60 74 L 68 62 Z" fill="#FB923C" />

      {/* ── Graduation cap — flat board ── */}
      <rect x="30" y="19" width="60" height="7" rx="3" fill="#1E1B4B" />
      {/* Cap crown */}
      <polygon points="60,9 30,19 90,19" fill="#312E81" />
      {/* Tassel string */}
      <line x1="90" y1="19" x2="99" y2="29" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tassel bob */}
      <circle cx="99" cy="33" r="5" fill="#FDE047" />

      {/* ── Wings ── */}
      <ellipse
        cx="26" cy="98"
        rx="13" ry="20"
        fill="#F59E0B"
        transform="rotate(-18 26 98)"
      />
      <ellipse
        cx="94" cy="98"
        rx="13" ry="20"
        fill="#F59E0B"
        transform="rotate(18 94 98)"
      />

      {/* ── Feet ── */}
      <path d="M 44 124 Q 38 132 33 129 Q 37 124 42 122" fill="#FB923C" />
      <path d="M 51 126 Q 48 134 43 133 Q 46 128 49 124" fill="#FB923C" />
      <path d="M 69 126 Q 72 134 77 133 Q 74 128 71 124" fill="#FB923C" />
      <path d="M 76 124 Q 82 132 87 129 Q 83 124 78 122" fill="#FB923C" />
    </svg>
  )
}
