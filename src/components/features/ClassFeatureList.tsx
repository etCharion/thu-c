import { useCharacter } from '../../context/CharacterContext'
import { SectionCard } from '../layout/SectionCard'
import { ClassFeatureItem } from './ClassFeatureItem'

export function ClassFeatureList() {
  const { character } = useCharacter()

  return (
    <SectionCard title="Features & Traits">
      <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
        {character.classFeatures.map((feature) => (
          <ClassFeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </SectionCard>
  )
}
