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
    // 1) جلب بيانات المستخدم من الـ AuthStore (اختياري للتأكد من الدور)
    const authStore = useAuthStore()
    
 console.log("USER ROLE IS:", authStore.role ?? "Not loaded")

    // 2) جلب التوكن من localStorage
    let token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found")
    }

    // تنظيف التوكن من أي علامات اقتباس أو مسافات
    token = token.replace(/^['"]+|['"]+$/g, "").trim()

    // 3) إرسال الطلب
    const res = await fetch(`http://127.0.0.1:8000/api/serviceTypes?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    // 4) التحقق من الاستجابة
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData?.message || `Failed to fetch services (status ${res.status})`)
    }

    const data = await res.json()
console.log("API Response:", data)

// الـ API بيرجع data = [ { current_page, data: [الخدمات] } ]
const payload = Array.isArray(data.data) ? data.data[0] : null

this.services = payload ? payload.data : []
this.pagination = {
  current_page: payload?.current_page || 1,
  last_page: payload?.last_page || 1,
  per_page: payload?.per_page || 10,
  total: payload?.total || 0,
}
  } catch (err) {
    console.error("Error loading services:", err.message)
    this.error = true
  } finally {
    this.loading = false
  }
},


// دالة لإرسال خدمة جديدة للـ API
async createServiceFromApi(newService) {
  // نحدد حالة التحميل والخطأ
  this.loading = true
  this.error = false

  try {
    // نجلب التوكن من التخزين المحلي (لازم يكون موجود لتوثيق الطلب)
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('No access token found.')

    // رابط الـ API الخاص بإنشاء خدمة جديدة
    const url = 'http://127.0.0.1:8000/api/serviceTypes'

    // نبني كائن FormData لإرسال البيانات كـ multipart/form-data
    const formData = new FormData()
    if (newService.title) formData.append('title', newService.title)          // العنوان
    if (newService.description) formData.append('description', newService.description) // الوصف

    // إذا في صورة واحدة فقط
    if (newService.image) {
      formData.append('images[]', newService.image)
    }

    // إذا في عدة صور (من v-file-input)
    if (Array.isArray(newService.images)) {
      newService.images.forEach(file => {
        if (file) formData.append('images[]', file) // نضيف كل صورة بنفس المفتاح
      })
    }

    // نرسل الطلب للـ API
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // التوثيق
        Accept: 'application/json'        // نوع الاستجابة المتوقعة
      },
      body: formData                      // البيانات المرسلة
    })

    // إذا الرد مش ناجح نرمي خطأ
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(`Create failed: ${res.status} ${txt}`)
    }

    // نقرأ الرد كـ JSON
    const created = await res.json()

    // نطبّع الرد حتى يكون بنفس شكل الـ GET
    const normalized = this.normalizeCreatedService(created, newService.description)

    // نضيف الخدمة الجديدة للـ store
    this.addService(normalized)

    // نرجع الخدمة الموحّدة
    return normalized
  } catch (error) {
    // إذا صار خطأ نعرضه ونحدد حالة الخطأ
    console.error('❌ Failed to create service:', error)
    this.error = true
    throw error
  } finally {
    // نوقف حالة التحميل
    this.loading = false
  }
},

// دالة لتطبيع الرد القادم من الـ API
normalizeCreatedService(createdResponse, fallbackDescription = '') {
  // السيرفر بيرجع الخدمة الجديدة مباشرة داخل data
  const service = createdResponse?.data || {}

  return {
    id: service.id,
    title: service.title,
    description: service.description ?? fallbackDescription,
    created_at: service.created_at,
    updated_at: service.updated_at,
    images: (service.images || []).map(img => ({
      id: img.id,
      url: img.url,
      image_path: img.image_path,
      service_id: img.service_id
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

    const url = `http://127.0.0.1:8000/api/serviceTypes/${serviceId}`
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

    const url = `http://127.0.0.1:8000/api/serviceTypes/${id}`
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