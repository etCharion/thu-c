import { useState } from 'react'
import type { Attack, AbilityName, DamageType } from '../../types/character'
import type { LevelUpDraft } from '../../hooks/useLevelUpDraft'
import type { DraftAction } from '../../hooks/useLevelUpDraft'

const ABILITY_OPTIONS: { value: AbilityName | 'flat'; label: string }[] = [
  { value: 'str', label: 'Strength' },
  { value: 'dex', label: 'Dexterity' },
  { value: 'con', label: 'Constitution' },
  { value: 'int', label: 'Intelligence' },
  { value: 'wis', label: 'Wisdom' },
  { value: 'cha', label: 'Charisma' },
  { value: 'flat', label: 'Flat (no ability)' },
]

const DAMAGE_ABILITY_OPTIONS: { value: AbilityName | 'none'; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'str', label: 'Strength' },
  { value: 'dex', label: 'Dexterity' },
  { value: 'con', label: 'Constitution' },
  { value: 'int', label: 'Intelligence' },
  { value: 'wis', label: 'Wisdom' },
  { value: 'cha', label: 'Charisma' },
]

const DAMAGE_TYPES: DamageType[] = [
  'bludgeoning', 'piercing', 'slashing', 'fire', 'force', 'lightning', 'radiant', 'necrotic',
]

const DICE_REGEX = /^\d+d\d+$/

interface AttackRowProps {
  attack: Attack
  index: number
  dispatch: React.Dispatch<DraftAction>
}

function AttackRow({ attack, index, dispatch }: AttackRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [diceError, setDiceError] = useState('')

  const update = (patch: Partial<Attack>) =>
    dispatch({ type: 'UPDATE_ATTACK', payload: { index, attack: { ...attack, ...patch } } })

  return (
    <div className="border border-sheet-border rounded-lg bg-sheet-elevated overflow-hidden">
      {/* Collapsed header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 flex items-center gap-2 text-left"
        >
          <span className="text-sm font-display text-txt-primary">{attack.name || 'Unnamed Attack'}</span>
          <span className="text-xs text-txt-muted">
            {attack.damageDice} {attack.damageType}
            {attack.isBonusAction && ' · Bonus Action'}
            {attack.fpCost > 0 && ` · ${attack.fpCost} FP`}
          </span>
          <span className="ml-auto text-txt-muted text-xs">{expanded ? '▲' : '▼'}</span>
        </button>
        <button
          onClick={() => dispatch({ type: 'REMOVE_ATTACK', payload: { index } })}
          className="px-2 py-0.5 rounded text-xs text-dnd-red border border-dnd-red/30 hover:bg-dnd-red/10 transition-colors"
        >
          Remove
        </button>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="border-t border-sheet-border px-3 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-txt-muted block mb-1">Name</label>
              <input
                type="text"
                value={attack.name}
                onChange={(e) => update({ name: e.target.value })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
            </div>
            <div>
              <label className="text-xs text-txt-muted block mb-1">Notes</label>
              <input
                type="text"
                value={attack.notes}
                onChange={(e) => update({ notes: e.target.value })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-txt-muted block mb-1">Attack Bonus</label>
              <select
                value={attack.attackBonus}
                onChange={(e) => update({ attackBonus: e.target.value as AbilityName | 'flat' })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              >
                {ABILITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-txt-muted block mb-1">Flat Bonus</label>
              <input
                type="number"
                value={attack.flatBonus}
                onChange={(e) => update({ flatBonus: parseInt(e.target.value) || 0 })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-1.5 text-xs text-txt-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={attack.proficient}
                  onChange={(e) => update({ proficient: e.target.checked })}
                  className="accent-dnd-gold"
                />
                Proficient
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-txt-muted block mb-1">Damage Dice</label>
              <input
                type="text"
                value={attack.damageDice}
                placeholder="e.g. 1d8"
                onChange={(e) => {
                  update({ damageDice: e.target.value })
                  setDiceError('')
                }}
                onBlur={(e) => {
                  if (!DICE_REGEX.test(e.target.value)) {
                    setDiceError('Format: NdN (e.g. 1d8)')
                  }
                }}
                className={`w-full bg-sheet-bg border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60 ${
                  diceError ? 'border-dnd-red/60' : 'border-sheet-border'
                }`}
              />
              {diceError && <p className="text-xs text-dnd-red mt-0.5">{diceError}</p>}
            </div>
            <div>
              <label className="text-xs text-txt-muted block mb-1">Damage Ability</label>
              <select
                value={attack.damageAbility}
                onChange={(e) => update({ damageAbility: e.target.value as AbilityName | 'none' })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              >
                {DAMAGE_ABILITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-txt-muted block mb-1">Damage Type</label>
              <input
                type="text"
                list="damage-types"
                value={attack.damageType}
                onChange={(e) => update({ damageType: e.target.value as DamageType })}
                className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
              <datalist id="damage-types">
                {DAMAGE_TYPES.map((t) => <option key={t} value={t} />)}
              </datalist>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-1.5 text-txt-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={attack.isMartialArts}
                onChange={(e) => update({ isMartialArts: e.target.checked })}
                className="accent-dnd-gold"
              />
              Martial Arts (scales)
            </label>
            <label className="flex items-center gap-1.5 text-txt-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={attack.isBonusAction}
                onChange={(e) => update({ isBonusAction: e.target.checked })}
                className="accent-dnd-gold"
              />
              Bonus Action
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-txt-muted">Focus Point cost:</span>
              <input
                type="number"
                min={0}
                max={10}
                value={attack.fpCost}
                onChange={(e) => update({ fpCost: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-12 bg-sheet-bg border border-sheet-border rounded px-1.5 py-0.5 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface Props {
  draft: LevelUpDraft
  dispatch: React.Dispatch<DraftAction>
}

function newAttack(): Attack {
  return {
    id: crypto.randomUUID(),
    name: '',
    attackBonus: 'str',
    flatBonus: 0,
    proficient: true,
    damageDice: '1d6',
    damageAbility: 'str',
    damageType: 'bludgeoning',
    isMartialArts: false,
    isBonusAction: false,
    fpCost: 0,
    notes: '',
  }
}

export function LevelUpAttacksTab({ draft, dispatch }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-txt-muted">{draft.attacks.length} attacks</p>
        <button
          onClick={() => dispatch({ type: 'ADD_ATTACK', payload: newAttack() })}
          className="px-3 py-1 rounded bg-dnd-gold/20 border border-dnd-gold/40 text-dnd-gold text-xs hover:bg-dnd-gold/30 transition-colors"
        >
          + Add Attack
        </button>
      </div>

      <div className="space-y-2">
        {draft.attacks.map((attack, i) => (
          <AttackRow key={attack.id} attack={attack} index={i} dispatch={dispatch} />
        ))}
        {draft.attacks.length === 0 && (
          <p className="text-xs text-txt-muted italic text-center py-8">No attacks yet. Click "+ Add Attack" to start.</p>
        )}
      </div>
    </div>
  )
}
