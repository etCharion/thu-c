import { useState, useCallback } from 'react'

export type ColumnId = 'left' | 'center' | 'right'
export type LayoutConfig = Record<ColumnId, string[]>

export const DEFAULT_LAYOUT: LayoutConfig = {
  left: ['ability-scores', 'saving-throws', 'skills', 'proficiencies'],
  center: ['features', 'inventory'],
  right: ['combat-stats', 'hit-points', 'death-saves', 'rest', 'ki-tracker', 'ki-abilities', 'attacks'],
}

const STORAGE_KEY = 'thu-c-layout'

function loadLayout(): LayoutConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_LAYOUT
    const parsed = JSON.parse(raw) as LayoutConfig
    // Ensure all panels from the default are represented (handles new panels added later)
    const allDefault = Object.values(DEFAULT_LAYOUT).flat()
    const allStored = Object.values(parsed).flat()
    const missing = allDefault.filter((id) => !allStored.includes(id))
    if (missing.length > 0) {
      return { ...parsed, right: [...(parsed.right ?? []), ...missing] }
    }
    return parsed
  } catch {
    return DEFAULT_LAYOUT
  }
}

export function useLayoutConfig() {
  const [layout, setLayoutState] = useState<LayoutConfig>(loadLayout)

  const setLayout = useCallback((next: LayoutConfig) => {
    setLayoutState(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // localStorage not available (private mode, etc.)
    }
  }, [])

  const findColumn = useCallback(
    (panelId: string): ColumnId | null => {
      for (const col of ['left', 'center', 'right'] as ColumnId[]) {
        if (layout[col].includes(panelId)) return col
      }
      return null
    },
    [layout],
  )

  return { layout, setLayout, findColumn }
}
