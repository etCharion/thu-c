import { useState } from 'react'
import { useCharacter } from '../../context/CharacterContext'
import { LevelUpModal } from '../modal/LevelUpModal'

export function CharacterHeader() {
  const { character, isFirestoreConnected } = useCharacter()
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false)
  const classStr = character.classes.map((c) => `${c.name} ${c.level}`).join(' / ')

  return (
    // Dark navy header bar – DnDB style
    <div className="bg-dnd-navy rounded-lg shadow-card px-4 py-3 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-2xl font-bold text-white tracking-wide truncate">
          {character.name}
        </h1>
        <div className="flex flex-wrap gap-2 mt-1 text-xs text-white/50">
          <span className="text-dnd-gold font-semibold">{classStr}</span>
          <span>·</span>
          <span>{character.race}</span>
          <span>·</span>
          <span>{character.background}</span>
          <span>·</span>
          <span>{character.alignment}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setIsLevelUpOpen(true)}
          className="px-3 py-1.5 rounded bg-dnd-red hover:bg-dnd-red/80 text-white text-xs font-display tracking-wider transition-colors"
        >
          Nastavení
        </button>
        <span
          title={isFirestoreConnected ? 'Firestore připojeno' : 'Firestore offline – změny uloženy lokálně'}
          className={`w-2 h-2 rounded-full ${isFirestoreConnected ? 'bg-green-400' : 'bg-yellow-400'}`}
        />
        <div className="flex items-center gap-1.5">
          {character.inspiration && (
            <span className="px-2 py-0.5 rounded-full bg-dnd-gold text-black text-xs font-bold font-display">
              INSPIRATION
            </span>
          )}
          <div className="text-xs text-white/50">
            <span className="text-white/70">Proficiency</span>{' '}
            <span className="text-white font-bold">+{character.proficiencyBonus}</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          {character.resistances.map((r) => (
            <span
              key={r}
              className="px-1.5 py-0.5 rounded border border-white/20 text-white/60 capitalize"
            >
              ⚡ {r}
            </span>
          ))}
        </div>
      </div>
      <LevelUpModal isOpen={isLevelUpOpen} onClose={() => setIsLevelUpOpen(false)} />
    </div>
  )
}
