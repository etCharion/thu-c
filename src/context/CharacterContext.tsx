import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import type { Character, DeathSaves, InventoryItem, LevelUpPayload } from '../types/character'
import { proficiencyBonus, totalLevel, monkLevel, kiMax } from '../lib/dnd5e'
import { subscribeToCharacter, saveCharacter } from '../lib/firestore'
import { CHARACTER_SEED } from '../constants/characterSeed'

// ── Actions ─────────────────────────────────────────────────────────────────

type CharacterAction =
  | { type: 'LOAD_CHARACTER'; payload: Character }
  | { type: 'SET_HP'; payload: number }
  | { type: 'SET_TEMP_HP'; payload: number }
  | { type: 'SET_FOCUS'; payload: number }
  | { type: 'SET_DEATH_SAVES'; payload: DeathSaves }
  | { type: 'SET_HIT_DICE'; payload: number }
  | { type: 'USE_FEATURE'; payload: { id: string } }
  | { type: 'RESTORE_FEATURE'; payload: { id: string } }
  | { type: 'UPDATE_INVENTORY'; payload: Partial<InventoryItem> & { id: string } }
  | { type: 'ADD_INVENTORY_ITEM'; payload: InventoryItem }
  | { type: 'REMOVE_INVENTORY_ITEM'; payload: { id: string } }
  | { type: 'REORDER_INVENTORY'; payload: { from: number; to: number } }
  | { type: 'SET_GOLD'; payload: number }
  | { type: 'SET_INSPIRATION'; payload: boolean }
  | { type: 'SHORT_REST'; payload: { hpRecovered: number } }
  | { type: 'LONG_REST' }
  | { type: 'LEVEL_UP'; payload: LevelUpPayload }
  | { type: 'UPDATE_CHARACTER'; payload: Partial<Character> }
  | { type: 'REORDER_FEATURES'; payload: { from: number; to: number } }

// ── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: Character, action: CharacterAction): Character {
  switch (action.type) {
    case 'LOAD_CHARACTER':
      return action.payload

    case 'SET_HP':
      return {
        ...state,
        hitPoints: {
          ...state.hitPoints,
          current: Math.max(0, Math.min(action.payload, state.hitPoints.max)),
        },
      }

    case 'SET_TEMP_HP':
      return {
        ...state,
        hitPoints: { ...state.hitPoints, temp: Math.max(0, action.payload) },
      }

    case 'SET_FOCUS':
      return {
        ...state,
        focusPoints: {
          ...state.focusPoints,
          current: Math.max(0, Math.min(action.payload, state.focusPoints.max)),
        },
      }

    case 'SET_DEATH_SAVES':
      return { ...state, deathSaves: action.payload }

    case 'SET_HIT_DICE':
      return {
        ...state,
        hitDiceRemaining: Math.max(0, Math.min(action.payload, state.hitDiceTotal)),
      }

    case 'USE_FEATURE': {
      const feature = state.classFeatures.find((f) => f.id === action.payload.id)
      const kiCost =
        feature?.resourceType === 'ki' ? (feature.resourceCost ?? 1) : 0
      return {
        ...state,
        focusPoints: kiCost > 0
          ? { ...state.focusPoints, current: Math.max(0, state.focusPoints.current - kiCost) }
          : state.focusPoints,
        classFeatures: state.classFeatures.map((f) =>
          f.id === action.payload.id && f.usesRemaining !== null
            ? { ...f, usesRemaining: Math.max(0, f.usesRemaining - 1) }
            : f,
        ),
      }
    }

    case 'RESTORE_FEATURE':
      return {
        ...state,
        classFeatures: state.classFeatures.map((f) =>
          f.id === action.payload.id && f.usesRemaining !== null && f.usesMax !== null
            ? { ...f, usesRemaining: Math.min(f.usesMax, f.usesRemaining + 1) }
            : f,
        ),
      }

    case 'UPDATE_INVENTORY':
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item,
        ),
      }

    case 'ADD_INVENTORY_ITEM':
      return { ...state, inventory: [...state.inventory, action.payload] }

    case 'REMOVE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter((item) => item.id !== action.payload.id),
      }

    case 'REORDER_INVENTORY': {
      const inv = [...state.inventory]
      const [moved] = inv.splice(action.payload.from, 1)
      inv.splice(action.payload.to, 0, moved)
      return { ...state, inventory: inv }
    }

    case 'REORDER_FEATURES': {
      const features = [...state.classFeatures]
      const [moved] = features.splice(action.payload.from, 1)
      features.splice(action.payload.to, 0, moved)
      return { ...state, classFeatures: features }
    }

    case 'SET_GOLD':
      return { ...state, gold: Math.max(0, action.payload) }

    case 'SET_INSPIRATION':
      return { ...state, inspiration: action.payload }

    case 'SHORT_REST': {
      const hpAfterRest = Math.min(
        state.hitPoints.current + action.payload.hpRecovered,
        state.hitPoints.max,
      )
      return {
        ...state,
        hitPoints: { ...state.hitPoints, current: hpAfterRest },
        focusPoints: { ...state.focusPoints, current: state.focusPoints.max },
        classFeatures: state.classFeatures.map((f) =>
          f.resetsOn === 'short' && f.usesMax !== null
            ? { ...f, usesRemaining: f.usesMax }
            : f,
        ),
      }
    }

    case 'LONG_REST': {
      const halfDice = Math.floor(state.hitDiceTotal / 2)
      return {
        ...state,
        hitPoints: { ...state.hitPoints, current: state.hitPoints.max, temp: 0 },
        focusPoints: { ...state.focusPoints, current: state.focusPoints.max },
        hitDiceRemaining: Math.min(state.hitDiceTotal, state.hitDiceRemaining + halfDice),
        deathSaves: { successes: 0, failures: 0 },
        classFeatures: state.classFeatures.map((f) =>
          (f.resetsOn === 'short' || f.resetsOn === 'long') && f.usesMax !== null
            ? { ...f, usesRemaining: f.usesMax }
            : f,
        ),
      }
    }

    case 'LEVEL_UP': {
      const p = action.payload
      const newProfBonus = proficiencyBonus(totalLevel(p.classes))
      const newKiMax = kiMax(monkLevel(p.classes))
      return {
        ...state,
        classes: p.classes,
        abilityScores: p.abilityScores,
        hitPoints: {
          ...p.hitPoints,
          current: Math.min(state.hitPoints.current, p.hitPoints.max),
        },
        proficiencyBonus: newProfBonus,
        focusPoints: { current: state.focusPoints.current, max: newKiMax },
        attacks: p.attacks,
        classFeatures: p.classFeatures,
        proficienciesWeapons: p.proficienciesWeapons,
        proficienciesTools: p.proficienciesTools,
        languages: p.languages,
        armorClass: p.armorClass,
        speed: p.speed,
      }
    }

    case 'UPDATE_CHARACTER':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface CharacterContextValue {
  character: Character
  dispatch: React.Dispatch<CharacterAction>
  isLoading: boolean
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, dispatch] = useReducer(reducer, CHARACTER_SEED)
  const [isLoading, setIsLoading] = React.useState(true)
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRemoteUpdate = useRef(false)

  // Debounced Firestore sync on state changes
  const syncToFirestore = useCallback((state: Character) => {
    if (pendingRef.current) clearTimeout(pendingRef.current)
    pendingRef.current = setTimeout(() => {
      // Use saveCharacter to ensure ALL fields are persisted,
      // including new ones added to the type definition.
      saveCharacter(state).catch(console.error)
    }, 300)
  }, [])

  // Subscribe to Firestore
  useEffect(() => {
    const unsub = subscribeToCharacter(
      (data) => {
        if (!data) {
          // No document yet — seed it
          saveCharacter(CHARACTER_SEED)
            .then(() => setIsLoading(false))
            .catch(console.error)
          return
        }

        // Migrate incorrect name if needed
        const fixedData: Character = data.name === "Vrchní Šišník Thu'C"
          ? { ...data, name: "Vrchní Číšník Thu'C" }
          : data

        isRemoteUpdate.current = true
        dispatch({ type: 'LOAD_CHARACTER', payload: fixedData })
        setIsLoading(false)

        if (data.name !== fixedData.name) {
          // If migration happened, we want to save it back.
          // Since isRemoteUpdate is true, the useEffect will skip this,
          // so we manually trigger the sync.
          syncToFirestore(fixedData)
        }

        // Reset flag after dispatch. We use a timeout to ensure
        // the useEffect triggered by the dispatch has finished.
        setTimeout(() => {
          isRemoteUpdate.current = false
        }, 0)
      },
      (err) => {
        console.error('Firestore subscription error:', err)
        setIsLoading(false) // Stop loading on error so app doesn't hang
      },
    )
    return unsub
  }, [syncToFirestore])

  useEffect(() => {
    if (!isLoading && !isRemoteUpdate.current) {
      syncToFirestore(character)
    }
  }, [character, isLoading, syncToFirestore])

  return (
    <CharacterContext.Provider value={{ character, dispatch, isLoading }}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const ctx = useContext(CharacterContext)
  if (!ctx) throw new Error('useCharacter must be used inside CharacterProvider')
  return ctx
}
