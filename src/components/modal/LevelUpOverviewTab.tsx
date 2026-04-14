import { useState } from 'react'
import type { LevelUpDraft, DerivedStats } from '../../hooks/useLevelUpDraft'
import type { DraftAction } from '../../hooks/useLevelUpDraft'

const ASI_LEVELS = new Set([4, 8, 12, 16, 19])

interface Props {
  draft: LevelUpDraft
  derivedStats: DerivedStats
  dispatch: React.Dispatch<DraftAction>
}

function NumericInput({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-txt-muted uppercase tracking-wider">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value)
          if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)))
        }}
        className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1.5 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
      />
    </div>
  )
}

export function LevelUpOverviewTab({ draft, derivedStats, dispatch }: Props) {
  const totalLvl = draft.classes.reduce((s, c) => s + c.level, 0)
  const hasASI = ASI_LEVELS.has(totalLvl)
  const [newClassName, setNewClassName] = useState('')

  const addNewClass = () => {
    const name = newClassName.trim()
    if (!name) return
    if (draft.classes.some((c) => c.name.toLowerCase() === name.toLowerCase())) return
    dispatch({ type: 'ADD_CLASS', payload: { name, level: 1 } })
    setNewClassName('')
  }

  return (
    <div className="space-y-6">
      {/* Class levels */}
      <section>
        <h3 className="text-xs text-txt-muted uppercase tracking-wider mb-3">Class Levels</h3>
        <div className="space-y-2">
          {draft.classes.map((cls, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-sm text-txt-primary w-32 font-display">{cls.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_CLASS_LEVEL', payload: { index: i, level: Math.max(1, cls.level - 1) } })
                  }
                  className="w-7 h-7 flex items-center justify-center rounded bg-sheet-elevated border border-sheet-border text-txt-secondary hover:text-dnd-gold hover:border-dnd-gold/50 transition-colors text-sm"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold text-txt-primary">{cls.level}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_CLASS_LEVEL', payload: { index: i, level: Math.min(20, cls.level + 1) } })
                  }
                  className="w-7 h-7 flex items-center justify-center rounded bg-sheet-elevated border border-sheet-border text-txt-secondary hover:text-dnd-gold hover:border-dnd-gold/50 transition-colors text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-txt-muted">Level {cls.level}</span>
              {draft.classes.length > 1 && (
                <button
                  onClick={() => dispatch({ type: 'REMOVE_CLASS', payload: { index: i } })}
                  className="ml-auto px-2 py-0.5 rounded text-xs text-dnd-red border border-dnd-red/30 hover:bg-dnd-red/10 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Add new class for multiclassing */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNewClass()}
              placeholder="New class name…"
              className="flex-1 bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-dnd-gold/60"
            />
            <button
              onClick={addNewClass}
              disabled={!newClassName.trim()}
              className="px-3 py-1 rounded bg-dnd-gold/20 border border-dnd-gold/40 text-dnd-gold text-xs hover:bg-dnd-gold/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Multiclass
            </button>
          </div>
        </div>
      </section>

      {/* Derived stats preview */}
      <section>
        <h3 className="text-xs text-txt-muted uppercase tracking-wider mb-3">Derived Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-sheet-elevated rounded p-3 text-center border border-sheet-border">
            <div className="text-lg font-bold text-dnd-gold">+{derivedStats.proficiencyBonus}</div>
            <div className="text-xs text-txt-muted mt-0.5">Proficiency</div>
          </div>
          <div className="bg-sheet-elevated rounded p-3 text-center border border-sheet-border">
            <div className="text-lg font-bold text-dnd-gold">{derivedStats.focusPointsMax}</div>
            <div className="text-xs text-txt-muted mt-0.5">Focus Points</div>
          </div>
          <div className="bg-sheet-elevated rounded p-3 text-center border border-sheet-border">
            <div className="text-lg font-bold text-dnd-gold">d{derivedStats.martialArtsDie}</div>
            <div className="text-xs text-txt-muted mt-0.5">Martial Arts</div>
          </div>
        </div>
        {hasASI && (
          <div className="mt-3 px-3 py-2 rounded bg-dnd-gold/10 border border-dnd-gold/30 text-xs text-dnd-gold">
            Level {totalLvl}: Ability Score Improvement available — edit in the <strong>Ability Scores</strong> tab.
          </div>
        )}
      </section>

      {/* Combat base stats */}
      <section>
        <h3 className="text-xs text-txt-muted uppercase tracking-wider mb-3">Combat Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <NumericInput
            label="Max HP"
            value={draft.hitPoints.max}
            min={1}
            max={999}
            onChange={(v) => dispatch({ type: 'SET_MAX_HP', payload: v })}
          />
          <NumericInput
            label="Armor Class"
            value={draft.armorClass}
            min={1}
            max={99}
            onChange={(v) => dispatch({ type: 'SET_AC', payload: v })}
          />
          <NumericInput
            label="Speed (ft)"
            value={draft.speed}
            min={0}
            max={999}
            onChange={(v) => dispatch({ type: 'SET_SPEED', payload: v })}
          />
        </div>
      </section>
    </div>
  )
}
