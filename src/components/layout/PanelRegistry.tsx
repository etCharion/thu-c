import { useCharacter } from '../../context/CharacterContext'
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

function ProficienciesPanel() {
  const { character } = useCharacter()
  return (
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
  )
}

function RestPanel() {
  return (
    <SectionCard title="Rest">
      <RestButtons />
    </SectionCard>
  )
}

export const PANEL_COMPONENTS: Record<string, React.ComponentType> = {
  'ability-scores': AbilityScoreGrid,
  'saving-throws': SavingThrows,
  'skills': SkillList,
  'proficiencies': ProficienciesPanel,
  'combat-stats': CombatStats,
  'hit-points': HitPoints,
  'death-saves': DeathSaves,
  'rest': RestPanel,
  'ki-tracker': KiTracker,
  'ki-abilities': KiAbilityButtons,
  'attacks': AttackTable,
  'features': ClassFeatureList,
  'inventory': InventoryList,
}
