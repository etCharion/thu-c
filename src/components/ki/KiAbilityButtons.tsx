import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'

interface KiAction {
  label: string
  cost: number
  action: string
  description: string
  color: string
}

const KI_ACTIONS: KiAction[] = [
  {
    label: 'Flurry of Blows',
    cost: 1,
    action: 'Bonus',
    description: '2 Unarmed Strikes. Then choose: Addle / Push (DC14 STR) / Topple (DC14 DEX)',
    color: 'text-orange-400 border-orange-700 hover:bg-orange-900/30',
  },
  {
    label: 'Patient Defense',
    cost: 1,
    action: 'Bonus',
    description: 'Take the Dodge action.',
    color: 'text-blue-400 border-blue-700 hover:bg-blue-900/30',
  },
  {
    label: 'Step of the Wind',
    cost: 1,
    action: 'Bonus',
    description: 'Dash/Disengage as Bonus Action. Jump distance doubled.',
    color: 'text-green-400 border-green-700 hover:bg-green-900/30',
  },
  {
    label: 'Stunning Strike',
    cost: 1,
    action: 'On Hit',
    description: 'DC 14 CON save or Stunned until start of your next turn.',
    color: 'text-yellow-400 border-yellow-700 hover:bg-yellow-900/30',
  },
  {
    label: 'Deflect & Redirect',
    cost: 1,
    action: 'Reaction',
    description: 'After Deflect reduces hit to 0: DC 14 DEX or 2d8+4 damage to a creature within range.',
    color: 'text-purple-400 border-purple-700 hover:bg-purple-900/30',
  },
]

export function KiAbilityButtons() {
  const { character, dispatch } = useCharacter()
  const fp = character.focusPoints.current

  function spend(cost: number) {
    dispatch({ type: 'SET_FOCUS', payload: fp - cost })
  }

  return (
    <SectionCard title="Focus Abilities">
      <div className="space-y-1.5">
        {KI_ACTIONS.map((a) => (
          <button
            key={a.label}
            disabled={fp < a.cost}
            onClick={() => spend(a.cost)}
            className={`w-full text-left px-3 py-2 rounded border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${a.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{a.label}</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-txt-muted">{a.action}</span>
                <span className="px-1.5 py-0.5 rounded bg-dnd-gold/20 text-dnd-gold font-bold">
                  {a.cost} FP
                </span>
              </div>
            </div>
            <p className="text-xs text-txt-muted mt-0.5">{a.description}</p>
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
