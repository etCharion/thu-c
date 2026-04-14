import { abilityModifier, formatModifier } from '../../lib/dnd5e'

interface AbilityScoreBoxProps {
  label: string
  score: number
}

export function AbilityScoreBox({ label, score }: AbilityScoreBoxProps) {
  const mod = abilityModifier(score)

  return (
    // Hardcoded dark navy – stands out as accent on the light page, exactly like DnDB
    <div className="flex flex-col items-center bg-dnd-navy rounded overflow-hidden shadow-ability">
      {/* Crimson header bar */}
      <div className="w-full bg-dnd-crimson py-1 text-center">
        <span className="font-display text-[10px] font-bold tracking-widest uppercase text-white/90">
          {label}
        </span>
      </div>

      {/* Large modifier – white on dark */}
      <div className="flex items-center justify-center py-3">
        <span className="font-display text-3xl font-bold text-white leading-none">
          {formatModifier(mod)}
        </span>
      </div>

      {/* Raw score in oval */}
      <div className="mb-2.5">
        <div className="bg-dnd-navy-mid border border-white/20 rounded-full w-9 h-[1.4rem] flex items-center justify-center">
          <span className="text-[11px] font-bold text-white/70 tabular-nums">{score}</span>
        </div>
      </div>
    </div>
  )
}
