import { defineStore } from 'pinia'

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    loading: false
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'ADMIN',
  },
  actions: {
    async login(credentials: { email: string; password: any }) {
      this.loading = true

      await new Promise((resolve) => setTimeout(resolve, 1500))


      if (credentials.email === 'error@test.com') {
        this.loading = false
        throw new Error('Credenciais inválidas')
      }

      this.user = { id: 1, name: 'Usuário Teste', email: credentials.email, role: 'USER' }
      this.token = 'fake-jwt-token'
      this.isAuthenticated = true
      this.loading = false
    },

    async register(userData: { name: string; email: string; password: any }) {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1500))

      this.user = { id: 1, name: userData.name, email: userData.email, role: 'USER' }
      this.token = 'fake-jwt-token'
      this.isAuthenticated = true
      this.loading = false
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
    },
  },
})
