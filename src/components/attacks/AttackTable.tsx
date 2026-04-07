import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { AttackRow } from './AttackRow'

export function AttackTable() {
  const { character } = useCharacter()

  return (
    <SectionCard title="Attacks">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sheet-border">
              <th className="text-left py-1 pl-3 pr-2 text-xs font-display tracking-wider text-txt-muted uppercase">
                Name
              </th>
              <th className="py-1 px-2 text-center text-xs font-display tracking-wider text-txt-muted uppercase">
                Hit
              </th>
              <th className="py-1 px-2 text-center text-xs font-display tracking-wider text-txt-muted uppercase">
                Damage
              </th>
              <th className="py-1 pl-2 pr-3 text-left text-xs font-display tracking-wider text-txt-muted uppercase">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {character.attacks.map((attack) => (
              <AttackRow key={attack.id} attack={attack} />
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
