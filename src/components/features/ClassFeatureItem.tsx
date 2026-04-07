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

export function ClassFeatureItem({ feature }: ClassFeatureItemProps) {
  const { dispatch } = useCharacter()
  const hasUses = feature.usesMax !== null && feature.usesRemaining !== null
  const isExhausted = hasUses && feature.usesRemaining === 0

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
