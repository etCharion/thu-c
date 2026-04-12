import { useState } from 'react'
import type { LevelUpDraft } from '../../hooks/useLevelUpDraft'
import type { DraftAction } from '../../hooks/useLevelUpDraft'

type ProfField = 'proficienciesWeapons' | 'proficienciesTools' | 'languages'

interface TagSectionProps {
  title: string
  field: ProfField
  items: string[]
  dispatch: React.Dispatch<DraftAction>
}

function TagSection({ title, field, items, dispatch }: TagSectionProps) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const val = input.trim()
    if (!val) return
    dispatch({ type: 'ADD_PROFICIENCY', payload: { field, value: val } })
    setInput('')
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs text-txt-muted uppercase tracking-wider">{title}</h3>
      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sheet-elevated border border-sheet-border text-xs text-txt-secondary"
          >
            {item}
            <button
              onClick={() => dispatch({ type: 'REMOVE_PROFICIENCY', payload: { field, index: i } })}
              className="text-txt-muted hover:text-dnd-red ml-0.5 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="text-xs text-txt-muted italic">None</span>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
          placeholder={`Add ${title.toLowerCase()}…`}
          className="flex-1 bg-sheet-bg border border-sheet-border rounded px-2 py-1 text-xs text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-dnd-gold/60"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1 rounded bg-dnd-gold/20 border border-dnd-gold/40 text-dnd-gold text-xs hover:bg-dnd-gold/30 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}

interface Props {
  draft: LevelUpDraft
  dispatch: React.Dispatch<DraftAction>
}

export function LevelUpProficienciesTab({ draft, dispatch }: Props) {
  return (
    <div className="space-y-6">
      <TagSection
        title="Weapons"
        field="proficienciesWeapons"
        items={draft.proficienciesWeapons}
        dispatch={dispatch}
      />
      <TagSection
        title="Tools"
        field="proficienciesTools"
        items={draft.proficienciesTools}
        dispatch={dispatch}
      />
      <TagSection
        title="Languages"
        field="languages"
        items={draft.languages}
        dispatch={dispatch}
      />
    </div>
  )
}
