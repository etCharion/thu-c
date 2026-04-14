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
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { ClassFeatureItem } from './ClassFeatureItem'
import type { FeatureActionType } from '../../types/character'

type FilterKey = 'all' | FeatureActionType

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',          label: 'Vše' },
  { key: 'action',       label: 'Action' },
  { key: 'bonus-action', label: 'Bonus' },
  { key: 'reaction',     label: 'Reaction' },
  { key: 'passive',      label: 'Passive' },
  { key: 'special',      label: 'Special' },
]

export function ClassFeatureList() {
  const { character, dispatch } = useCharacter()
  const [filter, setFilter] = useState<FilterKey>('all')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = character.classFeatures.findIndex((f) => f.id === active.id)
    const to = character.classFeatures.findIndex((f) => f.id === over.id)
    if (from !== -1 && to !== -1) {
      dispatch({ type: 'REORDER_FEATURES', payload: { from, to } })
    }
  }

  const filtered =
    filter === 'all'
      ? character.classFeatures
      : character.classFeatures.filter((f) => f.actionType === filter)

  const isDraggingEnabled = filter === 'all'

  return (
    <SectionCard title="Features & Traits">
      {/* Filter bar */}
      <div className="flex gap-1 flex-wrap px-1 pb-2 border-b border-sheet-border mb-2">
        {FILTERS.map(({ key, label }) => {
          // Count matching features for non-all filters
          const count =
            key === 'all'
              ? character.classFeatures.length
              : character.classFeatures.filter((f) => f.actionType === key).length
          if (key !== 'all' && count === 0) return null
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                filter === key
                  ? 'bg-dnd-gold/20 text-dnd-gold border-dnd-gold/50'
                  : 'bg-sheet-elevated text-txt-muted border-sheet-border hover:text-txt-secondary hover:border-sheet-border/80'
              }`}
            >
              {label}
              <span className={`ml-1 ${filter === key ? 'text-dnd-gold/70' : 'text-txt-muted/60'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <DndContext
        sensors={isDraggingEnabled ? sensors : []}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={character.classFeatures.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {filtered.map((feature) => (
              <ClassFeatureItem key={feature.id} feature={feature} />
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-txt-muted text-center py-4">Žádné features v této kategorii.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </SectionCard>
  )
}
