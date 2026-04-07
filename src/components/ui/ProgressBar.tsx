'use client'
interface Props {
  value: number   // 0-100
  color?: string  // Tailwind bg class
  label?: string
  showPercent?: boolean
}

export function ProgressBar({
  value,
  color = 'bg-primary',
  label,
  showPercent = true,
}: Props) {
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-1 text-sm font-bold text-gray-500">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(value)}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full rounded-full progress-fill ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
