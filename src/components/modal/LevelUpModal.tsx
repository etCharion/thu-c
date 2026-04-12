import { useState, useEffect, useRef } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { useLevelUpDraft } from '../../hooks/useLevelUpDraft'
import { LevelUpOverviewTab } from './LevelUpOverviewTab'
import { LevelUpFeaturesTab } from './LevelUpFeaturesTab'
import { LevelUpAttacksTab } from './LevelUpAttacksTab'
import { LevelUpAbilityScoresTab } from './LevelUpAbilityScoresTab'
import { LevelUpProficienciesTab } from './LevelUpProficienciesTab'

type TabKey = 'overview' | 'features' | 'attacks' | 'ability' | 'proficiencies'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'features', label: 'Features' },
  { key: 'attacks', label: 'Attacks' },
  { key: 'ability', label: 'Ability Scores' },
  { key: 'proficiencies', label: 'Proficiencies' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function LevelUpModal({ isOpen, onClose }: Props) {
  const { character, dispatch } = useCharacter()
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const { draft, derivedStats, dispatch: draftDispatch, buildPayload } = useLevelUpDraft(character)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  // Focus first element when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFocusRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSave = () => {
    dispatch({ type: 'LEVEL_UP', payload: buildPayload() })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Level Up"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-3xl bg-sheet-surface border border-sheet-border rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sheet-border">
          <h2 className="font-display text-xl font-bold text-dnd-gold tracking-wide">Level Up</h2>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="text-txt-muted hover:text-txt-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-sheet-border px-5 gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-xs font-display tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-dnd-gold text-dnd-gold'
                  : 'border-transparent text-txt-muted hover:text-txt-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'overview' && (
            <LevelUpOverviewTab draft={draft} derivedStats={derivedStats} dispatch={draftDispatch} />
          )}
          {activeTab === 'features' && (
            <LevelUpFeaturesTab draft={draft} dispatch={draftDispatch} />
          )}
          {activeTab === 'attacks' && (
            <LevelUpAttacksTab draft={draft} dispatch={draftDispatch} />
          )}
          {activeTab === 'ability' && (
            <LevelUpAbilityScoresTab
              draft={draft}
              originalScores={character.abilityScores}
              dispatch={draftDispatch}
            />
          )}
          {activeTab === 'proficiencies' && (
            <LevelUpProficienciesTab draft={draft} dispatch={draftDispatch} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-sheet-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-sheet-border text-txt-secondary text-sm hover:text-txt-primary hover:border-txt-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded bg-dnd-gold/20 border border-dnd-gold/50 text-dnd-gold text-sm font-display tracking-wider hover:bg-dnd-gold/30 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
