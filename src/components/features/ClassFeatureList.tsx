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

export function ClassFeatureList() {
  const { character, dispatch } = useCharacter()

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

  return (
    <SectionCard title="Features & Traits">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={character.classFeatures.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {character.classFeatures.map((feature) => (
              <ClassFeatureItem key={feature.id} feature={feature} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </SectionCard>
  )
}
