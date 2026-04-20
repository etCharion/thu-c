import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db, CHARACTER_ID } from './firebase'
import type { Character } from '../types/character'

function charRef() {
  return doc(db, 'characters', CHARACTER_ID)
}

export async function loadCharacter(): Promise<Character | null> {
  const snap = await getDoc(charRef())
  if (!snap.exists()) return null
  return snap.data() as Character
}

export async function saveCharacter(character: Character): Promise<void> {
  await setDoc(charRef(), { ...character, updatedAt: Date.now() })
}

export async function updateCharacterField(
  updates: Record<string, unknown>,
): Promise<void> {
  await updateDoc(charRef(), { ...updates, updatedAt: serverTimestamp() })
}

export function subscribeToCharacter(
  onData: (character: Character | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  return onSnapshot(
    charRef(),
    (snap) => {
      onData(snap.exists() ? (snap.data() as Character) : null)
    },
    (err) => {
      console.error('Firestore subscription error:', err)
      onError?.(err)
    },
  )
}
