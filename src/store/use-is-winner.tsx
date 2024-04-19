import { create } from 'zustand'

interface WinnerStore {
  isWinner: boolean
  setIsWinner: (isWinner: boolean) => void
}

export const useIsWinner = create<WinnerStore>(set => ({
  isWinner: false,
  setIsWinner: isWinner => set({ isWinner }),
}))
