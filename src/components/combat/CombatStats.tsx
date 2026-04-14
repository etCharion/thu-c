import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { abilityModifier, formatModifier } from '../../lib/dnd5e'

export function CombatStats() {
  const { character } = useCharacter()
  const initiativeMod = abilityModifier(character.abilityScores.dex)

  return (
    <SectionCard title="Combat">
      <div className="grid grid-cols-3 gap-3 text-center">

        {/* AC – shield */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-14 h-16">
            <svg viewBox="0 0 56 64" className="w-full h-full" fill="none">
              <path
                d="M28 3 L53 15 L53 38 Q53 54 28 61 Q3 54 3 38 L3 15 Z"
                fill="#1C2130"
                stroke="#C41E3A"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-txt-primary">
              {character.armorClass}
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-txt-muted font-display">
            Armor Class
          </span>
        </div>

        {/* Initiative */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-16 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-dnd-red/50 bg-sheet-elevated flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-txt-primary">
                {formatModifier(initiativeMod)}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-txt-muted font-display">
            Initiative
          </span>
        </div>

        {/* Speed */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-16 flex items-center justify-center">
            <div className="w-14 h-14 border-2 border-sheet-border bg-sheet-elevated rounded-lg flex flex-col items-center justify-center">
              <span className="font-display text-xl font-bold text-txt-primary leading-none">
                {character.speed}
              </span>
              <span className="text-[10px] text-txt-muted font-body">ft.</span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-txt-muted font-display">
            Speed
          </span>
        </div>

      </div>
    </SectionCard>
  )
}
