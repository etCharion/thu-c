import { useReducer, useMemo } from 'react'
import type { Character, ClassFeature, Attack, AbilityScores, HitPoints, LevelUpPayload } from '../types/character'
import { proficiencyBonus, totalLevel, monkLevel, kiMax, martialArtsDie } from '../lib/dnd5e'

export interface LevelUpDraft {
  classes: Array<{ name: string; level: number }>
  abilityScores: AbilityScores
  hitPoints: HitPoints
  attacks: Attack[]
  classFeatures: ClassFeature[]
  proficienciesWeapons: string[]
  proficienciesTools: string[]
  languages: string[]
  armorClass: number
  speed: number
}

export type DraftAction =
  | { type: 'SET_CLASS_LEVEL'; payload: { index: number; level: number } }
  | { type: 'ADD_CLASS'; payload: { name: string; level: number } }
  | { type: 'REMOVE_CLASS'; payload: { index: number } }
  | { type: 'SET_ABILITY_SCORE'; payload: { ability: keyof AbilityScores; value: number } }
  | { type: 'SET_MAX_HP'; payload: number }
  | { type: 'SET_AC'; payload: number }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'ADD_FEATURE'; payload: ClassFeature }
  | { type: 'BULK_ADD_FEATURES'; payload: ClassFeature[] }
  | { type: 'UPDATE_FEATURE'; payload: { index: number; feature: ClassFeature } }
  | { type: 'REMOVE_FEATURE'; payload: { index: number } }
  | { type: 'MOVE_FEATURE'; payload: { from: number; to: number } }
  | { type: 'ADD_ATTACK'; payload: Attack }
  | { type: 'UPDATE_ATTACK'; payload: { index: number; attack: Attack } }
  | { type: 'REMOVE_ATTACK'; payload: { index: number } }
  | { type: 'ADD_PROFICIENCY'; payload: { field: 'proficienciesWeapons' | 'proficienciesTools' | 'languages'; value: string } }
  | { type: 'REMOVE_PROFICIENCY'; payload: { field: 'proficienciesWeapons' | 'proficienciesTools' | 'languages'; index: number } }

function draftReducer(state: LevelUpDraft, action: DraftAction): LevelUpDraft {
  switch (action.type) {
    case 'SET_CLASS_LEVEL':
      return {
        ...state,
        classes: state.classes.map((c, i) =>
          i === action.payload.index ? { ...c, level: action.payload.level } : c,
        ),
      }

    case 'ADD_CLASS':
      return { ...state, classes: [...state.classes, action.payload] }

    case 'REMOVE_CLASS':
      return {
        ...state,
        classes: state.classes.filter((_, i) => i !== action.payload.index),
      }

    case 'SET_ABILITY_SCORE':
      return {
        ...state,
        abilityScores: { ...state.abilityScores, [action.payload.ability]: action.payload.value },
      }

    case 'SET_MAX_HP':
      return {
        ...state,
        hitPoints: { ...state.hitPoints, max: action.payload },
      }

    case 'SET_AC':
      return { ...state, armorClass: action.payload }

    case 'SET_SPEED':
      return { ...state, speed: action.payload }

    case 'ADD_FEATURE':
      return { ...state, classFeatures: [...state.classFeatures, action.payload] }

    case 'BULK_ADD_FEATURES':
      return { ...state, classFeatures: [...state.classFeatures, ...action.payload] }

    case 'UPDATE_FEATURE':
      return {
        ...state,
        classFeatures: state.classFeatures.map((f, i) =>
          i === action.payload.index ? action.payload.feature : f,
        ),
      }

    case 'REMOVE_FEATURE':
      return {
        ...state,
        classFeatures: state.classFeatures.filter((_, i) => i !== action.payload.index),
      }

    case 'MOVE_FEATURE': {
      const features = [...state.classFeatures]
      const [moved] = features.splice(action.payload.from, 1)
      features.splice(action.payload.to, 0, moved)
      return { ...state, classFeatures: features }
    }

    case 'ADD_ATTACK':
      return { ...state, attacks: [...state.attacks, action.payload] }

    case 'UPDATE_ATTACK':
      return {
        ...state,
        attacks: state.attacks.map((a, i) =>
          i === action.payload.index ? action.payload.attack : a,
        ),
      }

    case 'REMOVE_ATTACK':
      return {
        ...state,
        attacks: state.attacks.filter((_, i) => i !== action.payload.index),
      }

    case 'ADD_PROFICIENCY': {
      const { field, value } = action.payload
      if (state[field].includes(value)) return state
      return { ...state, [field]: [...state[field], value] }
    }

    case 'REMOVE_PROFICIENCY': {
      const { field, index } = action.payload
      return { ...state, [field]: state[field].filter((_, i) => i !== index) }
    }

    default:
      return state
  }
}

export interface DerivedStats {
  proficiencyBonus: number
  focusPointsMax: number
  martialArtsDie: number
}

export interface UseLevelUpDraftReturn {
  draft: LevelUpDraft
  derivedStats: DerivedStats
  dispatch: React.Dispatch<DraftAction>
  buildPayload: () => LevelUpPayload
}

export function useLevelUpDraft(character: Character): UseLevelUpDraftReturn {
  const initialDraft: LevelUpDraft = {
    classes: character.classes,
    abilityScores: character.abilityScores,
    hitPoints: character.hitPoints,
    attacks: character.attacks,
    classFeatures: character.classFeatures,
    proficienciesWeapons: character.proficienciesWeapons,
    proficienciesTools: character.proficienciesTools,
    languages: character.languages,
    armorClass: character.armorClass,
    speed: character.speed,
  }

  const [draft, dispatch] = useReducer(draftReducer, initialDraft)

  const derivedStats = useMemo((): DerivedStats => {
    const lvl = totalLevel(draft.classes)
    const ml = monkLevel(draft.classes)
    return {
      proficiencyBonus: proficiencyBonus(lvl),
      focusPointsMax: kiMax(ml),
      martialArtsDie: martialArtsDie(ml),
    }
  }, [draft.classes])

  const buildPayload = (): LevelUpPayload => ({
    classes: draft.classes,
    abilityScores: draft.abilityScores,
    hitPoints: draft.hitPoints,
    attacks: draft.attacks,
    classFeatures: draft.classFeatures,
    proficienciesWeapons: draft.proficienciesWeapons,
    proficienciesTools: draft.proficienciesTools,
    languages: draft.languages,
    armorClass: draft.armorClass,
    speed: draft.speed,
  })

  return { draft, derivedStats, dispatch, buildPayload }
}
