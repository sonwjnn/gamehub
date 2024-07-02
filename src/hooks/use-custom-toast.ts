import { CustomToastProps } from '@/types'
import { useEffect, useState } from 'react'

export const useCustomToast = () => {
  const [toasts, setToasts] = useState<CustomToastProps[]>([])

  const addToast = (toast: CustomToastProps) => {
    const hasDuplicate = toasts.some(t => t.messages === toast.messages)

    if (hasDuplicate) return

    setToasts(prevToasts => [...prevToasts, toast])
  }

  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [toasts])

  return { toasts, addToast, removeToast }
}
