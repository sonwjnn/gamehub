import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TableBrightnessProps {
  tableBrightness: 'dim' | 'normal' | 'bright'
  setTableBrightness: (tableBrightness: 'dim' | 'normal' | 'bright') => void
}

export const useTableBrightness = create<TableBrightnessProps>()(
  persist(
    set => ({
      tableBrightness: 'normal',
      setTableBrightness: tableBrightness => set({ tableBrightness }),
    }),
    {
      name: 'table-brightness-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
