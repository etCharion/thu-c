import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DraggablePanel } from './DraggablePanel'
import type { ColumnId } from '../../hooks/useLayoutConfig'

interface DroppableColumnProps {
  columnId: ColumnId
  panelIds: string[]
  className?: string
}

export function DroppableColumn({ columnId, panelIds, className = '' }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })

  return (
    <SortableContext items={panelIds} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[60px] rounded-lg transition-colors ${
          isOver ? 'ring-1 ring-dnd-gold/30 bg-dnd-gold/5' : ''
        } ${className}`}
      >
        {panelIds.map((id) => (
          <DraggablePanel key={id} id={id} />
        ))}
        {panelIds.length === 0 && (
          <div className="h-16 rounded-lg border border-dashed border-sheet-border flex items-center justify-center text-xs text-txt-muted">
            Přetáhni sem panel
          </div>
        )}
      </div>
    </SortableContext>
  )
}
