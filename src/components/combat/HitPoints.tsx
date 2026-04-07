import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { Counter } from '../controls/Counter'

export function HitPoints() {
  const { character, dispatch } = useCharacter()
  const { current, max, temp } = character.hitPoints
  const pct = Math.max(0, Math.min(100, (current / max) * 100))
  const isLow = pct < 25

  return (
    <SectionCard title="Hit Points">
      <div className="space-y-3">
        {/* HP Bar */}
        <div className="h-3 rounded-full bg-sheet-bg border border-sheet-border overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLow
                ? 'bg-gradient-to-r from-red-900 to-dnd-red animate-pulse'
                : pct < 50
                ? 'bg-gradient-to-r from-yellow-700 to-yellow-500'
                : 'bg-gradient-to-r from-green-900 to-dnd-green'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Current / Max */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-xs text-txt-muted mb-1">Current</div>
            <Counter
              value={current}
              min={0}
              max={max}
              size="lg"
              onChange={(v) => dispatch({ type: 'SET_HP', payload: v })}
            />
          </div>
          <div className="text-center">
            <div className="text-xs text-txt-muted mb-1">Max</div>
            <span className={`font-display text-3xl font-bold ${isLow ? 'text-dnd-red' : 'text-txt-primary'}`}>
              {max}
            </span>
          </div>
          <div className="text-center">
            <div className="text-xs text-txt-muted mb-1">Temp HP</div>
            <Counter
              value={temp}
              min={0}
              size="lg"
              onChange={(v) => dispatch({ type: 'SET_TEMP_HP', payload: v })}
            />
          </div>
        </div>

        {/* Hit Dice */}
        <div className="flex items-center justify-between pt-2 border-t border-sheet-border">
          <div className="text-xs text-txt-muted">
            Hit Dice{' '}
            <span className="text-txt-secondary">
              {character.hitDiceType === 8 ? 'd8' : `d${character.hitDiceType}`}
            </span>
          </div>
          <Counter
            value={character.hitDiceRemaining}
            min={0}
            max={character.hitDiceTotal}
            size="sm"
            onChange={(v) => dispatch({ type: 'SET_HIT_DICE', payload: v })}
          />
          <span className="text-xs text-txt-muted">/ {character.hitDiceTotal}</span>
        </div>
      </div>
    </SectionCard>
  )
}
