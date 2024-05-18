import { create } from 'zustand'

interface TableBrightnessStore {
  tableBrightness: 'dim' | 'normal' | 'bright'
  setTableBrightness: (tableBrightness: 'dim' | 'normal' | 'bright') => void
}

export const useIsTableBrightness = create<TableBrightnessStore>(set => ({
  tableBrightness: 'normal',
  setTableBrightness: tableBrightness => set({ tableBrightness }),
}))
