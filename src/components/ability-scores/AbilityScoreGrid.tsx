import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { AbilityScoreBox } from './AbilityScoreBox'
import type { AbilityName } from '../../types/character'

const ABILITIES: { key: AbilityName; label: string }[] = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'WIS' },
  { key: 'cha', label: 'CHA' },
]

export function AbilityScoreGrid() {
  const { character } = useCharacter()

  return (
    <SectionCard title="Ability Scores">
      <div className="grid grid-cols-3 gap-2">
        {ABILITIES.map(({ key, label }) => (
          <AbilityScoreBox key={key} label={label} score={character.abilityScores[key]} />
        ))}
      </div>
    </SectionCard>
  )
}
