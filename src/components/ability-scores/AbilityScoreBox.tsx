import { abilityModifier, formatModifier } from '../../lib/dnd5e'

interface AbilityScoreBoxProps {
  label: string
  score: number
}

export function AbilityScoreBox({ label, score }: AbilityScoreBoxProps) {
  const mod = abilityModifier(score)

  return (
    <div className="flex flex-col items-center bg-sheet-surface border border-sheet-border rounded overflow-hidden shadow-ability">
      {/* Red header bar – DnDB style */}
      <div className="w-full bg-dnd-crimson py-1 text-center">
        <span className="font-display text-[10px] font-bold tracking-widest uppercase text-white/90">
          {label}
        </span>
      </div>

      {/* Large modifier */}
      <div className="flex items-center justify-center py-3">
        <span className="font-display text-3xl font-bold text-txt-primary leading-none">
          {formatModifier(mod)}
        </span>
      </div>

      {/* Raw score in oval */}
      <div className="mb-2.5">
        <div className="bg-sheet-bg border-2 border-sheet-border rounded-full w-9 h-[1.4rem] flex items-center justify-center">
          <span className="text-[11px] font-bold text-txt-secondary tabular-nums">{score}</span>
        </div>
      </div>
    </div>
  )
}
