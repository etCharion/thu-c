import { useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'

export function RestButtons() {
  const { character, dispatch } = useCharacter()
  const [showHdPicker, setShowHdPicker] = useState(false)
  const [hdToSpend, setHdToSpend] = useState(1)

  function doShortRest() {
    const dieType = character.hitDiceType
    // Simple: roll average (dieType/2 + 1 + CON mod) × hdToSpend
    const conMod = Math.floor((character.abilityScores.con - 10) / 2)
    const avgRoll = Math.floor(dieType / 2) + 1
    const hpRecovered = Math.max(0, (avgRoll + conMod) * Math.min(hdToSpend, character.hitDiceRemaining))
    dispatch({ type: 'SHORT_REST', payload: { hpRecovered } })
    dispatch({ type: 'SET_HIT_DICE', payload: character.hitDiceRemaining - Math.min(hdToSpend, character.hitDiceRemaining) })
    setShowHdPicker(false)
  }

  function doLongRest() {
    dispatch({ type: 'LONG_REST' })
  }

  return (
    <div className="space-y-2">
      {showHdPicker && (
        <div className="bg-sheet-elevated border border-sheet-border rounded p-3 space-y-2">
          <div className="text-sm text-txt-secondary">
            Spend Hit Dice? ({character.hitDiceRemaining} available)
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={character.hitDiceRemaining}
              value={hdToSpend}
              onChange={(e) => setHdToSpend(Number(e.target.value))}
              className="flex-1 accent-dnd-gold"
            />
            <span className="text-sm text-txt-primary font-bold w-4">{hdToSpend}</span>
          </div>
          <div className="text-xs text-txt-muted">
            Avg HP recovered:{' '}
            <span className="text-dnd-green font-bold">
              +{Math.max(0, (Math.floor(character.hitDiceType / 2) + 1 + Math.floor((character.abilityScores.con - 10) / 2)) * hdToSpend)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={doShortRest}
              className="flex-1 py-1.5 rounded bg-blue-800 hover:bg-blue-700 text-white text-sm font-display tracking-wide"
            >
              Rest
            </button>
            <button
              onClick={() => setShowHdPicker(false)}
              className="px-3 py-1.5 rounded bg-sheet-border hover:bg-sheet-elevated text-txt-secondary text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowHdPicker(true)}
          className="py-2 px-3 rounded bg-blue-900 hover:bg-blue-800 border border-blue-700 text-white text-sm font-display tracking-wide transition-colors"
        >
          ☾ Short Rest
        </button>
        <button
          onClick={doLongRest}
          className="py-2 px-3 rounded bg-purple-900 hover:bg-purple-800 border border-purple-700 text-white text-sm font-display tracking-wide transition-colors"
        >
          ★ Long Rest
        </button>
      </div>
    </div>
  )
}
