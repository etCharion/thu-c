import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { Counter } from '../controls/Counter'

export function KiTracker() {
  const { character, dispatch } = useCharacter()
  const { current, max } = character.focusPoints

  return (
    <SectionCard title="Focus Points (Ki)">
      <div className="space-y-3">
        {/* Dot visualizer */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {Array.from({ length: max }).map((_, i) => (
            <button
              key={i}
              onClick={() => dispatch({ type: 'SET_FOCUS', payload: i < current ? i : i + 1 })}
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                i < current
                  ? 'bg-dnd-gold border-dnd-gold shadow-ki'
                  : 'bg-transparent border-txt-muted'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-3">
          <Counter
            value={current}
            min={0}
            max={max}
            size="lg"
            onChange={(v) => dispatch({ type: 'SET_FOCUS', payload: v })}
          />
          <span className="text-txt-muted text-sm">/ {max}</span>
        </div>

        {/* Save DC */}
        <div className="text-center text-xs text-txt-muted border-t border-sheet-border pt-2">
          Focus Save DC{' '}
          <span className="text-txt-primary font-bold">
            {8 +
              Math.floor((character.abilityScores.wis - 10) / 2) +
              character.proficiencyBonus}
          </span>
          <span className="mx-2 text-sheet-border">·</span>
          Focus Attack{' '}
          <span className="text-txt-primary font-bold">
            +
            {Math.floor((character.abilityScores.dex - 10) / 2) + character.proficiencyBonus}
          </span>
        </div>
      </div>
    </SectionCard>
  )
}
