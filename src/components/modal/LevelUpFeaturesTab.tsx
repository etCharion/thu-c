import type { ClassFeature, RestType } from '../../types/character'
import type { LevelUpDraft } from '../../hooks/useLevelUpDraft'
import type { DraftAction } from '../../hooks/useLevelUpDraft'

interface FeatureRowProps {
  feature: ClassFeature
  index: number
  total: number
  dispatch: React.Dispatch<DraftAction>
}

function FeatureRow({ feature, index, total, dispatch }: FeatureRowProps) {
  const update = (patch: Partial<ClassFeature>) =>
    dispatch({ type: 'UPDATE_FEATURE', payload: { index, feature: { ...feature, ...patch } } })

  const isUnlimited = feature.usesMax === null

  return (
    <div className="border border-sheet-border rounded-lg bg-sheet-elevated p-3 space-y-3">
      {/* Header row */}
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => dispatch({ type: 'MOVE_FEATURE', payload: { from: index, to: index - 1 } })}
            disabled={index === 0}
            className="text-txt-muted hover:text-txt-secondary disabled:opacity-20 text-xs leading-none"
          >
            ▲
          </button>
          <button
            onClick={() => dispatch({ type: 'MOVE_FEATURE', payload: { from: index, to: index + 1 } })}
            disabled={index === total - 1}
            className="text-txt-muted hover:text-txt-secondary disabled:opacity-20 text-xs leading-none"
          >
            ▼
          </button>
        </div>
        <input
          type="text"
          value={feature.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Feature name"
          className="flex-1 bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm font-display text-txt-primary focus:outline-none focus:border-dnd-gold/60"
        />
        <button
          onClick={() => dispatch({ type: 'REMOVE_FEATURE', payload: { index } })}
          className="px-2 py-1 rounded text-xs text-dnd-red border border-dnd-red/30 hover:bg-dnd-red/10 transition-colors"
        >
          Remove
        </button>
      </div>

      {/* Description */}
      <textarea
        value={feature.description}
        onChange={(e) => update({ description: e.target.value })}
        placeholder="Feature description…"
        rows={3}
        className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1.5 text-xs text-txt-secondary focus:outline-none focus:border-dnd-gold/60 resize-y"
      />

      {/* Uses + reset */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-1.5 text-txt-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={isUnlimited}
            onChange={(e) =>
              update({ usesMax: e.target.checked ? null : 1, usesRemaining: e.target.checked ? null : 1 })
            }
            className="accent-dnd-gold"
          />
          Unlimited uses
        </label>

        {!isUnlimited && (
          <div className="flex items-center gap-1.5">
            <span className="text-txt-muted">Max uses:</span>
            <input
              type="number"
              min={1}
              max={99}
              value={feature.usesMax ?? 1}
              onChange={(e) => {
                const v = Math.max(1, parseInt(e.target.value) || 1)
                update({ usesMax: v, usesRemaining: Math.min(feature.usesRemaining ?? v, v) })
              }}
              className="w-14 bg-sheet-bg border border-sheet-border rounded px-2 py-0.5 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
            />
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <span className="text-txt-muted">Resets on:</span>
          <select
            value={feature.resetsOn}
            onChange={(e) => update({ resetsOn: e.target.value as RestType })}
            className="bg-sheet-bg border border-sheet-border rounded px-2 py-0.5 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
          >
            <option value="none">Never</option>
            <option value="short">Short Rest</option>
            <option value="long">Long Rest</option>
          </select>
        </div>
      </div>
    </div>
  )
}

interface Props {
  draft: LevelUpDraft
  dispatch: React.Dispatch<DraftAction>
}

function newFeature(): ClassFeature {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  }
}

export function LevelUpFeaturesTab({ draft, dispatch }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-txt-muted">{draft.classFeatures.length} features</p>
        <button
          onClick={() => dispatch({ type: 'ADD_FEATURE', payload: newFeature() })}
          className="px-3 py-1 rounded bg-dnd-gold/20 border border-dnd-gold/40 text-dnd-gold text-xs hover:bg-dnd-gold/30 transition-colors"
        >
          + Add Feature
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-1">
        {draft.classFeatures.map((feature, i) => (
          <FeatureRow
            key={feature.id}
            feature={feature}
            index={i}
            total={draft.classFeatures.length}
            dispatch={dispatch}
          />
        ))}
        {draft.classFeatures.length === 0 && (
          <p className="text-xs text-txt-muted italic text-center py-8">No features yet. Click "+ Add Feature" to start.</p>
        )}
      </div>
    </div>
  )
}
