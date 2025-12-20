import { defineStore } from 'pinia'
import { useAuthStore } from "@/store/auth";

// import servicesA from '@/assets/images/servicesA.jpg'
// import servicesB from '@/assets/images/servicesB.jpg'
// import servicesC from '@/assets/images/servicesC.jpg'
// import servicesD from '@/assets/images/servicesD.jpg'
// import servicesE from '@/assets/images/servicesE.jpg'
// import servicesF from '@/assets/images/servicesF.jpg'


export const useServicesStore = defineStore('service', {
  state: () => ({
  services: [],
  loading: false,
  error: false,
  pagination: {
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 0,
    next_page_url: null,
    prev_page_url: null
  }
}),

  actions:{

   async listService(page = 1) {
  this.loading = true
  this.error = false

  try {
    const authStore = useAuthStore()
    console.log("USER ROLE IS:", authStore.role ?? "Not loaded")

    let token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found")
    }
    token = token.replace(/^['"]+|['"]+$/g, "").trim()

    const res = await fetch(`https://api.vireolin.de/api/serviceTypes?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData?.message || `Failed to fetch services (status ${res.status})`)
    }

    const data = await res.json()
    console.log("API Response:", data)

    // ✅ الخدمات مباشرة من data.data
    this.services = Array.isArray(data.data) ? data.data : []

    // ✅ معلومات التصفح من data.pagination
    this.pagination = {
      total: data.pagination?.total || 0,
      count: data.pagination?.count || 0,
      per_page: data.pagination?.per_page || 10,
      current_page: data.pagination?.current_page || 1,
      total_pages: data.pagination?.total_pages || 1,
      next_page_url: data.pagination?.next_page_url || null,
      prev_page_url: data.pagination?.prev_page_url || null
    }

    console.log("Pagination:", this.pagination)

  } catch (err) {
    console.error("Error loading services:", err.message)
    this.error = true
  } finally {
    this.loading = false
  }
},


// دالة لإرسال خدمة جديدة للـ API
async createServiceFromApi(newService) {
  this.loading = true
  this.error = false

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('No access token found.')

    const url = 'https://api.vireolin.de/api/serviceTypes'

    const formData = new FormData()
    if (newService.title) formData.append('title', newService.title)
    if (newService.description) formData.append('description', newService.description)

    if (newService.image) {
      formData.append('images[]', newService.image)
    }

    if (Array.isArray(newService.images)) {
      newService.images.forEach(file => {
        if (file) formData.append('images[]', file)
      })
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    })

    if (!res.ok) {
      const txt = await res.text()
      throw new Error(`Create failed: ${res.status} ${txt}`)
    }

    const created = await res.json()
    const normalized = this.normalizeCreatedService(created, newService.description)

    this.addService(normalized)
    return normalized
  } catch (error) {
    console.error('❌ Failed to create service:', error)
    this.error = true
    throw error
  } finally {
    this.loading = false
  }
},

// دالة لتطبيع الرد القادم من الـ API
normalizeCreatedService(createdResponse, fallbackDescription = '') {
  const service = createdResponse?.data?.service || {}
  const photos = createdResponse?.data?.photo_info || []

  return {
    id: service.id,
    title: service.title,
    description: service.description ?? fallbackDescription,
    images: photos.map((img, idx) => ({
      id: idx + 1, // ما في id بالـ photo_info، منعمل index
      url: img.url,
      image_path: img.path,
      original_name: img.original_name
    }))
  }
},



// دالة لإضافة خدمة جديدة للـ store
addService(service) {
  // إذا الخدمة ما فيها id نوقف
  if (!service || !service.id) return

  // نبحث إذا الخدمة موجودة مسبقاً بنفس id
  const existsIdx = this.services.findIndex(s => s.id === service.id)

  if (existsIdx >= 0) {
    // إذا موجودة نحدثها
    this.services[existsIdx] = service
  } else {
    // إذا مش موجودة نضيفها
    this.services.push(service)
  }
},
// تحديث الخدمة عبر API
async updateServiceFromApi(serviceId, updatedData) {
  this.loading = true
  this.error = false
  console.log("🚀 Starting updateServiceFromApi for serviceId:", serviceId)
  console.log("📦 Updated data to send:", updatedData)

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('No access token found.')

    const url = `https://api.vireolin.de/api/serviceTypes/${serviceId}`
    console.log("🌐 API URL:", url)

    const formData = new FormData()
    formData.append('_method', 'PUT')
    if (updatedData.title) formData.append('title', updatedData.title)
    if (updatedData.description) formData.append('description', updatedData.description)

    // صور جديدة
    if (Array.isArray(updatedData.new_photos)) {
      updatedData.new_photos.forEach(file => {
        if (file) {
          formData.append('new_photos[]', file)
          console.log("🖼️ Added new photo:", file.name || file)
        }
      })
    }

    // صور محذوفة
    if (Array.isArray(updatedData.deleted_photos)) {
      updatedData.deleted_photos.forEach(id => {
        if (id) {
          formData.append('deleted_photos[]', id)
          console.log("❌ Marked photo for deletion:", id)
        }
      })
    }

    // طباعة الـ FormData للتأكد
    for (let pair of formData.entries()) {
      console.log("📤 FormData entry:", pair[0], pair[1])
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    })

    console.log("📡 Response status:", res.status)

    if (!res.ok) {
      const txt = await res.text()
      console.error("❌ Update failed, raw response:", txt)
      throw new Error(`Update failed: ${res.status} ${txt}`)
    }

    const updatedResponse = await res.json()
    console.log("✅ Raw updatedResponse from API:", updatedResponse)

    // نطبّع الرد ليكون بنفس شكل الـ GET
    const normalized = this.normalizeUpdatedService(updatedResponse)
    console.log("🔄 Normalized service object:", normalized)

    // نحدث الخدمة بالـ store
    this.updateService(normalized)
    console.log("📂 Store updated successfully!")

    return normalized
  } catch (error) {
    console.error('❌ Failed to update service:', error)
    this.error = true
    throw error
  } finally {
    this.loading = false
    console.log("🏁 Finished updateServiceFromApi, loading set to false")
  }
},

// تطبيع الرد القادم من الـ API بعد التعديل
normalizeUpdatedService(updatedResponse) {
  const service = updatedResponse?.data?.service || {}
  const stored = updatedResponse?.data?.['message stored'] || []
  const deleted = updatedResponse?.data?.['message deleted'] || []

  console.log("📦 Normalizing service:", service)
  console.log("🖼️ Stored images:", stored)
  console.log("❌ Deleted images:", deleted)

  // إذا السيرفر بيرجع الصور كاملة بعد التعديل
  if (service.images && service.images.length > 0) {
    console.log("🖼️ Using full images list from service:", service.images)
    return {
      id: service.id,
      title: service.title,
      description: service.description,
      created_at: service.created_at,
      updated_at: service.updated_at,
      images: service.images
    }
  }

  // إذا السيرفر ما بيرجع الصور كاملة → ندمج القديمة مع الجديدة
  const newImages = stored.map((p, idx) => ({
    id: p.id || idx + 1,
    url: p.url,
    image_path: p.path,
    original_name: p.original_name
  }))

  console.log("🖼️ Normalized new images:", newImages)

  return {
    id: service.id,
    title: service.title,
    description: service.description,
    created_at: service.created_at,
    updated_at: service.updated_at,
    images: newImages
  }
},

// تحديث الخدمة داخل الـ store (state)
updateService(newUpdatedService) {
  console.log("📂 Updating service in store:", newUpdatedService.id)
  this.services = this.services.map(service =>
    service.id === newUpdatedService.id ? newUpdatedService : service
  )
  console.log("✅ Store services after update:", this.services)
},













      // داخل الـ store
async deleteItem(id) {
  console.log("🚀 Starting deleteItem for serviceId:", id)
  this.loading = true
  this.error = false

  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('No access token found.')

    const url = `https://api.vireolin.de/api/serviceTypes/${id}`
    console.log("🌐 API URL:", url)

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    console.log("📡 Response status:", res.status)

    if (!res.ok) {
      const txt = await res.text()
      console.error("❌ Deletion failed, raw response:", txt)
      throw new Error(`Deletion failed: ${res.status} ${txt}`)
    }

    const deletedResponse = await res.json()
    console.log("✅ Raw deletedResponse from API:", deletedResponse)

    // تحديث الـ state
    this.services = this.services.filter(service => service.id !== id)
    console.log("📂 Service deleted from store:", id)

    return deletedResponse
  } catch (error) {
    console.error("❌ Failed to delete service:", error)
    this.error = true
    throw error
  } finally {
    this.loading = false
    console.log("🏁 Finished deleteItem, loading set to false")
  }
}

      
 
  }
})