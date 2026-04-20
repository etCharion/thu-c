import { useCharacter } from '../../context/CharacterContext'

export function LevelUpTroubleshootingTab() {
  const { isOnline } = useCharacter()

  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Present ✅' : 'Missing ❌',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Missing ❌',
    characterId: import.meta.env.VITE_CHARACTER_ID || 'thu-c (default)',
    status: isOnline ? 'Online ✅' : 'Offline ❌',
    userAgent: navigator.userAgent,
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-dnd-gold font-display text-lg mb-2">Troubleshooting Information</h3>
        <p className="text-txt-muted text-sm mb-4">
          If your data is not saving, please check the information below. This data helps identify if the application is correctly connected to Firebase.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded bg-black/20 border border-white/5">
          <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">Connection Status</div>
          <div className="text-white font-mono text-sm">{config.status}</div>
        </div>
        <div className="p-4 rounded bg-black/20 border border-white/5">
          <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">Character ID</div>
          <div className="text-white font-mono text-sm">{config.characterId}</div>
        </div>
        <div className="p-4 rounded bg-black/20 border border-white/5">
          <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">Firebase Project</div>
          <div className="text-white font-mono text-sm">{config.projectId}</div>
        </div>
        <div className="p-4 rounded bg-black/20 border border-white/5">
          <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">API Key</div>
          <div className="text-white font-mono text-sm">{config.apiKey}</div>
        </div>
      </div>

      <div className="p-4 rounded bg-black/20 border border-white/5">
        <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mb-1">Browser Info</div>
        <div className="text-white font-mono text-xs break-all">{config.userAgent}</div>
      </div>

      <div className="bg-dnd-red/10 border border-dnd-red/20 p-4 rounded text-xs text-dnd-red/80 space-y-2">
        <p className="font-bold">Important for Firefox Users:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If you are in <strong>Private Browsing</strong> mode, persistence might not work because IndexedDB is restricted.</li>
          <li>Ensure that <strong>Enhanced Tracking Protection</strong> is not blocking Firebase domains.</li>
          <li>Check the browser console (F12) for any "Permission Denied" errors from Firestore.</li>
        </ul>
      </div>
    </div>
  )
}
