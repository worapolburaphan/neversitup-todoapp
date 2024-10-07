import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthState = {
  token: string | null
  isRememberMe: boolean
  isLoggedIn: () => boolean
  user: string
  logout: () => void
  setUser: (user: string, token?: string) => void
  setIsRememberMe: (state: boolean) => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      isRememberMe: false,
      isLoggedIn: () => !!get().token,
      user: '',
      logout: () => set({ token: null, user: '' }),
      setUser: (user: string, token?: string) => set({ user, token }),
      setIsRememberMe: (state: boolean) => set({ isRememberMe: state }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
