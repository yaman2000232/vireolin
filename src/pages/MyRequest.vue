<template>



  <v-container v-if="authStore.role === 'customer'">
<div class="d-flex justify-center mb-5 ga-5 mt-5">
    <v-chip
  color="primary"
  size="x-large"
  class="text-h5 font-weight-bold px-6 py-3 mb-6"
>
  <v-icon start class="me-2">mdi-format-list-bulleted</v-icon>
  My Requests page
</v-chip>
</div>
 <div class="d-flex justify-center mb-5 ga-5">
  <!-- عنوان الصفحة -->


<!-- أزرار التنقل -->
<div class="d-flex flex-wrap gap-4">
  <v-chip
    color="primary"
    variant="elevated"
    size="x-large"
    class="text-h6 font-weight-bold px-6 py-3 cursor-pointer"
    to="/"
  >
    <v-icon start class="me-2">mdi-home</v-icon>
    Back to Home
  </v-chip>

  <v-chip
    color="primary"
    variant="elevated"
    size="x-large"
    class="text-h6 font-weight-bold px-6 py-3 cursor-pointer"
    to="/contact"
  >
    <v-icon start class="me-2">mdi-handshake</v-icon>
    Request Our Services
  </v-chip>
</div>


</div>



    <!-- حالة التحميل -->
    <div v-if="ourRequestStore.loading">
  <v-skeleton-loader
    type="card"
    class="mx-auto"
    max-width="400"
  ></v-skeleton-loader>
</div>


    <!-- حالة الخطأ -->
    <div v-else-if="ourRequestStore.error">
      {{ ourRequestStore.error }}
    </div>

    <!-- حالة عدم وجود حجوزات -->
   <div v-else-if="ourRequestStore.bookings.length === 0" class="d-flex flex-column align-center justify-center my-12">
  <v-icon size="80" color="grey lighten-1" class="mb-4">
    mdi-calendar-remove
  </v-icon>
  <span class="text-h5 font-weight-bold text-grey-darken-1">
    No bookings found
  </span>
</div>


    <!-- عرض الحجوزات -->
    <v-row v-else align="stretch">
      <v-col
        v-for="booking in ourRequestStore.bookings"
        :key="booking.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="pa-4 rounded-lg elevation-3 d-flex flex-column position-relative h-100 pa-5">
   <h3 class="text-h6 mb-2">
  {{ booking.service_type?.title || 'Service title in Details' }}
</h3>




      <v-chip
  :color="getStatusColor(booking.status)"
  dark
  class="ma-2"
>
  <v-icon start>
    {{ getStatusIcon(booking.status) }}
  </v-icon>
  {{ booking.status }}
</v-chip>


          <p class="mb-1"><strong>Message:</strong> {{ booking.message }}</p>

          <v-btn
            color="primary"
            class="mt-auto"
            @click="openDetailsDialog(booking.id)"
          >
            View Details
          </v-btn>

     <v-btn
  v-if="booking.status === 'pending' && canCancel(booking)"
  color="error"
  class="mt-2"
  @click="openCancelDialog(booking.id)"
>
  Cancel Booking
