import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useLayoutConfig } from '../../hooks/useLayoutConfig'
import type { ColumnId, LayoutConfig } from '../../hooks/useLayoutConfig'
import { DroppableColumn } from './DroppableColumn'
import { PanelOverlay } from './DraggablePanel'

const COLUMNS: ColumnId[] = ['left', 'center', 'right']

export function DraggableLayout() {
  const { layout, setLayout, findColumn } = useLayoutConfig()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 8 } }),
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeCol = findColumn(activeId)
    // overId can be either a column ID (dropped onto empty column) or a panel ID
    const overCol: ColumnId | null = COLUMNS.includes(overId as ColumnId)
      ? (overId as ColumnId)
      : findColumn(overId)

    if (!activeCol || !overCol) return

    if (activeCol === overCol) {
      // Same-column reorder
      const oldIndex = layout[activeCol].indexOf(activeId)
      const newIndex = layout[activeCol].indexOf(overId)
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setLayout({ ...layout, [activeCol]: arrayMove(layout[activeCol], oldIndex, newIndex) })
      }
    } else {
      // Cross-column move – only update on drop (dragEnd), never during dragOver
      const next: LayoutConfig = {
        left: [...layout.left],
        center: [...layout.center],
        right: [...layout.right],
      }
      // Remove from source column
      next[activeCol] = next[activeCol].filter((id) => id !== activeId)
      // Insert into target column: before the hovered panel, or append
      const overIndex = next[overCol].indexOf(overId)
      if (overIndex >= 0) {
        next[overCol].splice(overIndex, 0, activeId)
      } else {
        next[overCol].push(activeId)
      }
      setLayout(next)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-3">
        <DroppableColumn columnId="left" panelIds={layout.left} activeId={activeId} />
        <DroppableColumn columnId="center" panelIds={layout.center} activeId={activeId} />
        <DroppableColumn columnId="right" panelIds={layout.right} activeId={activeId} />
      </div>

      <DragOverlay dropAnimation={null}>
        {activeId ? <PanelOverlay id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
