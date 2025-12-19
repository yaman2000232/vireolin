// stores/contact.js
import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    loading: false,
      selectedMessage: null,

    successMessage: '',
    errorMessage: '',
     messages: [],
      pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    lastPage: 1
  }
  }),

  actions: {
    async sendContactMessage(payload) {
      this.loading = true
      this.successMessage = ''
      this.errorMessage = ''

      try {
        const response = await fetch('https://api.vireolin.de/api/contact-messages', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        const data = await response.json()

          if (data.data && data.data.length > 0) {
          const item = data.data[0]
          console.log('ID:', item.id)
          console.log('User Name:', item.user_name)
          console.log('Email:', item.email)
          console.log('Phone Number:', item.phone_number)
          console.log('Message:', item.message)
          console.log('Created At:', item.created_at)
          console.log('Updated At:', item.updated_at)
        }

        if (data.status === 'success') {
          this.successMessage = data.message || 'Message sent successfully.'
        } else {
          this.errorMessage = data.message || 'Unexpected response from server.'
        }
      } catch (error) {
        this.errorMessage = 'Network error. Please try again.'
      } finally {
        this.loading = false
      }
    },
   async fetchContactMessages(page = 1, filters = {}) {
  this.loading = true
  this.errorMessage = ''
  this.successMessage = ''

  try {
    const token = localStorage.getItem('accessToken')
    console.log("Token:", token)

    // بناء الـ query string من الصفحة + الفلاتر
    const params = new URLSearchParams({
      page,
      per_page: this.pagination.perPage, // 🔑 نرسل عدد العناصر المطلوب
      ...filters
    }).toString()

    const response = await fetch(`https://api.vireolin.de/api/contact-messages?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (data.status === 'success') {
      // نخزن الرسائل في state
      const payload = data.data[0]

this.messages = payload.data || []
this.pagination.page = payload.current_page
this.pagination.lastPage = payload.last_page
this.pagination.total = payload.total
  this.pagination.perPage = payload.per_page  


      this.messages.forEach(item => {
        console.log('ID:', item.id)
        console.log('User Name:', item.user_name)
        console.log('Email:', item.email)
        console.log('Phone Number:', item.phone_number)
        console.log('Message:', item.message)
        console.log('Is Read:', item.is_read)
        console.log('Created At:', item.created_at)
        console.log('Updated At:', item.updated_at)
        console.log('-----------------------------')
      })

      this.successMessage = data.message || 'Messages fetched successfully.'
    } else {
      this.errorMessage = data.message || 'Unexpected response from server.'
    }
  } catch (error) {
    this.errorMessage = 'Network error. Please try again.'
  } finally {
    this.loading = false
  }
},

    async fetchContactMessage(id) {
  this.loading = true
  this.errorMessage = ''
  this.successMessage = ''
  this.selectedMessage = null

  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`https://api.vireolin.de/api/contact-messages/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (data.status === 'success') {
      // نخزن الرسالة المختارة في state
    this.selectedMessage = data.data[0] || {}

      this.successMessage = data.message || 'Message fetched successfully.'
    } else {
      this.errorMessage = data.message || 'Unexpected response from server.'
    }
  } catch (error) {
    this.errorMessage = 'Network error. Please try again.'
  } finally {
    this.loading = false
  }
},

  async deleteMessages(id) {
  this.loading = true
  this.errorMessage = null

  try {
    const url = `https://api.vireolin.de/api/contact-messages/${id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    const data = await response.json()

    if (response.ok && data.status === 'success') {
      // حذف العنصر من القائمة مباشرة
      this.messages = this.messages.filter(b => b.id !== id)
    } else {
      this.errorMessage  = data.message || 'Failed to delete messages'
    }
  } catch (err) {
    this.errorMessage = err.message
  } finally {
    this.loading = false
  }
}

  }
})
