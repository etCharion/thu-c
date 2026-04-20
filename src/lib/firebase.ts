import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Validation to help troubleshooting
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.warn(`Firebase config missing key: ${key}. Check your .env file.`)
  }
})

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Troubleshooting: Check for IndexedDB availability (can be blocked in Firefox Private mode)
if (typeof window !== 'undefined') {
  const request = window.indexedDB.open('test-persistence');
  request.onerror = () => {
    console.error('IndexedDB is blocked or unavailable. Firestore persistence may be degraded in this browser (e.g., Firefox Private mode or strict tracking protection).');
  };
  request.onsuccess = () => {
    window.indexedDB.deleteDatabase('test-persistence');
  };
}

export const CHARACTER_ID = import.meta.env.VITE_CHARACTER_ID ?? 'thu-c'
