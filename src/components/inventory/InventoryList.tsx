import { useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { Counter } from '../controls/Counter'

export function InventoryList() {
  const { character, dispatch } = useCharacter()
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? character.inventory : character.inventory.slice(0, 10)
  const totalWeight = character.inventory.reduce(
    (sum, i) => sum + (i.weight ?? 0) * i.quantity,
    0,
  )

  return (
    <SectionCard
      title="Inventory"
      titleRight={
        <span className="text-xs text-txt-muted">
          {totalWeight.toFixed(1)} lb
          <span className="mx-1 text-sheet-border">·</span>
          <span className="text-dnd-gold font-bold">{character.gold}</span> gp
        </span>
      }
    >
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 py-1.5 px-2 rounded transition-colors ${
              item.equipped ? 'bg-sheet-elevated' : 'hover:bg-sheet-elevated/50'
            }`}
          >
            {/* Equipped indicator */}
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                item.equipped ? 'bg-dnd-green' : 'bg-transparent border border-txt-muted'
              }`}
            />

            {/* Name */}
            <div className="flex-1 min-w-0">
              <span
                className={`text-sm ${item.isMagic ? 'text-dnd-gold' : 'text-txt-primary'}`}
              >
                {item.name}
                {item.isMagic && ' ✦'}
              </span>
              {item.notes && (
                <span className="text-xs text-txt-muted ml-2">{item.notes}</span>
              )}
            </div>

            {/* Weight */}
            {item.weight != null && (
              <span className="text-xs text-txt-muted flex-shrink-0">
                {item.weight} lb
              </span>
            )}

            {/* Qty */}
            <Counter
              value={item.quantity}
              min={0}
              size="sm"
              onChange={(v) =>
                dispatch({ type: 'UPDATE_INVENTORY', payload: { id: item.id, quantity: v } })
              }
            />
          </div>
        ))}

        {character.inventory.length > 10 && (
          <button
            className="w-full text-xs text-txt-muted hover:text-txt-secondary py-1 text-center"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? '▲ Show less' : `▼ Show all ${character.inventory.length} items`}
          </button>
        )}
      </div>
    </SectionCard>
  )
}
