'use client'
interface Props {
  stars: number     // 0-3
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }

export function StarRating({ stars, size = 'md', animate }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`${sizes[size]} ${i <= stars ? '' : 'grayscale opacity-30'} ${animate && i <= stars ? 'star-animate' : ''}`}
          style={animate && i <= stars ? { animationDelay: `${(i - 1) * 150}ms` } : {}}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}
