import { useCharacter } from '../../context/CharacterContext'
import {
  abilityModifier,
  formatModifier,
  martialArtsDie,
  monkLevel,
  parseDamageDice,
  getAbilityMod,
} from '../../lib/dnd5e'
import type { Attack } from '../../types/character'

interface AttackRowProps {
  attack: Attack
}

export function AttackRow({ attack }: AttackRowProps) {
  const { character } = useCharacter()
  const { abilityScores, proficiencyBonus, classes } = character
  const ml = monkLevel(classes)

  // To-hit calculation
  const abilityHit = getAbilityMod(abilityScores, attack.attackBonus)
  const prof = attack.proficient ? proficiencyBonus : 0
  const toHit = abilityHit + prof + attack.flatBonus

  // Damage calculation
  const abilityDmg = attack.damageAbility !== 'none' ? abilityModifier(abilityScores[attack.damageAbility]) : 0
  const dieSize = parseDamageDice(attack.damageDice)
  const effectiveDie = attack.isMartialArts ? Math.max(dieSize, martialArtsDie(ml)) : dieSize
  const diceCount = attack.damageDice.match(/^(\d+)d/)?.[1] ?? '1'
  const dmgStr = `${diceCount}d${effectiveDie}${formatModifier(abilityDmg)}`

  const damageTypeColor: Record<string, string> = {
    bludgeoning: 'text-orange-300',
    piercing: 'text-red-300',
    slashing: 'text-red-400',
    force: 'text-purple-400',
    lightning: 'text-blue-400',
    fire: 'text-orange-400',
  }
  const dtColor = damageTypeColor[attack.damageType] ?? 'text-txt-secondary'

  return (
    <tr className="border-b border-sheet-border hover:bg-sheet-elevated/50 transition-colors group">
      <td className="py-2 pl-3 pr-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-txt-primary">{attack.name}</span>
          {attack.notes && (
            <span className="text-xs text-txt-muted">{attack.notes}</span>
          )}
        </div>
        <div className="flex gap-1 mt-0.5 flex-wrap">
          {attack.isBonusAction && (
            <span className="text-xs px-1 rounded bg-blue-900/50 text-blue-400">Bonus</span>
          )}
          {attack.fpCost > 0 && (
            <span className="text-xs px-1 rounded bg-dnd-gold/20 text-dnd-gold">
              {attack.fpCost} FP
            </span>
          )}
        </div>
      </td>
      <td className="py-2 px-2 text-center">
        <span className="font-bold text-txt-primary tabular-nums">{formatModifier(toHit)}</span>
      </td>
      <td className="py-2 px-2 text-center">
        <span className="font-bold text-txt-primary tabular-nums">{dmgStr}</span>
      </td>
      <td className="py-2 pl-2 pr-3">
        <span className={`text-xs capitalize ${dtColor}`}>{attack.damageType}</span>
      </td>
    </tr>
  )
}
