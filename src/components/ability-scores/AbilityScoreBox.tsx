import { abilityModifier, formatModifier } from '../../lib/dnd5e'

interface AbilityScoreBoxProps {
  label: string
  score: number
}

export function AbilityScoreBox({ label, score }: AbilityScoreBoxProps) {
  const mod = abilityModifier(score)

  return (
    <div className="flex flex-col items-center bg-sheet-bg border border-sheet-border rounded-lg py-2 px-1 gap-1">
      <span className="font-display text-xs font-semibold tracking-widest uppercase text-txt-muted">
        {label}
      </span>
      <span className="font-display text-2xl font-bold text-txt-primary leading-none">{score}</span>
      <div className="bg-sheet-elevated border border-sheet-border rounded-full px-2 py-0.5 min-w-[2rem] text-center">
        <span className="font-bold text-sm text-dnd-gold">{formatModifier(mod)}</span>
      </div>
    </div>
  )
}
