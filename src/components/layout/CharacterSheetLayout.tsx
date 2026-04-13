import { CharacterHeader } from '../header/CharacterHeader'
import { DraggableLayout } from './DraggableLayout'

export function CharacterSheetLayout() {
  return (
    <div className="min-h-screen bg-sheet-bg p-3 lg:p-4 space-y-3">
      <CharacterHeader />
      <DraggableLayout />
    </div>
  )
}
