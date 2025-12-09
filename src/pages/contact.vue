<template>
  <v-skeleton-loader
    v-if="servicesStore.loading"
    type=" card, article, actions"
    class="mx-auto"
    max-width="1000"
  ></v-skeleton-loader>


  <div v-else>
    <v-container class="py-10">
  <v-row justify="center"   data-aos="fade-up" data-aos-duration="500">
    <v-col cols="12" md="8" class="text-center">
      <h2 class="text-h2 text-primary font-weight-bold mb-4">
        Contact Us
      </h2>

      <p class="text-body-1 text-text mb-6">
        We are here to assist you with any inquiries, support requests, or service information. 
        Reach out to us and our team will respond promptly to ensure your needs are met.
      </p>

      <div
        style="
          height: 4px;
          width: 80px;
          border-radius: 2px;
          background: linear-gradient(to right, #FFCC80, #EF7444);
          margin: 0 auto;
        "
      ></div>
    </v-col>
  </v-row>


  
</v-container>



<v-container class="py-10">
  <v-row>
    <!-- Left side: Contact Form -->
   <v-col cols="12" md="6"   data-aos="fade-right"
  data-aos-duration="1000"
  data-aos-delay="500">
  <v-form
  v-model="valid"
  class="bg-surface border-lg pa-8 border-warning rounded-xl"
>
  <!-- العنوان -->
  <p class="text-center mb-8 text-h4 font-weight-bold text-primary">
    Send Your Service Request ...
  </p>

  <!-- Service Select -->
  <v-select
    v-model="service_id"
    label="Select Service"
    :items="servicesStore.services"
    item-title="title"   
    item-value="id"    
    outlined
    dense
    class="mb-4"
    :rules="[rules.required]"
    prepend-inner-icon="mdi-briefcase"
  ></v-select>
 

  <!-- Message -->
  <v-textarea
    v-model="message"
    label="Your Message"
    outlined
    rows="5"
    class="mb-4"
    prepend-inner-icon="mdi-message-text"
  ></v-textarea>

  <!-- Prompt below textarea -->
<div class="text-body-2 text-center mb-4">
  If you have any question or issue, <v-btn variant="text" color="primary" class="text-capitalize px-0" @click="contactDialog = true">
    Click here
  </v-btn>
  to preview your contact details before sending.
</div>

  <!-- Send Button -->
  <v-btn
  color="primary"
  class="text-white font-weight-bold"
  block
  :loading="loading"
  :disabled="!valid || loading"
  @click="submitForm"
  prepend-icon="mdi-send"
>
  Send
</v-btn>

<!-- Snackbar للرسائل -->
<v-snackbar
  v-model="snackbar"
  :color="snackbarColor"
  timeout="3000"
  top
>
  {{ snackbarMessage }}
</v-snackbar>


</v-form>

</v-col>

<!-- Contact preview dialog -->

<v-dialog v-model="contactDialog" max-width="640" persistent>
  <v-card class="pa-6 rounded-xl bg-surface border-lg border-primary">
    <!-- العنوان -->
    <v-card-title class="text-h5 font-weight-bold text-primary d-flex align-center justify-center">
      <v-icon start class="me-2" color="primary">mdi-message-alert</v-icon>
      Contact Admin
    </v-card-title>

    <v-divider class="my-4"></v-divider>

    <!-- النموذج -->
    <v-card-text>
      <v-form v-model="valid" ref="contactForm">
        <!-- الاسم -->
        <v-text-field
          v-model="user_name"
          label="Your Name"
          prepend-inner-icon="mdi-account"
          outlined
          dense
          :rules="[rules.required]"
          class="mb-4"
        />

        <!-- البريد -->
        <v-text-field
          v-model="email"
          label="Email Address"
          prepend-inner-icon="mdi-email"
          outlined
          dense
          type="email"
          :rules="[rules.required, rules.email]"
          class="mb-4"
        />

        <!-- الهاتف -->
        <v-text-field
          v-model="phone_number"
          label="Phone Number"
          prepend-inner-icon="mdi-phone"
          outlined
          dense
          type="tel"
          :rules="[rules.required, rules.phone]"
          class="mb-4"
        />

        <!-- الرسالة -->
        <v-textarea
          v-model="message"
          label="Your Message"
          prepend-inner-icon="mdi-message-text"
          outlined
          rows="4"
          :rules="[rules.required]"
          class="mb-4"
        />
      </v-form>
    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <!-- الأزرار -->
    <v-card-actions class="justify-end">
      <v-btn variant="text" color="secondary" @click="contactDialog = false">
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        class="text-white font-weight-bold"
       :loading="contactStore.loading"
        :disabled="!valid || loading"
        @click="submitContact"
        prepend-icon="mdi-send"
      >
        Send
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


    <!-- Right side: Location & Map -->
   <v-col cols="12" md="6"   data-aos="fade-left"
  data-aos-duration="1000"
  data-aos-delay="400">
  <v-row>
    <!-- Germany Hamburg -->
    <v-col cols="12">
      <v-card class="pa-4 mb-4 rounded-lg hover-scale" color="surface">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-3">mdi-map-marker</v-icon>
          <div>
            <h3 class="text-subtitle-1 font-weight-bold text-primary mb-1">
              Germany - Hamburg
            </h3>
            <p class="text-body-2 secondary">
              Our office is located in Hamburg, Germany.
            </p>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- Syria Coming Soon -->
    <v-col cols="12">
      <v-card class="pa-4 mb-4 rounded-lg hover-scale" color="surface">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-3">mdi-map-marker-outline</v-icon>
          <div>
            <h3 class="text-subtitle-1 font-weight-bold text-primary mb-1">
              Syria - Coming Soon
            </h3>
            <p class="text-body-2 secondary">
              We will be opening in Syria very soon.
            </p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

   <v-card class="pa-4 rounded-lg" color="surface">
    <h3 class="text-subtitle-1 font-weight-bold text-primary mb-4">
      Our Location
    </h3>

    <v-responsive aspect-ratio="16/9">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9711.123456789!2d9.993682!3d53.551086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f123456789%3A0xabcdef123456789!2sHamburg%2C%20Germany!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </v-responsive>
  </v-card>
</v-col>




  </v-row>
</v-container>
</div>


</template>
<script>
import { useServicesStore } from '@/store/servicesData'
import { useContactStore } from '@/store/contact'

export default {
data() {
  return {
    valid: false,
    service_id: null,
    phone: '',
    email: '',
    message: '',


    // contact 
    contactDialog: false,
    valid: false,
    user_name: '',
    email: '',
    phone_number: '',
    message: '',
    loading: false,
    rules: {
      required: v => !!v || 'This field is required',
      email: v => /.+@.+\..+/.test(v) || 'Invalid email',
      phone: v => /^\d{9,15}$/.test(v) || 'Invalid phone number'
    },

    // واجهة المستخدم
    loading: false,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success',

    token: '<your_token_here>',

    rules: {
      required: v => !!v || 'This field is required',
      phone: v => (/^[0-9]+$/.test(v) && v.length >= 8) || 'Phone must be at least 8 digits',
      email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      minMessage: v => (v && v.length >= 5) || 'Message must be at least 5 characters'
    }
  }
},

   computed: {
    servicesStore() {
      return useServicesStore()
    },
    contactStore() {
      return useContactStore()
    }
  },
methods: {
 async submitForm() {
  // 1) تأكيد صلاحية الفورم
  if (!this.valid) {
    this.snackbarMessage = 'Please complete all required fields.'
    this.snackbarColor = 'error'
    this.snackbar = true
    return
  }

  // 2) تحضير البيانات كـ FormData
  const formData = new FormData()
  formData.append("service_id", this.service_id)
  formData.append("message", this.message || "")

  this.loading = true

  try {
    // 3) جلب التوكن من localStorage أو Pinia
    const token = localStorage.getItem("accessToken")

    // 4) إرسال الطلب
    const res = await fetch("http://127.0.0.1:8000/api/serviceBookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
        // ملاحظة: لا تضيف Content-Type مع FormData، المتصفح يحددها تلقائيًا
      },
      body: formData
    })

    // 5) التحقق من نجاح الاستجابة
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.message || `Request failed with status ${res.status}`)
    }

    const data = await res.json()

    // 6) عرض رسالة النجاح القادمة من الـ API
    this.snackbarMessage = data?.message || "Request sent successfully!"
    this.snackbarColor = "success"
    this.snackbar = true

    // إعادة ضبط الحقول
    this.resetForm()
  } catch (e) {
    // 7) التعامل مع الأخطاء
    this.snackbarMessage = e.message || "Error sending request!"
    this.snackbarColor = "error"
    this.snackbar = true
  } finally {
    // 8) إنهاء حالة التحميل
    this.loading = false
  }
},
    // submit contact function 
  async submitContact() {
    if (!this.valid) return

    const payload = {
      user_name: this.user_name,
      email: this.email,
      phone_number: this.phone_number,
      message: this.message
    }

    await this.contactStore.sendContactMessage(payload)

    if (this.contactStore.successMessage) {
      this.snackbarMessage = this.contactStore.successMessage
      this.snackbarColor = 'success'
      this.snackbar = true
      this.contactDialog = false
      this.$refs.contactForm.reset()
    }

    if (this.contactStore.errorMessage) {
      this.snackbarMessage = this.contactStore.errorMessage
      this.snackbarColor = 'error'
      this.snackbar = true
    }
  },

resetForm() {
  this.service_id = null
  this.phone = ""
  this.email = ""
  this.message = ""
  this.valid = false
}

},

  async mounted() {
  try {
    await this.servicesStore.listService(1)
  } catch (err) {
    console.error(err)
  }
}

}
</script>