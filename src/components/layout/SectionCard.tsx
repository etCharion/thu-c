interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
  titleRight?: React.ReactNode
  titleLeft?: React.ReactNode
}

export function SectionCard({ title, children, className = '', titleRight, titleLeft }: SectionCardProps) {
  return (
    <div className={`bg-sheet-surface border border-sheet-border border-l-[3px] border-l-dnd-red rounded-lg shadow-card overflow-hidden ${className}`}>
      {/* Dark navy header – DnDB section header style */}
      <div className="flex items-center justify-between px-3 py-2 bg-dnd-navy border-b border-dnd-navy">
        <div className="flex items-center gap-1.5 min-w-0">
          {titleLeft}
          <h3 className="font-display text-xs font-bold tracking-widest uppercase text-white/75">
            {title}
          </h3>
        </div>
        {titleRight}
      </div>
      {/* Light content area */}
      <div className="p-3">{children}</div>
    </div>
  )
}
