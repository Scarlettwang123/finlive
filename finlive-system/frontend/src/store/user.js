import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('finlive_token')
  }),
  
  getters: {
    isLoggedIn: state => !!state.token,
    role: state => state.user?.role
  },
  
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem('finlive_user', JSON.stringify(user))
    },
    
    setToken(token) {
      this.token = token
      localStorage.setItem('finlive_token', token)
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('finlive_token')
      localStorage.removeItem('finlive_user')
    },
    
    loadUser() {
      const userStr = localStorage.getItem('finlive_user')
      if (userStr) {
        this.user = JSON.parse(userStr)
      }
    }
  }
})
