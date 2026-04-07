import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'

export function CombatStats() {
  const { character } = useCharacter()

  return (
    <SectionCard title="Combat">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <svg viewBox="0 0 60 70" className="w-14 h-16 text-txt-muted" fill="none">
              <path
                d="M30 4 L56 20 L56 50 L30 66 L4 50 L4 20 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="rgba(15,52,96,0.5)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-txt-primary">
              {character.armorClass}
            </span>
          </div>
          <span className="text-xs text-txt-muted font-display tracking-wider uppercase">AC</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-16 rounded-full border-2 border-sheet-border bg-sheet-elevated flex items-center justify-center">
            <span className="font-display text-xl font-bold text-txt-primary">
              +{character.abilityScores.dex >= 10
                ? Math.floor((character.abilityScores.dex - 10) / 2)
                : Math.floor((character.abilityScores.dex - 10) / 2)}
            </span>
          </div>
          <span className="text-xs text-txt-muted font-display tracking-wider uppercase">
            Initiative
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-16 rounded border-2 border-sheet-border bg-sheet-elevated flex items-center justify-center px-1">
            <span className="font-display text-lg font-bold text-txt-primary leading-tight text-center">
              {character.speed}
              <span className="text-xs text-txt-muted block font-body">ft</span>
            </span>
          </div>
          <span className="text-xs text-txt-muted font-display tracking-wider uppercase">
            Speed
          </span>
        </div>
      </div>
    </SectionCard>
  )
}
