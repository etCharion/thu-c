/**
 * laserllama's Alternate Ranger – Level 1 features
 * https://www.gmbinder.com/share/-M7iu19Af89SH2G_5RGa
 *
 * Level 1 grants:
 *   - Favored Enemy          (mandatory, passive)
 *   - Natural Explorer        (mandatory, passive)
 *   - Fighting Style          (choice – pick ONE from RANGER_FIGHTING_STYLES)
 *   - Survivalist Knack ×1    (choice – pick ONE from RANGER_SURVIVALIST_KNACKS)
 *
 * No spell slots at level 1 – spellcasting (WIS-based, half-caster) starts at level 2.
 */

import type { ClassFeature } from '../types/character'

// ─── Mandatory level-1 features ──────────────────────────────────────────────

export const RANGER_CORE_LEVEL_1: ClassFeature[] = [
  {
    id: 'favored-enemy',
    name: 'Favored Enemy',
    description:
      'Choose one: a creature type (Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, or Undead), two humanoid races, or one organization. You have Advantage on WIS (Survival) checks to track them and on INT checks to recall information about them. You also learn one language spoken by them (if any).',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'natural-explorer',
    name: 'Natural Explorer',
    description:
      'Choose one terrain type: Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, or Underdark. When making a WIS (Survival) or INT (Nature) check related to your chosen terrain, add your Proficiency Bonus twice. While traveling for 1+ hour in that terrain: difficult terrain doesn\'t slow your group, your group can\'t get lost by non-magical means, you remain alert while foraging, and you can move stealthily at a normal pace (if traveling alone or in a group that is also being stealthy).',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
]

// ─── Fighting Style options (choose one) ─────────────────────────────────────
// For Thu'C: Archery is strongest with Beampal; Melee Marksman is thematic;
// Brawler synergises with Monk unarmed strikes.

export const RANGER_FIGHTING_STYLES: ClassFeature[] = [
  {
    id: 'fighting-style-archery',
    name: 'Fighting Style: Archery',
    description: '+2 bonus to attack rolls made with ranged weapons.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-blind-fighting',
    name: 'Fighting Style: Blind Fighting',
    description: 'You have Blindsight with a range of 10 ft. Within that range, you can see anything that isn\'t behind total cover even if you\'re Blinded or in magical darkness.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-brawler',
    name: 'Fighting Style: Brawler',
    description: 'Your unarmed strikes deal 1d4 + STR modifier Bludgeoning damage. If you are not holding a weapon or shield when you take the Attack action, you can make an unarmed strike as a Bonus Action.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-dueling',
    name: 'Fighting Style: Dueling',
    description: '+2 bonus to damage rolls when you are wielding a melee weapon in one hand and no other weapons.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-druidic-warrior',
    name: 'Fighting Style: Druidic Warrior',
    description: 'Learn two cantrips of your choice from the Druid spell list. WIS is your spellcasting ability for them. Whenever you gain a level in this class, you can replace one of these cantrips with another from the Druid list.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-great-weapon-fighting',
    name: 'Fighting Style: Great Weapon Fighting',
    description: 'When you roll a 1 or 2 on a damage die for an attack with a melee weapon you are wielding with two hands, reroll the die and use the new roll. The weapon must have the Two-Handed or Versatile property.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-hand-crossbow',
    name: 'Fighting Style: Hand Crossbow Expert',
    description: 'When you use the Attack action with a Hand Crossbow, ignore the Loading property. If you are holding a Hand Crossbow and attack with it as part of the Attack action, you can use your Bonus Action to make one additional attack with the Hand Crossbow.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-melee-marksman',
    name: 'Fighting Style: Melee Marksman',
    description: 'Being within 5 ft. of a hostile creature doesn\'t impose Disadvantage on your ranged attack rolls. When you use the Attack action to attack with a ranged weapon, you can use your Bonus Action to make a melee weapon attack.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-mounted-warrior',
    name: 'Fighting Style: Mounted Warrior',
    description: 'Your mount doesn\'t provoke Opportunity Attacks while you ride it. While mounted, you have Advantage on melee weapon attack rolls against creatures that are not mounted and smaller than your mount.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
  {
    id: 'fighting-style-two-weapon-fighting',
    name: 'Fighting Style: Two-Weapon Fighting',
    description: 'When you engage in Two-Weapon Fighting, you can add your ability modifier to the damage of the Bonus Action attack.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Alt. Ranger',
    resourceType: 'none',
  },
]

// ─── Survivalist Knack options (choose one at level 1) ───────────────────────
// Knacks are invocation-style features – most are passive.
// For Thu'C (WIS 16): Slayer I is strong; Explorer I gives skill expertise.

export const RANGER_SURVIVALIST_KNACKS: ClassFeature[] = [
  {
    id: 'knack-slayer-i',
    name: 'Survivalist Knack: Slayer I',
    description:
      'When you hit your Favored Enemy with a weapon attack or unarmed strike, you deal additional damage equal to your WIS modifier (min 1). (Currently: +3 damage)',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
  {
    id: 'knack-explorer-i',
    name: 'Survivalist Knack: Explorer I',
    description:
      'You gain Expertise (double Proficiency Bonus) in one of the following skills: Athletics, Nature, Perception, Stealth, or Survival.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
  {
    id: 'knack-herbalist-i',
    name: 'Survivalist Knack: Herbalist I',
    description:
      'You can use your WIS (Medicine) skill in place of a Healer\'s Kit when stabilizing a dying creature. Additionally, you can use your action and expend one use of a Healer\'s Kit to tend to a creature\'s wounds, restoring 1d6 + 4 HP.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
  {
    id: 'knack-scout',
    name: 'Survivalist Knack: Scout',
    description:
      'You are skilled at moving quickly and quietly. You can take the Dash action as a Bonus Action. Additionally, when you move, you can spend 5 ft. of movement to automatically pass a DEX (Stealth) check if not in bright light.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
  {
    id: 'knack-tracker',
    name: 'Survivalist Knack: Tracker',
    description:
      'You can track creatures at a fast travel pace without penalty. You can also determine the exact number of creatures that passed through an area, what type they were, and roughly how long ago.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
  {
    id: 'knack-ambusher',
    name: 'Survivalist Knack: Ambusher',
    description:
      'You have Advantage on Initiative rolls. Additionally, in the first round of combat, you have Advantage on attack rolls against any creature that hasn\'t taken a turn yet.',
    resetsOn: 'none',
    usesMax: null,
    usesRemaining: null,
    source: 'class',
    sourceLabel: 'Knack',
    resourceType: 'none',
  },
]

// ─── Recommended preset for Thu'C (Monk 7 / Alt. Ranger 1) ──────────────────
// Fighting Style: Archery  (+2 ranged → great with Beampal)
// Survivalist Knack: Slayer I  (+3 damage vs Favored Enemy, WIS 16)

export const RANGER_FEATURES_LEVEL_1: ClassFeature[] = [
  ...RANGER_CORE_LEVEL_1,
  RANGER_FIGHTING_STYLES.find((f) => f.id === 'fighting-style-archery')!,
  RANGER_SURVIVALIST_KNACKS.find((f) => f.id === 'knack-slayer-i')!,
]
