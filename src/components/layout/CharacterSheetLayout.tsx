import { CharacterHeader } from '../header/CharacterHeader'
import { AbilityScoreGrid } from '../ability-scores/AbilityScoreGrid'
import { SavingThrows } from '../skills/SavingThrows'
import { SkillList } from '../skills/SkillList'
import { CombatStats } from '../combat/CombatStats'
import { HitPoints } from '../combat/HitPoints'
import { DeathSaves } from '../combat/DeathSaves'
import { KiTracker } from '../ki/KiTracker'
import { KiAbilityButtons } from '../ki/KiAbilityButtons'
import { AttackTable } from '../attacks/AttackTable'
import { ClassFeatureList } from '../features/ClassFeatureList'
import { InventoryList } from '../inventory/InventoryList'
import { RestButtons } from '../controls/RestButtons'
import { SectionCard } from './SectionCard'
import { useCharacter } from '../../context/CharacterContext'

export function CharacterSheetLayout() {
  const { character } = useCharacter()

  return (
    <div className="min-h-screen bg-sheet-bg p-3 lg:p-4 space-y-3">
      {/* Header */}
      <CharacterHeader />

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-3">
        {/* LEFT: Ability Scores, Saves, Skills */}
        <div className="space-y-3">
          <AbilityScoreGrid />
          <SavingThrows />
          <SkillList />

          {/* Proficiencies */}
          <SectionCard title="Proficiencies">
            <div className="space-y-2 text-xs text-txt-secondary">
              <div>
                <span className="text-txt-muted block">Weapons</span>
                {character.proficienciesWeapons.join(', ')}
              </div>
              <div>
                <span className="text-txt-muted block">Tools</span>
                {character.proficienciesTools.join(', ')}
              </div>
              <div>
                <span className="text-txt-muted block">Languages</span>
                {character.languages.join(', ')}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* CENTER: Features, Inventory */}
        <div className="space-y-3">
          <ClassFeatureList />
          <InventoryList />
        </div>

        {/* RIGHT: Combat, HP, Ki, Attacks */}
        <div className="space-y-3">
          <CombatStats />
          <HitPoints />
          <DeathSaves />

          {/* Rest buttons */}
          <SectionCard title="Rest">
            <RestButtons />
          </SectionCard>

          <KiTracker />
          <KiAbilityButtons />
          <AttackTable />
        </div>
      </div>
    </div>
  )
}
