import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AutoRebuyProps {
  isAutoRebuy: boolean
  autoRebuyAmount: number
  setAutoRebuy: ({
    isAutoRebuy,
    autoRebuyAmount,
  }: {
    isAutoRebuy?: boolean
    autoRebuyAmount?: number
  }) => void
}

export const useAutoRebuy = create<AutoRebuyProps>()(
  persist(
    set => ({
      isAutoRebuy: false,
      autoRebuyAmount: 0,
      setAutoRebuy: ({ isAutoRebuy, autoRebuyAmount }) => {
        set(state => ({
          ...state,
          isAutoRebuy: isAutoRebuy ?? state.isAutoRebuy,
          autoRebuyAmount: autoRebuyAmount ?? state.autoRebuyAmount,
        }))
      },
    }),
    {
      name: 'auto-rebuy-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
