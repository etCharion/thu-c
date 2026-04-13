import { useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { Counter } from '../controls/Counter'

export function HitPoints() {
  const { character, dispatch } = useCharacter()
  const { current, max, temp } = character.hitPoints
  const [changeAmt, setChangeAmt] = useState('')
  const amount = Math.max(0, parseInt(changeAmt) || 0)
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

        {/* Bulk heal / damage */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="number"
            min={0}
            value={changeAmt}
            onChange={(e) => setChangeAmt(e.target.value)}
            placeholder="0"
            className="w-16 text-center bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold"
          />
          <button
            onClick={() => { dispatch({ type: 'SET_HP', payload: current + amount }); setChangeAmt('') }}
            disabled={amount === 0}
            className="flex-1 py-1 rounded bg-green-900 hover:bg-green-800 disabled:opacity-40 text-white text-xs font-display"
          >
            + Léčit
          </button>
          <button
            onClick={() => { dispatch({ type: 'SET_HP', payload: current - amount }); setChangeAmt('') }}
            disabled={amount === 0}
            className="flex-1 py-1 rounded bg-red-900 hover:bg-red-800 disabled:opacity-40 text-white text-xs font-display"
          >
            − Zranit
          </button>
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
