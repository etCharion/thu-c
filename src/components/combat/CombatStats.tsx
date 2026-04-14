import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { abilityModifier, formatModifier } from '../../lib/dnd5e'

export function CombatStats() {
  const { character } = useCharacter()
  const initiativeMod = abilityModifier(character.abilityScores.dex)

  return (
    <SectionCard title="Combat">
      <div className="grid grid-cols-3 gap-3 text-center">

        {/* AC – shield, dark navy fill */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-14 h-16">
            <svg viewBox="0 0 56 64" className="w-full h-full" fill="none">
              <path
                d="M28 3 L53 15 L53 38 Q53 54 28 61 Q3 54 3 38 L3 15 Z"
                fill="#1A2237"
                stroke="#C41E3A"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-white">
              {character.armorClass}
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-txt-muted font-display">
            Armor Class
          </span>
        </div>

        {/* Initiative – dark navy circle */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-16 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-dnd-navy border-2 border-dnd-red/60 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-white">
                {formatModifier(initiativeMod)}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-txt-muted font-display">
            Initiative
          </span>
        </div>

        {/* Speed – dark navy square */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-16 flex items-center justify-center">
            <div className="w-14 h-14 bg-dnd-navy border-2 border-sheet-border rounded-lg flex flex-col items-center justify-center">
              <span className="font-display text-xl font-bold text-white leading-none">
                {character.speed}
              </span>
              <span className="text-[10px] text-white/50 font-body">ft.</span>
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
