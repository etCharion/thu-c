export type MonkAction =
  | 'flurry-of-blows'
  | 'patient-defense'
  | 'step-of-the-wind'
  | 'stunning-strike'
  | 'deflect-attacks'
  | 'slow-fall'
  | 'wholeness-of-body'
  | 'uncanny-metabolism'
  | 'draconic-flight'
  | 'breath-weapon'
  | 'firearm-specialist'

export interface KiAbility {
  action: MonkAction
  label: string
  fpCost: number
  description: string
  actionType: 'action' | 'bonus' | 'reaction' | 'special'
  resetsOn: 'short' | 'long' | 'none'
  usesMax: number | null // null = fp-limited only
}
