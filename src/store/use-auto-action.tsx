import { create } from 'zustand'

interface AutoActionProps {
  isChecked: boolean
  callAmount: number
  setAutoAction: ({
    isChecked,
    callAmount,
  }: {
    isChecked?: boolean
    callAmount?: number
  }) => void
}

export const useAutoAction = create<AutoActionProps>()(set => ({
  isChecked: false,
  callAmount: 0,
  setAutoAction: ({
    isChecked,
    callAmount,
  }: {
    isChecked?: boolean
    callAmount?: number
  }) => {
    set(state => ({
      ...state,
      isChecked: isChecked ?? state.isChecked,
      callAmount: callAmount ?? state.callAmount,
    }))
  },
}))
