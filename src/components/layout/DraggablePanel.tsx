import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PANEL_COMPONENTS } from './PanelRegistry'

interface DraggablePanelProps {
  id: string
  isOverlay?: boolean
}

const DRAG_HANDLE_CLASS =
  'flex-shrink-0 text-txt-muted/50 hover:text-txt-muted cursor-grab active:cursor-grabbing touch-none select-none text-sm leading-none px-0.5'

// Standalone version used inside DragOverlay (no sortable hooks)
export function PanelOverlay({ id }: { id: string }) {
  const Component = PANEL_COMPONENTS[id]
  if (!Component) return null
  return (
    <div className="opacity-90 pointer-events-none">
      <Component />
    </div>
  )
}

export function DraggablePanel({ id }: DraggablePanelProps) {
  const Component = PANEL_COMPONENTS[id]
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  if (!Component) return null

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 1 : undefined,
  }

  // We inject the drag handle via a wrapper that overlays the SectionCard header.
  // We use a negative-margin trick to float the handle on top of the card header
  // without modifying every individual panel component.
  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle – absolutely positioned over the card header */}
      <button
        {...listeners}
        {...attributes}
        className={`absolute top-0 left-0 z-10 h-[29px] w-6 flex items-center justify-center
          ${DRAG_HANDLE_CLASS}
          opacity-0 group-hover:opacity-100 transition-opacity`}
        tabIndex={-1}
        aria-label="Přetáhnout panel"
      >
        ⠿
      </button>
      <Component />
    </div>
  )
}
