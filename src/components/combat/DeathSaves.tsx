import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'

export function DeathSaves() {
  const { character, dispatch } = useCharacter()
  const { successes, failures } = character.deathSaves

  function toggle(type: 'successes' | 'failures', idx: number) {
    const current = character.deathSaves[type]
    const newVal = idx < current ? current - 1 : idx + 1
    dispatch({
      type: 'SET_DEATH_SAVES',
      payload: { ...character.deathSaves, [type]: Math.min(3, Math.max(0, newVal)) },
    })
  }

  return (
    <SectionCard title="Death Saves">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-dnd-green">Successes</span>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => toggle('successes', i)}
                className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  i < successes
                    ? 'bg-dnd-green border-dnd-green'
                    : 'bg-transparent border-txt-muted hover:border-dnd-green'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-dnd-red">Failures</span>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => toggle('failures', i)}
                className={`w-5 h-5 rounded-full border-2 transition-colors ${
                  i < failures
                    ? 'bg-dnd-red border-dnd-red'
                    : 'bg-transparent border-txt-muted hover:border-dnd-red'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
