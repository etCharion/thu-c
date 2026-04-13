export type AbilityName = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
export type RestType = 'short' | 'long' | 'none'
export type FeatureResourceType = 'ki' | 'spell-slot' | 'none' | 'custom'
export type FeatureSource = 'class' | 'origin' | 'racial' | 'feat' | 'other'
export type DamageType =
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'radiant'
  | 'necrotic'
  | string

export interface AbilityScores {
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

export interface HitPoints {
  current: number
  max: number
  temp: number
}

export interface DeathSaves {
  successes: number // 0-3
  failures: number // 0-3
}

export interface Attack {
  id: string
  name: string
  /** Which ability drives to-hit roll */
  attackBonus: AbilityName | 'flat'
  /** Additional flat bonus on top of ability+prof */
  flatBonus: number
  proficient: boolean
  damageDice: string // e.g. "1d8", "2d6"
  damageAbility: AbilityName | 'none'
  damageType: DamageType
  /** If true, damage die is max(weaponDie, martialArtsDie) */
  isMartialArts: boolean
  /** Bonus action attack (e.g. Flurry of Blows) */
  isBonusAction: boolean
  /** Focus Points cost to use (0 = free) */
  fpCost: number
  notes: string
}

export interface SkillEntry {
  proficient: boolean
  expertise: boolean
}

export type SkillsMap = Record<string, SkillEntry>

export interface SavingThrowProficiencies {
  str: boolean
  dex: boolean
  con: boolean
  int: boolean
  wis: boolean
  cha: boolean
}

export interface ClassFeature {
  id: string
  name: string
  description: string
  resetsOn: RestType
  usesMax: number | null // null = passive / unlimited
  usesRemaining: number | null
  /** Which resource pool is spent when using this feature */
  resourceType?: FeatureResourceType
  /** How many units of that resource are spent (default 1) */
  resourceCost?: number
  /** Where this feature comes from */
  source?: FeatureSource
  /** Optional finer label, e.g. "Open Hand", "Draconic Ancestor" */
  sourceLabel?: string
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  weight: number | null
  equipped: boolean
  notes: string
  isMagic: boolean
}

export interface SpellSlot {
  level: number
  max: number
  remaining: number
}

export interface SpellEntry {
  id: string
  name: string
  level: number
  prepared: boolean
  concentration: boolean
  notes: string
}

export interface LevelUpPayload {
  classes: Array<{ name: string; level: number }>
  abilityScores: AbilityScores
  hitPoints: HitPoints
  attacks: Attack[]
  classFeatures: ClassFeature[]
  proficienciesWeapons: string[]
  proficienciesTools: string[]
  languages: string[]
  armorClass: number
  speed: number
}

export interface Character {
  // Meta
  id: string
  name: string
  race: string
  background: string
  alignment: string
  classes: Array<{ name: string; level: number }>

  // Core stats
  abilityScores: AbilityScores
  proficiencyBonus: number
  inspiration: boolean

  // Combat
  armorClass: number
  speed: number
  hitPoints: HitPoints
  hitDiceRemaining: number
  hitDiceTotal: number
  hitDiceType: number // d8 = 8

  deathSaves: DeathSaves

  // Monk focus points
  focusPoints: { current: number; max: number }

  // Attacks
  attacks: Attack[]

  // Skills & saves
  skillProficiencies: SkillsMap
  savingThrowProficiencies: SavingThrowProficiencies

  // Features & inventory
  classFeatures: ClassFeature[]
  inventory: InventoryItem[]
  gold: number

  // Spells (Ranger phase)
  spellcastingAbility: AbilityName | null
  spellSlots: SpellSlot[]
  spells: SpellEntry[]

  // Misc
  resistances: string[]
  languages: string[]
  proficienciesWeapons: string[]
  proficienciesTools: string[]

  // Senses
  darkvision: number | null

  // Character traits & appearance
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  appearance: string
  eyes: string
  hair: string
  skin: string

  updatedAt: number
}
