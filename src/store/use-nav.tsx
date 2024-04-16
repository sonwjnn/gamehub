import { create } from 'zustand'

interface NavStore {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

export const useNav = create<NavStore>(set => ({
  isOpen: false,
  setOpen: isOpen => set({ isOpen }),
}))
