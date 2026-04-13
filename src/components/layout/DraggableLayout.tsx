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
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
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

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const activeId = active.id as string
    const overId = over.id as string

    const activeCol = findColumn(activeId)
    // overId can be a column ID or a panel ID
    const overCol = (COLUMNS.includes(overId as ColumnId)
      ? overId
      : findColumn(overId)) as ColumnId | null

    if (!activeCol || !overCol || activeCol === overCol) return

    // Move panel from one column to another, inserting before the hovered item
    setLayout(
      ((): LayoutConfig => {
        const next = {
          left: [...layout.left],
          center: [...layout.center],
          right: [...layout.right],
        }
        // Remove from source
        next[activeCol] = next[activeCol].filter((id) => id !== activeId)
        // Insert into target: before the hovered panel, or at the end
        const overIndex = next[overCol].indexOf(overId)
        if (overIndex >= 0) {
          next[overCol].splice(overIndex, 0, activeId)
        } else {
          next[overCol].push(activeId)
        }
        return next
      })(),
    )
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId = over.id as string
    const col = findColumn(activeId)
    if (!col) return

    // Same-column reorder
    const oldIndex = layout[col].indexOf(activeId)
    const newIndex = layout[col].indexOf(overId)
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setLayout({ ...layout, [col]: arrayMove(layout[col], oldIndex, newIndex) })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-3">
        <DroppableColumn columnId="left" panelIds={layout.left} />
        <DroppableColumn columnId="center" panelIds={layout.center} />
        <DroppableColumn columnId="right" panelIds={layout.right} />
      </div>

      <DragOverlay>
        {activeId ? <PanelOverlay id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
