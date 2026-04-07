import { CharacterProvider } from './context/CharacterContext'
import { CharacterSheetLayout } from './components/layout/CharacterSheetLayout'

function App() {
  return (
    <CharacterProvider>
      <CharacterSheetLayout />
    </CharacterProvider>
  )
}

export default App
