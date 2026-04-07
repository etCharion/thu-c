import { useCharacter } from '../../context/CharacterContext'

export function CharacterHeader() {
  const { character } = useCharacter()
  const classStr = character.classes.map((c) => `${c.name} ${c.level}`).join(' / ')

  return (
    <div className="bg-sheet-surface border border-sheet-border rounded-lg shadow-card px-4 py-3 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-2xl font-bold text-txt-primary tracking-wide truncate">
          {character.name}
        </h1>
        <div className="flex flex-wrap gap-3 mt-1 text-xs text-txt-secondary">
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
        <div className="flex items-center gap-1.5">
          {character.inspiration && (
            <span className="px-2 py-0.5 rounded-full bg-dnd-gold text-black text-xs font-bold font-display">
              INSPIRATION
            </span>
          )}
          <div className="text-xs text-txt-muted">
            <span className="text-txt-secondary">Proficiency</span>{' '}
            <span className="text-txt-primary font-bold">+{character.proficiencyBonus}</span>
          </div>
        </div>
        <div className="flex gap-2 text-xs text-txt-secondary">
          {character.resistances.map((r) => (
            <span
              key={r}
              className="px-1.5 py-0.5 rounded bg-blue-900 border border-blue-700 text-blue-300 capitalize"
            >
              ⚡ {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
