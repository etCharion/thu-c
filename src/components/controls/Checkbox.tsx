interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  color?: 'green' | 'gold' | 'red'
  className?: string
}

export function Checkbox({ checked, onChange, label, color = 'green', className = '' }: CheckboxProps) {
  const colors = {
    green: 'border-dnd-green bg-dnd-green',
    gold: 'border-dnd-gold bg-dnd-gold',
    red: 'border-dnd-red bg-dnd-red',
  }

  return (
    <label className={`flex items-center gap-1.5 cursor-pointer group ${className}`}>
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
          checked ? colors[color] : 'border-txt-muted bg-transparent'
        } group-hover:border-opacity-80`}
      />
      {label && (
        <span className="text-xs text-txt-secondary group-hover:text-txt-primary transition-colors">
          {label}
        </span>
      )}
    </label>
  )
}
