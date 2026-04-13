import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PANEL_COMPONENTS } from './PanelRegistry'

interface DraggablePanelProps {
  id: string
  isActive?: boolean
}

// Standalone version used inside DragOverlay – no sortable hooks
export function PanelOverlay({ id }: { id: string }) {
  const Component = PANEL_COMPONENTS[id]
  if (!Component) return null
  return (
    <div className="opacity-90 pointer-events-none rotate-1 scale-[1.02] shadow-2xl">
      <Component />
    </div>
  )
}

export function DraggablePanel({ id, isActive = false }: DraggablePanelProps) {
  const Component = PANEL_COMPONENTS[id]
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  if (!Component) return null

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      // When this panel is the one being dragged, hide it in place so the
      // DragOverlay shows the floating copy. We keep it mounted so useSortable
      // is never unmounted mid-drag (avoids React hook-count errors).
      className={`relative group ${isActive ? 'opacity-0 pointer-events-none' : ''}`}
    >
      {/* Drag handle – appears on hover over the card header area */}
      <button
        {...listeners}
        {...attributes}
        className="absolute top-0 left-0 z-10 h-[29px] w-6 flex items-center justify-center
          text-txt-muted/40 hover:text-txt-muted cursor-grab active:cursor-grabbing
          touch-none select-none text-sm leading-none
          opacity-0 group-hover:opacity-100 transition-opacity"
        tabIndex={-1}
        aria-label="Přetáhnout panel"
      >
        ⠿
      </button>
      <Component />
    </div>
  )
}
