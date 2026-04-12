import type { LevelUpDraft } from '../../hooks/useLevelUpDraft'
import type { AbilityScores } from '../../types/character'
import { abilityModifier, formatModifier } from '../../lib/dnd5e'
import type { DraftAction } from '../../hooks/useLevelUpDraft'

const ABILITIES: { key: keyof AbilityScores; label: string }[] = [
  { key: 'str', label: 'Strength' },
  { key: 'dex', label: 'Dexterity' },
  { key: 'con', label: 'Constitution' },
  { key: 'int', label: 'Intelligence' },
  { key: 'wis', label: 'Wisdom' },
  { key: 'cha', label: 'Charisma' },
]

interface Props {
  draft: LevelUpDraft
  originalScores: AbilityScores
  dispatch: React.Dispatch<DraftAction>
}

export function LevelUpAbilityScoresTab({ draft, originalScores, dispatch }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-txt-muted">
        Edit ability scores directly. Use the Ability Score Improvement banner in the Overview tab to check ASI eligibility.
      </p>

      <div className="space-y-2">
        {ABILITIES.map(({ key, label }) => {
          const oldVal = originalScores[key]
          const newVal = draft.abilityScores[key]
          const mod = abilityModifier(newVal)
          const changed = newVal !== oldVal
          return (
            <div key={key} className="flex items-center gap-3 py-2 border-b border-sheet-border last:border-0">
              <span className="w-28 text-sm text-txt-secondary">{label}</span>
              <span className="w-10 text-xs text-txt-muted text-center">{oldVal} →</span>
              <input
                type="number"
                min={1}
                max={30}
                value={newVal}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  if (!isNaN(v))
                    dispatch({
                      type: 'SET_ABILITY_SCORE',
                      payload: { ability: key, value: Math.max(1, Math.min(30, v)) },
                    })
                }}
                className={`w-16 bg-sheet-bg border rounded px-2 py-1 text-sm text-center text-txt-primary focus:outline-none focus:border-dnd-gold/60 transition-colors ${
                  changed ? 'border-dnd-gold/60 bg-dnd-gold/5' : 'border-sheet-border'
                }`}
              />
              <span
                className={`w-10 text-sm font-bold text-center ${mod >= 0 ? 'text-dnd-green' : 'text-dnd-red'}`}
              >
                {formatModifier(mod)}
              </span>
              {changed && (
                <span className="text-xs text-dnd-gold">
                  {newVal > oldVal ? `+${newVal - oldVal}` : newVal - oldVal}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
