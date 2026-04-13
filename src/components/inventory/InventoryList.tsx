import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { Counter } from '../controls/Counter'
import type { InventoryItem } from '../../types/character'

interface RowProps {
  item: InventoryItem
  isExpanded: boolean
  onToggleExpand: () => void
}

function InventoryRow({ item, isExpanded, onToggleExpand }: RowProps) {
  const { dispatch } = useCharacter()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="rounded transition-colors">
      <div
        className={`flex items-center gap-2 py-1.5 px-2 rounded ${
          item.equipped ? 'bg-sheet-elevated' : 'hover:bg-sheet-elevated/50'
        }`}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 text-txt-muted hover:text-txt-secondary cursor-grab active:cursor-grabbing touch-none px-0.5 text-xs"
          tabIndex={-1}
          aria-label="Drag to reorder"
        >
          ⠿
        </button>

        {/* Equipped toggle */}
        <button
          title={item.equipped ? 'Unequip' : 'Equip'}
          onClick={() =>
            dispatch({
              type: 'UPDATE_INVENTORY',
              payload: { id: item.id, equipped: !item.equipped },
            })
          }
          className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
            item.equipped
              ? 'bg-dnd-green'
              : 'bg-transparent border border-txt-muted hover:border-dnd-green'
          }`}
        />

        {/* Name – click to expand */}
        <button className="flex-1 min-w-0 text-left" onClick={onToggleExpand}>
          <span className={`text-sm ${item.isMagic ? 'text-dnd-gold' : 'text-txt-primary'}`}>
            {item.name}
            {item.isMagic && ' ✦'}
          </span>
          {item.notes && !isExpanded && (
            <span className="text-xs text-txt-muted ml-2 truncate max-w-[140px] inline-block align-bottom">
              {item.notes}
            </span>
          )}
        </button>

        {/* Weight */}
        {item.weight != null && (
          <span className="text-xs text-txt-muted flex-shrink-0">{item.weight} lb</span>
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

        {/* Remove */}
        <button
          title="Remove item"
          onClick={() =>
            dispatch({ type: 'REMOVE_INVENTORY_ITEM', payload: { id: item.id } })
          }
          className="text-dnd-red/60 hover:text-dnd-red text-xs px-1 flex-shrink-0 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-2 pb-2 pt-1 space-y-1.5 bg-sheet-elevated/40 rounded-b border-t border-sheet-border">
          <input
            type="text"
            value={item.name}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_INVENTORY', payload: { id: item.id, name: e.target.value } })
            }
            placeholder="Item name"
            className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-sm text-txt-primary focus:outline-none focus:border-dnd-gold/60"
          />
          <textarea
            value={item.notes}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_INVENTORY', payload: { id: item.id, notes: e.target.value } })
            }
            placeholder="Notes or description…"
            rows={3}
            className="w-full bg-sheet-bg border border-sheet-border rounded px-2 py-1.5 text-xs text-txt-secondary focus:outline-none focus:border-dnd-gold/60 resize-y"
          />
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 text-txt-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={item.isMagic}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_INVENTORY', payload: { id: item.id, isMagic: e.target.checked } })
                }
                className="accent-dnd-gold"
              />
              Magic item
            </label>
            <label className="flex items-center gap-1.5 text-txt-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={item.equipped}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_INVENTORY', payload: { id: item.id, equipped: e.target.checked } })
                }
                className="accent-dnd-green"
              />
              Equipped
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-txt-muted">Weight:</span>
              <input
                type="number"
                min={0}
                step={0.5}
                value={item.weight ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_INVENTORY',
                    payload: {
                      id: item.id,
                      weight: e.target.value === '' ? null : parseFloat(e.target.value),
                    },
                  })
                }
                placeholder="—"
                className="w-16 bg-sheet-bg border border-sheet-border rounded px-2 py-0.5 text-xs text-txt-primary focus:outline-none focus:border-dnd-gold/60"
              />
              <span className="text-txt-muted">lb</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function InventoryList() {
  const { character, dispatch } = useCharacter()
  const [showAll, setShowAll] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const items = showAll ? character.inventory : character.inventory.slice(0, 10)
  const totalWeight = character.inventory.reduce(
    (sum, i) => sum + (i.weight ?? 0) * i.quantity,
    0,
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = character.inventory.findIndex((i) => i.id === active.id)
    const to = character.inventory.findIndex((i) => i.id === over.id)
    if (from !== -1 && to !== -1) {
      dispatch({ type: 'REORDER_INVENTORY', payload: { from, to } })
    }
  }

  function addItem() {
    dispatch({
      type: 'ADD_INVENTORY_ITEM',
      payload: {
        id: crypto.randomUUID(),
        name: 'New item',
        quantity: 1,
        weight: null,
        equipped: false,
        notes: '',
        isMagic: false,
      },
    })
  }

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={character.inventory.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {items.map((item) => (
              <InventoryRow
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {character.inventory.length > 10 && (
        <button
          className="w-full text-xs text-txt-muted hover:text-txt-secondary py-1 text-center"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? '▲ Show less' : `▼ Show all ${character.inventory.length} items`}
        </button>
      )}

      <button
        onClick={addItem}
        className="w-full mt-1 py-1.5 rounded border border-dashed border-sheet-border text-xs text-txt-muted hover:text-txt-secondary hover:border-dnd-gold/40 transition-colors"
      >
        + Add item
      </button>
    </SectionCard>
  )
}
