import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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

const actionTypeBadge: Record<string, { label: string; cls: string }> = {
  'action':       { label: 'Action',       cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  'bonus-action': { label: 'Bonus Action', cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'reaction':     { label: 'Reaction',     cls: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  'passive':      { label: 'Passive',      cls: 'bg-sheet-border/20 text-txt-muted border-sheet-border/40' },
  'special':      { label: 'Special',      cls: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
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
  const actionBadge = feature.actionType ? actionTypeBadge[feature.actionType] : null
  const showResource =
    feature.resourceType && feature.resourceType !== 'none' && feature.resourceCost

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: feature.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded border p-2 transition-all ${
        isExhausted
          ? 'border-sheet-border bg-sheet-bg opacity-60'
          : 'border-sheet-border bg-sheet-surface'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 mt-0.5 text-txt-muted hover:text-txt-secondary cursor-grab active:cursor-grabbing touch-none px-0.5"
          tabIndex={-1}
          aria-label="Drag to reorder"
        >
          ⠿
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-semibold ${isExhausted ? 'line-through text-txt-muted' : 'text-txt-primary'}`}
            >
              {feature.name}
            </span>

            {/* Action type badge */}
            {actionBadge && feature.actionType !== 'passive' && (
              <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${actionBadge.cls}`}>
                {actionBadge.label}
              </span>
            )}

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
                      : dispatch({ type: 'RESTORE_FEATURE', payload: { id: feature.id } })
                  }
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    i < feature.usesRemaining!
                      ? 'bg-dnd-gold border-dnd-gold hover:bg-dnd-gold/70'
                      : 'bg-transparent border-txt-muted hover:border-dnd-gold/50'
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
