import { useCharacter } from '../../context/CharacterContext'
import type { ClassFeature } from '../../types/character'

interface ClassFeatureItemProps {
  feature: ClassFeature
}

const resetColors = {
  short: 'text-blue-400',
  long: 'text-purple-400',
  none: 'text-txt-muted',
}

const sourceBadge: Record<string, { label: string; cls: string }> = {
  class:  { label: 'Class',   cls: 'bg-dnd-gold/15 text-dnd-gold border-dnd-gold/30' },
  origin: { label: 'Origin',  cls: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  racial: { label: 'Racial',  cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  feat:   { label: 'Feat',    cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  other:  { label: 'Other',   cls: 'bg-sheet-border/30 text-txt-muted border-sheet-border' },
}

const resourceLabel: Record<string, string> = {
  ki: 'FP',
  'spell-slot': 'Slot',
  custom: 'Resource',
}

export function ClassFeatureItem({ feature }: ClassFeatureItemProps) {
  const { dispatch } = useCharacter()
  const hasUses = feature.usesMax !== null && feature.usesRemaining !== null
  const isExhausted = hasUses && feature.usesRemaining === 0

  const badge = feature.source ? sourceBadge[feature.source] : null
  const showResource =
    feature.resourceType && feature.resourceType !== 'none' && feature.resourceCost

  return (
    <div
      className={`rounded border p-2 transition-all ${
        isExhausted
          ? 'border-sheet-border bg-sheet-bg opacity-60'
          : 'border-sheet-border bg-sheet-surface'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-semibold ${isExhausted ? 'line-through text-txt-muted' : 'text-txt-primary'}`}
            >
              {feature.name}
            </span>

            {/* Source badge */}
            {badge && (
              <span className={`text-xs px-1.5 py-0.5 rounded border ${badge.cls}`}>
                {feature.sourceLabel ? feature.sourceLabel : badge.label}
              </span>
            )}

            {/* Resource cost pill */}
            {showResource && (
              <span className="text-xs px-1.5 py-0.5 rounded border bg-orange-500/10 text-orange-400 border-orange-500/30">
                {feature.resourceCost} {resourceLabel[feature.resourceType!] ?? 'Resource'}
              </span>
            )}

            {feature.resetsOn !== 'none' && (
              <span className={`text-xs ${resetColors[feature.resetsOn]}`}>
                {feature.resetsOn === 'short' ? 'Short Rest' : 'Long Rest'}
              </span>
            )}
          </div>
          <p className="text-xs text-txt-muted mt-1 leading-relaxed">{feature.description}</p>
        </div>

        {/* Uses tracker */}
        {hasUses && (
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="flex gap-1">
              {Array.from({ length: feature.usesMax! }).map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    i < feature.usesRemaining!
                      ? dispatch({ type: 'USE_FEATURE', payload: { id: feature.id } })
                      : null
                  }
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    i < feature.usesRemaining!
                      ? 'bg-dnd-gold border-dnd-gold'
                      : 'bg-transparent border-txt-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-txt-muted">
              {feature.usesRemaining}/{feature.usesMax}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
