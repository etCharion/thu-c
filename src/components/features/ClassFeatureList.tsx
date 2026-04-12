import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { ClassFeatureItem } from './ClassFeatureItem'

export function ClassFeatureList() {
  const { character } = useCharacter()

  return (
    <SectionCard title="Features & Traits">
      <div className="space-y-2">
        {character.classFeatures.map((feature) => (
          <ClassFeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </SectionCard>
  )
}
