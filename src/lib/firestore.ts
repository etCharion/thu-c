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

// Helper to sanitize data for Firestore (remove undefined, as it's not supported)
function sanitizeData(data: any): any {
  return JSON.parse(JSON.stringify(data, (_, value) =>
    value === undefined ? null : value
  ));
}

export async function saveCharacter(character: Character): Promise<void> {
  console.log('Attempting to save character to Firestore...', { id: character.id });
  try {
    const data = sanitizeData({ ...character, updatedAt: Date.now() });
    await setDoc(charRef(), data);
    console.log('Character saved successfully');
  } catch (error) {
    console.error('Error in saveCharacter:', error);
    throw error; // Re-throw to handle it in the caller
  }
}

export async function updateCharacterField(
  updates: Record<string, unknown>,
): Promise<void> {
  console.log('Attempting to update character fields...', updates);
  try {
    await updateDoc(charRef(), { ...updates, updatedAt: serverTimestamp() });
    console.log('Fields updated successfully');
  } catch (error) {
    console.error('Error in updateCharacterField:', error);
    throw error;
  }
}

export function subscribeToCharacter(
  onData: (character: Character | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  console.log('Starting Firestore subscription for character...');
  return onSnapshot(
    charRef(),
    (snap) => {
      console.log('Firestore snapshot received. Exists:', snap.exists());
      onData(snap.exists() ? (snap.data() as Character) : null)
    },
    (err) => {
      console.error('Firestore subscription error:', err)
      onError?.(err)
    },
  )
}