</v-btn>

        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog لعرض تفاصيل الحجز -->
 <v-dialog v-model="showDetailsDialog" max-width="700">
  <v-card>
    <!-- عنوان بارز -->
    <v-card-title class="text-h5 font-weight-bold pa-4" style="color:#1976D2;">
      <v-icon start class="me-2" color="#1976D2">mdi-information</v-icon>
      Booking Details
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-6">
      <div v-if="ourRequestStore.loading">
        <v-progress-circular indeterminate color="primary" size="40"></v-progress-circular>
      </div>
      <div v-else-if="ourRequestStore.error" class="text-error text-h6">
        {{ ourRequestStore.error }}
      </div>
      <div v-else-if="!ourRequestStore.selectedBooking" class="text-grey text-h6">
        No details found.
      </div>
      <div v-else>
        <!-- جدول مرتب مع خطوط فاصلة -->
        <v-simple-table>
          <tbody>
            <tr>
              <td class="font-weight-bold text-h6">Booking ID</td>
              <td class="text-h6">{{ ourRequestStore.selectedBooking.id }}</td>
            </tr>
            <v-divider></v-divider>

            <tr>
              <td class="font-weight-bold text-h6">Service</td>
              <td class="text-h6 text-primary font-weight-medium">
                {{ ourRequestStore.selectedBooking.service_type.title }}
              </td>
            </tr>
            <v-divider></v-divider>

            <tr>
              <td class="font-weight-bold text-h6">Description</td>
              <td class="text-h6">{{ ourRequestStore.selectedBooking.service_type.description }}</td>
            </tr>
            <v-divider></v-divider>

            <tr>
              <td class="font-weight-bold text-h6">Status</td>
              <td>
                <v-chip :color="getStatusColor(ourRequestStore.selectedBooking.status)" size="large" dark>
                  <v-icon start>{{ getStatusIcon(ourRequestStore.selectedBooking.status) }}</v-icon>
                  {{ ourRequestStore.selectedBooking.status }}
                </v-chip>
              </td>
            </tr>
            <v-divider></v-divider>

            <tr>
              <td class="font-weight-bold text-h6">Email Verified</td>
              <td>
                <span :class="ourRequestStore.selectedBooking.user.email_verified_at ? 'text-success text-h6' : 'text-error text-h6'">
                  {{ ourRequestStore.selectedBooking.user.email_verified_at ? 'Verified' : 'Not Verified' }}
                </span>
              </td>
            </tr>
            <v-divider></v-divider>

            <tr>
              <td class="font-weight-bold text-h6">Message</td>
              <td class="text-h6">{{ ourRequestStore.selectedBooking.message }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-end pa-4">
      <v-btn color="primary" variant="tonal" @click="showDetailsDialog = false">
        <v-icon start>mdi-close</v-icon>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


  </v-container>

  <v-dialog v-model="showCancelDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6 font-weight-bold">
      <v-icon start color="error">mdi-alert</v-icon>
      Confirm Cancellation
    </v-card-title>

    <v-card-text>
      Are you sure you want to cancel this booking?
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text color="grey" @click="closeCancelDialog">No</v-btn>
      <v-btn color="error" @click="confirmCancel">Yes, Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-snackbar
  v-model="showSnackbar"
  timeout="3000"
   :color="snackbarColor"
  location="bottom right"
>
  <v-icon start>mdi-check-circle</v-icon>
  {{ snackbarMessage }}
</v-snackbar>


</template>
<script>
import { useOurRequestStore } from '@/store/ourRequest'
import { useAuthStore } from '@/store/auth'


export default {
  name: 'MyRequest',
  data() {
    return {
      showDetailsDialog: false,

        showCancelDialog: false,
    bookingToCancel: null,
      showSnackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success'
    }
  },
  computed: {
    ourRequestStore() {
      return useOurRequestStore()
    },
     authStore() {
      return useAuthStore()
    },
  },
  methods: {
getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'orange'   // أصفر
    case 'confirmed':
      return 'success'   // أخضر
    case 'cancelled':
      return 'error'     // أحمر
    default:
      return 'grey'
  }
},

getStatusIcon(status) {
  switch (status) {
    case 'pending':
      return 'mdi-clock-outline'   // ⏳ ساعة انتظار
    case 'confirmed':
      return 'mdi-check-circle'    // ✅ تأكيد
    case 'cancelled':
      return 'mdi-close-circle'    // ❌ إلغاء
    default:
      return 'mdi-help-circle'     // ❓ غير معروف
  }
},




   openDetailsDialog(id) {
  if (!id) {
    console.error('Booking ID is missing')
    return
  }
  this.ourRequestStore.fetchBookingDetails(id)
  this.showDetailsDialog = true
},

    
    openCancelDialog(id) {
    this.bookingToCancel = id
    this.showCancelDialog = true
  },
  confirmCancel() {
    this.ourRequestStore.cancelBookingCustomer(this.bookingToCancel)
    this.showCancelDialog = false
    this.bookingToCancel = null
      this.snackbarMessage = 'Booking cancelled successfully!'
    this.showSnackbar = true
    this.snackbarColor = 'red'
  },
  closeCancelDialog() {
    this.showCancelDialog = false
    this.bookingToCancel = null
  },


canCancel(booking) {
  return booking.status === 'pending';
}




  },
  mounted() {
  this.ourRequestStore.fetchMyBookings()  // جلب حجوزات العميل فقط
}

}
</script>
