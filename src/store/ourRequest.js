// src/stores/OurRequest.js
import { defineStore } from 'pinia'

export const useOurRequestStore = defineStore('ourRequest', {
  state: () => ({
    bookings: [],       
     selectedBooking: null,
    pagination: {        // بيانات الصفحات
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
      links: [],
    },
    loading: false,      // حالة التحميل
    error: null,         // حالة الخطأ
    filters: {           // الفلاتر الافتراضية
      status: '',        // pending, confirmed, cancelled
      sort: 'asc',       // asc أو desc
      page: 1,           // رقم الصفحة
    },
  }),

  actions: {

    
 async fetchBookings(page = 1, filters = {}) {
  this.loading = true
  this.error = null

  try {
    const token = localStorage.getItem('accessToken')

    // بناء الـ query string من الصفحة + الفلاتر (نفس أسلوب messages)
    const params = new URLSearchParams({ page, ...filters }).toString()

    const response = await fetch(`https://api.vireolin.de/api/serviceBookings?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
          'x-locale': localStorage.getItem('locale') || 'de',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (response.ok && data.status === 'success') {
      const payload = data.data[0]

      this.bookings = payload.data
     this.pagination.page = payload.current_page
this.pagination.lastPage = payload.last_page
this.pagination.perPage = payload.per_page
this.pagination.total = payload.total


      console.log('API payload:', payload)
    } else {
      this.error = data.message || 'Failed to fetch bookings'
    }
  } catch (err) {
    this.error = err.message
  } finally {
    this.loading = false
  }
},
 async fetchBookingDetails(id) {
    this.loading = true
    this.error = null
    this.selectedBooking = null

    try {
      const url = `https://api.vireolin.de/api/serviceBookings/${id}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
            'x-locale': localStorage.getItem('locale') || 'de',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })

      const data = await response.json()

      if (response.ok && data.status === 'success' && Array.isArray(data.data) && data.data.length) {
        this.selectedBooking = data.data[0] 
      } else {
        this.error = data.message || 'فشل جلب تفاصيل الحجز'
      }
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  },

    // داخل actions في src/stores/OurRequest.js
async updateBookingStatus(id, newStatus) {
  // نبدأ التحميل ونمسح أي خطأ قديم
  this.loading = true
  this.error = null

  // نحتفظ بالحالة القديمة للعنصر (احتياط لو فشل الطلب)
  const prev = this.bookings.find(b => b.id === id)
  const prevStatus = prev ? prev.status : null

  try {
    const url = `https://api.vireolin.de/api/serviceBookings/${id}`

    // نبني الـ body بصيغة urlencoded: status=confirmed أو status=cancelled
    const body = new URLSearchParams({ status: newStatus })

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
          'x-locale': localStorage.getItem('locale') || 'de',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const data = await response.json()

    if (response.ok && data.status === 'success' && Array.isArray(data.data) && data.data.length) {
      const updated = data.data[0] // العنصر المحدث من الـ API

      // نحدث العنصر داخل القائمة المحلية
      this.bookings = this.bookings.map(b => (b.id === id ? { ...b, ...updated } : b))
    } else {
      // إذا فشل الطلب نرجع الحالة القديمة ونخزن الخطأ
      if (prev && prevStatus !== null) {
        this.bookings = this.bookings.map(b => (b.id === id ? { ...b, status: prevStatus } : b))
      }
      this.error = data.message || 'فشل تحديث حالة الحجز'
    }
  } catch (err) {
    // في حال خطأ بالشبكة نرجع الحالة القديمة ونخزن الخطأ
    if (prev && prevStatus !== null) {
      this.bookings = this.bookings.map(b => (b.id === id ? { ...b, status: prevStatus } : b))
    }
    this.error = err.message
  } finally {
    this.loading = false
  }


},

async fetchMyBookings() {
  this.loading = true
  this.error = null

  try {
    const url = 'https://api.vireolin.de/api/my-bookings'

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
          'x-locale': localStorage.getItem('locale') || 'de',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    const data = await response.json()

   if (response.ok && data.status === 'success' && Array.isArray(data.data)) {
  this.bookings = data.data[0]   // مصفوفة الحجوزات نفسها
  console.log('First booking:', JSON.stringify(this.bookings[0], null, 2))
// لازم تشوف:
// {
//   "id": 16,
//   "service_id": 26,
//   "status": "confirmed",
//   "message": "…",
//   "service_type": { "id": 1, "title": "Tod Abbott" } // إذا السيرفر رجعها
// }


} else {
  this.error = data.message || 'Failed to fetch bookings'
}

  } catch (err) {
    this.error = err.message
  } finally {
    this.loading = false
  }
},


async cancelBookingCustomer(id) {
  this.loading = true
  this.error = null

  try {
    const url = `https://api.vireolin.de/api/serviceBookings/${id}/cancel`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
          'x-locale': localStorage.getItem('locale') || 'de',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    const data = await response.json()
     console.log('Full response:', data)
console.log('Type of data.data:', typeof data.data)
console.log('Is Array?', Array.isArray(data.data))
console.log('Is Array[0]?', Array.isArray(data.data[0]))
console.log('First element:', data.data[0])

    if (response.ok && data.status === 'success') {
  // الاستجابة مصفوفة عادية فيها عنصر واحد
  const updatedBooking = data.data[0]
  


  // تحديث الحجز داخل القائمة المحلية مباشرة
  this.bookings = this.bookings.map(b => b.id === id ? updatedBooking : b)


    } else {
      // تسجيل الخطأ في حال فشل الإلغاء
      this.error = data.message || (data.errors ? data.errors.join(', ') : 'Failed to cancel booking')
    }
  } catch (err) {
    this.error = err.message
  } finally {
    this.loading = false
  }
},


    async deleteBooking(id) {
  this.loading = true
  this.error = null

  try {
    const url = `https://api.vireolin.de/api/serviceBookings/${id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
          'x-locale': localStorage.getItem('locale') || 'de',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    const data = await response.json()

    if (response.ok && data.status === 'success') {
      // حذف العنصر من القائمة مباشرة
      this.bookings = this.bookings.filter(b => b.id !== id)
    } else {
      this.error = data.message || 'Failed to delete booking'
    }
  } catch (err) {
    this.error = err.message
  } finally {
    this.loading = false
  }
}

  },
})
