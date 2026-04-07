import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { abilityModifier, formatModifier } from '../../lib/dnd5e'
import type { AbilityName } from '../../types/character'

const SAVES: { key: AbilityName; label: string }[] = [
  { key: 'str', label: 'Strength' },
  { key: 'dex', label: 'Dexterity' },
  { key: 'con', label: 'Constitution' },
  { key: 'int', label: 'Intelligence' },
  { key: 'wis', label: 'Wisdom' },
  { key: 'cha', label: 'Charisma' },
]

export function SavingThrows() {
  const { character } = useCharacter()
  const { abilityScores, savingThrowProficiencies, proficiencyBonus } = character

  return (
    <SectionCard title="Saving Throws">
      <div className="space-y-1">
        {SAVES.map(({ key, label }) => {
          const proficient = savingThrowProficiencies[key]
          const mod = abilityModifier(abilityScores[key]) + (proficient ? proficiencyBonus : 0)
          return (
            <div key={key} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  proficient ? 'bg-dnd-green border-dnd-green' : 'bg-transparent border-txt-muted'
                }`}
              />
              <span className="text-sm font-bold text-dnd-gold w-8 tabular-nums">
                {formatModifier(mod)}
              </span>
              <span className="text-sm text-txt-secondary">{label}</span>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
