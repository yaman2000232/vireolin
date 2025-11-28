import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('accessToken') || null,
    role: localStorage.getItem('role') || null,
  }),

  actions: {
    async login(email, password) {
  console.log('Attempting login with credentials:', email, password)

  const res = await fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ email, password })
  })

  const data = await res.json()
  console.log('API response received:', data)

  if (data.status === 'success' && data.data.token) {
    this.token = data.data.token.trim()
    this.role = data.data.roles?.[0] || null   // ← الدور من المصفوفة

    localStorage.setItem('accessToken', this.token)
    if (this.role) {
      localStorage.setItem('role', this.role)
    }

    console.log('Login successful. Role:', this.role)
  } else {
    throw new Error(data.message || 'Login failed')
  }
},


    async register(name, email, password, password_confirmation, phone_number) {
      console.log('Attempting register with data:', name, email, password, phone_number)

      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name,
          email,
          password,
          password_confirmation,
          phone_number
        })
      })

      const data = await res.json()
      console.log('Register API response received:', data)

      if (data.status === 'success' && data.data.token) {
        this.token = data.data.token
        localStorage.setItem('accessToken', this.token)
        console.log('Registration successful. Token:', this.token)
        return true
      } else {
        throw new Error(data.message || 'Register failed')
      }
    },

    logout() {
      console.log('Logging out...')
      this.token = null
      this.role = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
    },
  },
})
