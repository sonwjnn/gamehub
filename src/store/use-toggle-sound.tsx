import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ToggleSoundProps {
  isSound: boolean
  setIsSound: (isSound: boolean) => void
}

export const useToggleSound = create<ToggleSoundProps>()(
  persist(
    set => ({
      isSound: true,
      setIsSound: (isSound: boolean) => set({ isSound }),
    }),
    {
      name: 'sound-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
