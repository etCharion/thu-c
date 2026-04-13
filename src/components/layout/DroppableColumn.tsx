import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DraggablePanel } from './DraggablePanel'
import type { ColumnId } from '../../hooks/useLayoutConfig'

interface DroppableColumnProps {
  columnId: ColumnId
  panelIds: string[]
  activeId: string | null
  className?: string
}

export function DroppableColumn({ columnId, panelIds, activeId, className = '' }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })

  // Panels visible in this column – during drag we keep the dragged panel in its
  // original column (just hidden) so useSortable is never unmounted mid-drag.
  const visibleIds = panelIds

  return (
    <SortableContext items={visibleIds} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`space-y-3 min-h-[60px] rounded-lg transition-colors ${
          isOver && activeId ? 'ring-1 ring-dnd-gold/40 bg-dnd-gold/5' : ''
        } ${className}`}
      >
        {visibleIds.map((id) => (
          <DraggablePanel key={id} id={id} isActive={id === activeId} />
        ))}
        {visibleIds.length === 0 && (
          <div
            className={`h-16 rounded-lg border border-dashed flex items-center justify-center text-xs transition-colors ${
              isOver ? 'border-dnd-gold/60 text-dnd-gold/60' : 'border-sheet-border text-txt-muted'
            }`}
          >
            Přetáhni sem panel
          </div>
        )}
      </div>
    </SortableContext>
  )
}
