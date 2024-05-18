import { create } from 'zustand'

interface FoldedStore {
  isFolded: boolean
  setIsFolded: (isFolded: boolean) => void
}

export const useIsFolded = create<FoldedStore>(set => ({
  isFolded: true,
  setIsFolded: isFolded => set({ isFolded }),
}))
