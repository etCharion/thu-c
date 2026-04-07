import type { AbilityName, AbilityScores } from '../types/character'

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function proficiencyBonus(totalLevel: number): number {
  return Math.ceil(totalLevel / 4) + 1
}

export function formatModifier(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`
}

export function martialArtsDie(monkLevel: number): number {
  if (monkLevel >= 17) return 10
  if (monkLevel >= 11) return 8
  if (monkLevel >= 5) return 6
  return 4
}

export function kiMax(monkLevel: number): number {
  return monkLevel
}

export function passiveScore(
  abScore: number,
  proficient: boolean,
  expertise: boolean,
  profBonus: number,
): number {
  const mod = abilityModifier(abScore)
  const prof = expertise ? profBonus * 2 : proficient ? profBonus : 0
  return 10 + mod + prof
}

export function spellSaveDC(abilityScore: number, profBonus: number): number {
  return 8 + abilityModifier(abilityScore) + profBonus
}

export function spellAttackBonus(abilityScore: number, profBonus: number): number {
  return abilityModifier(abilityScore) + profBonus
}

export function getAbilityMod(scores: AbilityScores, ability: AbilityName | 'flat'): number {
  if (ability === 'flat') return 0
  return abilityModifier(scores[ability])
}

export function totalLevel(classes: Array<{ name: string; level: number }>): number {
  return classes.reduce((sum, c) => sum + c.level, 0)
}

export function monkLevel(classes: Array<{ name: string; level: number }>): number {
  return classes.find((c) => c.name === 'Monk')?.level ?? 0
}

export function parseDamageDice(dice: string): number {
  // Returns the die size from e.g. "1d8" → 8, "2d6" → 6
  const match = dice.match(/\d+d(\d+)/)
  return match ? parseInt(match[1]) : 0
}
