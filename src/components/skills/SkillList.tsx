import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { abilityModifier, formatModifier, passiveScore } from '../../lib/dnd5e'
import { SKILLS } from '../../constants/skills'

export function SkillList() {
  const { character } = useCharacter()
  const { abilityScores, skillProficiencies, proficiencyBonus } = character

  return (
    <SectionCard title="Skills">
      <div className="space-y-0.5">
        {SKILLS.map(({ key, label, ability }) => {
          const entry = skillProficiencies[key] ?? { proficient: false, expertise: false }
          const baseMod = abilityModifier(abilityScores[ability])
          const profBonus = entry.expertise
            ? proficiencyBonus * 2
            : entry.proficient
            ? proficiencyBonus
            : 0
          const total = baseMod + profBonus

          return (
            <div key={key} className="flex items-center gap-2 py-0.5">
              {/* Proficiency indicator */}
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 border ${
                  entry.expertise
                    ? 'bg-dnd-gold-light border-dnd-gold-light'
                    : entry.proficient
                    ? 'bg-dnd-red border-dnd-red'
                    : 'bg-transparent border-txt-muted'
                }`}
              />
              <span className="text-sm font-bold text-txt-primary w-8 tabular-nums text-right">
                {formatModifier(total)}
              </span>
              <span className="text-sm text-txt-secondary flex-1">{label}</span>
              <span className="text-[10px] font-bold text-txt-muted uppercase tracking-wider">{ability}</span>
            </div>
          )
        })}
      </div>

      {/* Passives */}
      <div className="mt-3 pt-2 border-t border-sheet-border grid grid-cols-3 gap-2 text-center">
        {[
          {
            label: 'Perception',
            val: passiveScore(
              abilityScores.wis,
              skillProficiencies['perception']?.proficient ?? false,
              skillProficiencies['perception']?.expertise ?? false,
              proficiencyBonus,
            ),
          },
          {
            label: 'Insight',
            val: passiveScore(abilityScores.wis, false, false, proficiencyBonus),
          },
          {
            label: 'Investigation',
            val: passiveScore(abilityScores.int, false, false, proficiencyBonus),
          },
        ].map(({ label, val }) => (
          <div key={label} className="text-center">
            <div className="text-xs text-txt-muted">{label}</div>
            <div className="text-sm font-bold text-txt-primary">{val}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
