<template>
  <v-skeleton-loader
    v-if="servicesStore.loading"
    type=" card, article, actions"
    class="mx-auto"
    max-width="1000"
  ></v-skeleton-loader>

  <div v-else>
    <v-container class="py-10">
      <v-row justify="center" data-aos="fade-up" data-aos-duration="500">
        <v-col cols="12" md="8" class="text-center">
          <!-- Title -->
          <h2 class="text-h2 text-primary font-weight-bold mb-4">
            {{ $t('contact.title') }}
          </h2>

          <!-- Description -->
          <p class="text-body-1 text-text mb-6">
            {{ $t('contact.description') }}
          </p>

          <!-- Decorative line -->
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
        <v-col cols="12" md="6" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="500">
          <v-form
            v-model="valid"
            class="bg-surface border-lg pa-8 border-primary rounded-xl"
          >
            <!-- Form title -->
            <p class="text-center mb-8 text-h4 font-weight-bold text-primary">
              {{ $t('contact.formTitle') }}
            </p>

            <!-- Service Select -->
            <v-select
              v-model="service_id"
              :items="servicesStore.services"
              item-title="title"   
              item-value="id"    
              :label="$t('contact.selectService')"
              outlined
              dense
              class="mb-4"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-briefcase"
            ></v-select>

            <!-- Message -->
            <v-textarea
              v-model="booking_message"
              :label="$t('contact.messageLabel')"
              outlined
              rows="5"
              class="mb-4"
              prepend-inner-icon="mdi-message-text"
            ></v-textarea>

            <!-- Prompt below textarea -->
            <div class="text-body-2 text-center mb-4">
              {{ $t('contact.previewText') }}
              <v-btn
                variant="text"
                color="primary"
                class="text-capitalize px-0"
                @click="contactDialog = true"
              >
                {{ $t('contact.previewButton') }}
              </v-btn>
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
              {{ $t('contact.sendButton') }}
            </v-btn>

            <!-- Snackbar -->
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
            <!-- Dialog Title -->
            <v-card-title class="text-h5 font-weight-bold text-primary d-flex align-center justify-center">
              <v-icon start class="me-2" color="primary">mdi-message-alert</v-icon>
              {{ $t('contact.dialogTitle') }}
            </v-card-title>

            <v-divider class="my-4"></v-divider>

            <v-card-text>
              <v-form v-model="valid" ref="contactForm">
                <v-text-field
                  v-model="user_name"
                  :label="$t('contact.fields.name')"
                  prepend-inner-icon="mdi-account"
                  outlined
                  dense
                  :rules="[rules.required]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="email"
                  :label="$t('contact.fields.email')"
                  prepend-inner-icon="mdi-email"
                  outlined
                  dense
                  type="email"
                  :rules="[rules.required, rules.email]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="phone_number"
                  :label="$t('contact.fields.phone')"
                  prepend-inner-icon="mdi-phone"
                  outlined
                  dense
                  type="tel"
                  :rules="[rules.required, rules.phone]"
                  class="mb-4"
                />

                <v-textarea
                
                  v-model="contact_message" 
                  :label="$t('contact.fields.message')"
                  prepend-inner-icon="mdi-message-text"
                  outlined
                  rows="4"
                  :rules="[rules.required]"
                  class="mb-4"
                />
              </v-form>
            </v-card-text>

            <v-divider class="my-4"></v-divider>

            <v-card-actions class="justify-end">
              <v-btn variant="text" color="secondary" @click="contactDialog = false">
                {{ $t('contact.dialogCancel') }}
              </v-btn>
              <v-btn
                color="primary"
                class="text-white font-weight-bold"
                :loading="contactStore.loading"
                :disabled="!valid || loading"
                @click="submitContact"
                prepend-icon="mdi-send"
              >
                {{ $t('contact.dialogSend') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Right side: Location & Map -->
        <v-col cols="12" md="6" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4 mb-4 rounded-lg hover-scale" color="surface">
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-3">mdi-map-marker</v-icon>
                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-primary mb-1">
                      {{ $t('contact.location.title') }}
                    </h3>
                    <p class="text-body-2 secondary">
                      {{ $t('contact.location.description') }}
                    </p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-card class="pa-4 rounded-lg" color="surface">
            <h3 class="text-subtitle-1 font-weight-bold text-primary mb-4">
              {{ $t('contact.map.title') }}
            </h3>

            <v-responsive aspect-ratio="16/9">
              <iframe
                :src="contactMapUrl"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
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
    // phone: '',
    // email: '',
    booking_message: '',


    // contact 
    contactDialog: false,
    valid: false,
    user_name: '',
    email: '',
    phone_number: '',
    contact_message: '',
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
    },
     deviceFingerprint: "",
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
  formData.append("booking_message", this.booking_message || "")
  formData.append("device_fingerprint", this.deviceFingerprint)

  this.loading = true

  try {
    // 3) جلب التوكن من localStorage أو Pinia
    const token = localStorage.getItem("accessToken")

    // 4) إرسال الطلب
    const res = await fetch("https://api.vireolin.de/api/serviceBookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'Accept-Language': localStorage.getItem('locale') || 'de',
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
      contact_message: this.contact_message
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
  // this.email = ""
  this.booking_message = ""
  this.valid = false
},

 async getDeviceFingerprint() {
      const data = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ]
      const msg = data.join('|')
      const msgUint8 = new TextEncoder().encode(msg)
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    },
},

  async mounted() {
      console.log("Services:", this.servicesStore.services)
     this.deviceFingerprint = await this.getDeviceFingerprint()
    console.log("Fingerprint (Options API):", this.deviceFingerprint)


  try {
    await this.servicesStore.listService(1)
  } catch (err) {
    console.error(err)
  }
  
}

}
</script>