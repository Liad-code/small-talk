export function LockBadge() {
  return (
    <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center gap-2 z-10">
      <span className="text-4xl">🔒</span>
      <p className="font-bold text-gray-500 text-sm text-center px-4">
        Complete the previous level first!
      </p>
      <p className="text-xs text-gray-400">צריך לסיים את השלב הקודם</p>
    </div>
  )
}
