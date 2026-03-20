import { defineStore } from 'pinia'

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: number
  name: string
  role: UserRole
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'ADMIN',
  },
  actions: {
    loginAsUser() {
      this.user = { id: 1, name: 'Breno Client', role: 'USER' }
    },
    loginAsAdmin() {
      this.user = { id: 2, name: 'Breno Admin', role: 'ADMIN' }
    },
    logout() {
      this.user = null
    },
  },
})
