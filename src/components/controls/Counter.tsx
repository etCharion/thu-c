interface CounterProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Counter({ value, min = 0, max = 999, onChange, size = 'md', className = '' }: CounterProps) {
  const btnBase =
    'flex items-center justify-center rounded font-bold text-txt-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
  const sizes = {
    sm: { btn: 'w-5 h-5 text-xs bg-sheet-elevated hover:bg-sheet-border', val: 'text-sm w-6' },
    md: { btn: 'w-7 h-7 text-sm bg-sheet-elevated hover:bg-sheet-border', val: 'text-base w-8' },
    lg: { btn: 'w-9 h-9 text-base bg-sheet-elevated hover:bg-blue-800', val: 'text-xl w-10' },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        className={`${btnBase} ${s.btn}`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        −
      </button>
      <span className={`text-center font-bold text-txt-primary tabular-nums ${s.val}`}>
        {value}
      </span>
      <button
        className={`${btnBase} ${s.btn}`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  )
}
