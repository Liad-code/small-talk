export function CatBoxIllustration({ id, large = false }: { id: string; large?: boolean }) {
  const cat = large ? 'text-4xl' : 'text-xl'
  const box = large ? 'text-5xl' : 'text-3xl'
  const boxSm = large ? 'text-3xl' : 'text-lg'
  const catSm = large ? 'text-3xl' : 'text-xl'
  switch (id) {
    case 'in':
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center px-2 py-1.5 border-[3px] border-t-0 border-amber-600 rounded-b-lg bg-amber-50" style={{ minWidth: large ? '56px' : '40px' }}>
            <span className={`${cat} leading-none`}>🐱</span>
          </div>
        </div>
      )
    case 'on':
      return (
        <div className="flex flex-col items-center gap-0 leading-none">
          <span className={cat}>🐱</span>
          <span className={`${box} -mt-1`}>📦</span>
        </div>
      )
    case 'under':
      return (
        <div className="flex flex-col items-center gap-0 leading-none">
          <span className={box}>📦</span>
          <span className={`${cat} -mt-1`}>🐱</span>
        </div>
      )
    case 'next-to':
    case 'next to':
      return (
        <div className="flex items-end gap-1 leading-none">
          <span className={cat}>🐱</span>
          <span className={box}>📦</span>
        </div>
      )
    case 'in-front':
    case 'in front of':
      return (
        <div className={`relative ${large ? 'w-20 h-14' : 'w-14 h-10'} flex items-end`}>
          <span className={`${box} leading-none absolute left-0 bottom-0 opacity-60`}>📦</span>
          <span className={`${cat} leading-none absolute left-3 bottom-0 z-10`}>🐱</span>
        </div>
      )
    case 'behind':
      return (
        <div className={`relative ${large ? 'w-20 h-14' : 'w-14 h-10'} flex items-end`}>
          <span className={`${cat} leading-none absolute left-0 bottom-0 z-0 opacity-40`}>🐱</span>
          <span className={`${box} leading-none absolute left-3 bottom-0 z-10`}>📦</span>
        </div>
      )
    case 'between':
      return (
        <div className="flex items-end gap-0.5 leading-none">
          <span className={boxSm}>📦</span>
          <span className={catSm}>🐱</span>
          <span className={boxSm}>📦</span>
        </div>
      )
    default:
      return <span className={`${box} leading-none`}>📦</span>
  }
}
