interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
  titleRight?: React.ReactNode
}

export function SectionCard({ title, children, className = '', titleRight }: SectionCardProps) {
  return (
    <div className={`bg-sheet-surface border border-sheet-border rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-sheet-elevated border-b border-sheet-border">
        <h3 className="font-display text-xs font-semibold tracking-widest uppercase text-dnd-gold">
          {title}
        </h3>
        {titleRight}
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}
