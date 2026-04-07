import type { ClassFeature } from '../types/character'

export const MONK_FEATURES: ClassFeature[] = [
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    description:
      'Use DEX instead of STR for Unarmed Strikes and Monk weapons. Roll 1d8 in place of normal damage. Make one Unarmed Strike as a Bonus Action.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'unarmored-defense',
    name: 'Unarmored Defense',
    description: 'While not wearing armor or shield, AC = 10 + DEX mod + WIS mod.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'monks-focus',
    name: "Monk's Focus",
    description:
      'You have 7 Focus Points. Regain all on Short or Long Rest. Spend to use: Flurry of Blows (1), Patient Defense (1), Step of the Wind (1).',
    resetsOn: 'short',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'unarmored-movement',
    name: 'Unarmored Movement',
    description: 'Speed +15 ft while not wearing armor or shield.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'uncanny-metabolism',
    name: 'Uncanny Metabolism',
    description:
      'Once per Long Rest, when you roll Initiative: regain all Focus Points and regain 1d8+7 HP.',
    resetsOn: 'long',
    usesMax: 1,
    usesRemaining: 1,
  },
  {
    id: 'deflect-attacks',
    name: 'Deflect Attacks',
    description:
      'Reaction: reduce Bludgeoning/Piercing/Slashing damage by 1d10+11. If reduced to 0, spend 1 FP to redirect: DC 14 DEX or 2d8+4 same type damage.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'slow-fall',
    name: 'Slow Fall',
    description: 'Reaction: reduce falling damage by 35.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'extra-attack',
    name: 'Extra Attack',
    description: 'Attack twice when you take the Attack action.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'stunning-strike',
    name: 'Stunning Strike',
    description:
      'Spend 1 FP when you hit with a Monk weapon or Unarmed Strike. Target: DC 14 CON save or Stunned until start of your next turn (Speed halved and Disadvantage on next attack roll on success).',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'empowered-strikes',
    name: 'Empowered Strikes',
    description: 'Unarmed Strikes can deal Force damage instead of Bludgeoning.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'evasion',
    name: 'Evasion',
    description:
      'DEX save effects: no damage on success, half damage on fail. No benefit if Incapacitated.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  {
    id: 'wholeness-of-body',
    name: 'Wholeness of Body',
    description: 'Bonus Action: heal yourself 1d8+3 HP. 3 uses per Long Rest.',
    resetsOn: 'long',
    usesMax: 3,
    usesRemaining: 3,
  },
  // Subclass: Warrior of the Open Hand
  {
    id: 'open-hand-technique',
    name: 'Open Hand Technique',
    description:
      'After a Flurry of Blows hit, choose one: Addle (target can\'t make OA until next turn), Push (DC 14 STR save or pushed 15 ft), Topple (DC 14 DEX save or Prone).',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  // Dragonborn
  {
    id: 'breath-weapon',
    name: 'Breath Weapon (Lightning)',
    description:
      '1 Action: 15 ft Cone or 30 ft Line (5 ft wide). DC 14 DEX save, 2d10 Lightning (half on success). 3 uses per Long Rest.',
    resetsOn: 'long',
    usesMax: 3,
    usesRemaining: 3,
  },
  {
    id: 'draconic-flight',
    name: 'Draconic Flight',
    description:
      'Bonus Action: gain temporary flight for 10 minutes (Fly Speed = Walk Speed) or until Incapacitated. 1 use per Long Rest.',
    resetsOn: 'long',
    usesMax: 1,
    usesRemaining: 1,
  },
  {
    id: 'draconic-resistance',
    name: 'Draconic Resistance (Lightning)',
    description: 'Resistance to Lightning damage.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
  // Feats
  {
    id: 'firearm-specialist',
    name: 'Firearm Specialist',
    description:
      'Proficient with Firearms. On a misfire, use Reaction to reroll the d20. If reroll > misfire score, gun does not misfire. When using Attack action with one-handed weapon, use Bonus Action to attack with loaded firearm (light property). 1 use per Short Rest.',
    resetsOn: 'short',
    usesMax: 1,
    usesRemaining: 1,
  },
  {
    id: 'savage-attacker',
    name: 'Savage Attacker',
    description:
      'Once per turn when you hit a target with a weapon, roll the damage dice twice and use either roll.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
  },
]
