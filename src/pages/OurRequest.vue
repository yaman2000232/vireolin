<template>
  <v-container fluid>
    


    <!-- حالة التحميل -->
    <div v-if="ourRequestStore.loading" class="d-flex justify-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- حالة الخطأ -->
    <v-alert
      v-else-if="ourRequestStore.error"
      type="error"
      class="ma-4"
    >
      {{ ourRequestStore.error }}
    </v-alert>
    

    <!-- الجدول -->
    <v-card v-else>

   



      <v-card-title class="text-h6">Service Bookings (Admin)</v-card-title>

       <div class="d-flex align-center mb-4">
 <v-select
  v-model="selectedStatus"
  :items="statusOptions"
  item-title="title"
  item-value="value"
  label="Filter bookings"
  variant="outlined"
  density="comfortable"
  class="flex-grow-1"
  :disabled="ourRequestStore.loading"
  @update:modelValue="applyFilter"
/>

</div>

       <v-data-table
  :headers="headers"
  :items="ourRequestStore.bookings"
 :items-per-page="ourRequestStore.pagination.perPage"
   v-model:page="ourRequestStore.pagination.page"
  :server-items-length="ourRequestStore.pagination.total"
  class="elevation-1"
  @update:page="goToPage"
>
  <!-- ID -->
  <template v-slot:item.id="{ item }">
    <span>#{{ item.id }}</span>
  </template>

  <!-- User info -->
<template v-slot:item.user="{ item }">
  <div class="d-flex flex-column pa-2">
    <!-- الاسم -->
    <span class="text-h6 font-weight-bold mb-2">
      <v-icon start color="primary" size="18">mdi-account</v-icon>
      {{ item.user?.name || '—' }}
    </span>

    <!-- البريد الإلكتروني -->
    <span class="text-body-2 mb-1">
      <v-icon start color="blue" size="16">mdi-email</v-icon>
      {{ item.user?.email || '—' }}
    </span>

    <!-- رقم الهاتف -->
    <span class="text-body-2">
      <v-icon start color="green" size="16">mdi-phone</v-icon>
      {{ item.user?.phone_number || '—' }}
    </span>
  </div>
</template>


  <!-- Service info -->
  <template v-slot:item.service="{ item }">
  <div class="d-flex flex-column pa-2">
    <!-- العنوان -->
    <span class="text-h6 font-weight-bold mb-2 text-primary">
      <v-icon start color="primary" size="18">mdi-briefcase</v-icon>
      {{ item.service_type?.title || '—' }}
    </span>

    <!-- الوصف -->
    <span class="text-body-2 text-text">
      {{ item.service_type?.description || 'No description available' }}
    </span>
  </div>
</template>


  <!-- Message -->
 <template v-slot:item.message="{ item }">
  <div class="d-flex align-center pa-2">
    <v-icon start color="primary" size="18">mdi-message-text</v-icon>
    <span v-if="item.message" class="text-body-2 font-weight-medium">
      {{ item.message }}
    </span>
    <v-chip v-else color="grey lighten-2" text-color="grey darken-2" size="small" variant="outlined">
      No message
    </v-chip>
  </div>
</template>


  <!-- Status colored chip -->
  <template v-slot:item.status="{ item }">
    <v-chip
      :color="getStatusColor(item.status)"
      text-color="white"
      size="small"
    >
      {{ item.status }}
    </v-chip>
  </template>

  <!-- Actions -->
  <template v-slot:item.actions="{ item }">
    <div class="d-flex align-center">
      <!-- Confirm -->
      <v-tooltip text="Confirm Booking" location="top">
        <template v-slot:activator="{ props }">
         <v-btn
  v-bind="props"
  icon
  size="small"
  color="success"
  variant="tonal"
  class="mr-2"
  @click="openConfirmDialog(item)"
>
  <v-icon>mdi-check-circle</v-icon>
</v-btn>

        </template>
      </v-tooltip>

      <!-- Cancel -->
      <v-tooltip text="Cancel Booking" location="top">
        <template v-slot:activator="{ props }">
        <v-btn
  v-bind="props"
  icon
  size="small"
  color="error"
  variant="tonal"
  class="mr-2"
  @click="openCancelDialog(item)"
>
  <v-icon>mdi-cancel</v-icon>
</v-btn>

        </template>
      </v-tooltip>

      <!-- Delete -->
      <v-tooltip text="Delete Booking" location="top">
        <template v-slot:activator="{ props }">
         <v-btn
  v-bind="props"
  icon
  size="small"
  color="red"
  variant="tonal"
  class="mr-2"
  @click="openDeleteDialog(item)"
>
  <v-icon>mdi-delete</v-icon>
</v-btn>

        </template>
      </v-tooltip>

      <!-- View Details -->
      <v-tooltip text="View Details" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            size="small"
            color="primary"
            variant="tonal"
            @click="openDetailsDialog(item.id)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="View Messages" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            size="small"
            color="info"
            variant="tonal"
            to="/ourmessages"
          >
            <v-icon> mdi-message-text</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </div>
  </template>
</v-data-table>


  <v-dialog v-model="showDetailsDialog" max-width="700">
  <v-card elevation="6" rounded="lg">
    
    <!-- عنوان الديالوج -->
    <v-card-title class="text-h6 font-weight-bold text-primary d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-file-document-outline</v-icon>
      Booking Details
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-6">

      <!-- تحميل -->
      <div v-if="ourRequestStore.loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-2">Loading booking details...</p>
      </div>

      <!-- خطأ -->
      <v-alert
        v-else-if="ourRequestStore.error"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        {{ ourRequestStore.error }}
      </v-alert>

      <!-- بدون بيانات -->
      <div v-else-if="!ourRequestStore.selectedBooking" class="text-center py-6 text-grey">
        <v-icon size="40" color="grey">mdi-information-outline</v-icon>
        <p>No booking details available.</p>
      </div>

      <!-- المحتوى -->
      <div v-else>
        <!-- 🟦 قسم معلومات الحجز -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
          Booking Information
        </h3>
        <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
          <v-row>
            <v-col cols="6">
              <p><strong>ID:</strong> {{ ourRequestStore.selectedBooking.id }}</p>
              <p><strong>Service ID:</strong> {{ ourRequestStore.selectedBooking.service_id }}</p>
            </v-col>
            <v-col cols="6">
              <p><strong>User ID:</strong> {{ ourRequestStore.selectedBooking.user_id }}</p>
              <p>
                <strong>Status:</strong>
                <v-chip
                  :color="getStatusColor(ourRequestStore.selectedBooking.status)"
                  text-color="white"
                  size="small"
                  class="ml-2"
                >
                  {{ ourRequestStore.selectedBooking.status }}
                </v-chip>
              </p>
            </v-col>
            <v-col cols="12">
              <p><strong>Message:</strong> {{ ourRequestStore.selectedBooking.message }}</p>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- 🟦 قسم معلومات الخدمة -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2 ">
          Service Information
        </h3>
        <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
          <p><strong>Service Title:</strong> {{ ourRequestStore.selectedBooking.service_type.title }}</p>
          <p><strong>Description:</strong> {{ ourRequestStore.selectedBooking.service_type.description }}</p>
        </v-sheet>

        <!-- 🟦 قسم معلومات المستخدم -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
          User Information
        </h3>
          <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
          <p><strong>Name:</strong> {{ ourRequestStore.selectedBooking.user.name }}</p>
          <p><strong>Email:</strong> {{ ourRequestStore.selectedBooking.user.email }}</p>
          <p><strong>Phone:</strong> {{ ourRequestStore.selectedBooking.user.phone_number }}</p>
          <p><strong>Email Verified At:</strong> {{ ourRequestStore.selectedBooking.user.email_verified_at }}</p>
        </v-sheet>
      </div>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="flat" @click="showDetailsDialog = false">
        <v-icon left>mdi-close</v-icon>
        Close
      </v-btn>
    </v-card-actions>

  </v-card>
</v-dialog>

    </v-card>
  </v-container>

  <!-- confirm dialog   -->
  <v-dialog v-model="showConfirmDialog" max-width="500">
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">
      <v-icon start color="success">mdi-check-circle</v-icon>
      Confirm Booking
    </v-card-title>

    <v-card-text class="text-body-1">
      Are you sure you want to confirm this booking?
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text color="grey" @click="closeConfirmDialog">
        Cancel
      </v-btn>
      <v-btn
        color="success"
        :loading="loadingConfirm"
        @click="confirmBooking"
      >
        Yes, Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- cancel dialog  -->
<v-dialog v-model="showCancelDialog" max-width="500">
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">
      <v-icon start color="error">mdi-cancel</v-icon>
      Cancel Booking
    </v-card-title>

    <v-card-text class="text-body-1">
      Are you sure you want to cancel this booking?
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text color="grey" @click="closeCancelDialog">
        No
      </v-btn>
      <v-btn
        color="error"
        :loading="loadingCancel"
        @click="confirmCancel"
      >
        Yes, Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- delete dialog  -->
<v-dialog v-model="showDeleteDialog" max-width="500">
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">
      <v-icon start color="red">mdi-delete</v-icon>
      Delete Booking
    </v-card-title>

    <v-card-text class="text-body-1">
      Are you sure you want to permanently delete this booking? 
      <br>
      <span class="text-caption text-red">This action cannot be undone.</span>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text color="grey" @click="closeDeleteDialog">
        No
      </v-btn>
      <v-btn
        color="red"
        :loading="loadingDelete"
        @click="confirmDelete"
      >
        Yes, Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


<!-- snackbar -->

<v-snackbar
  v-model="showSnackbar"
  timeout="3000"
  :color="snackbarColor"
  location="bottom right"
>
  <v-icon start>mdi-information</v-icon>
  {{ snackbarMessage }}
</v-snackbar>







</template>

<script>
import { useOurRequestStore } from '@/store/ourRequest'
import { echo } from "../plugins/echo";


export default {
  name: "OurRequest",

  data() {
    return {
      headers: [
        { title: "ID", key: "id" },
        { title: "User", key: "user" },
        { title: "Service", key: "service" },
        { title: "Message", key: "message" },
        { title: "Status", key: "status" },
        { title: "Actions", key: "actions", sortable: false },
      ],
       showDetailsDialog: false,
      // confirm 
         showConfirmDialog: false,
    bookingToConfirm: null,
    loadingConfirm: false,

    // cancel 
      showCancelDialog: false,
    bookingToCancel: null,
    loadingCancel: false,

    // delete 
      showDeleteDialog: false,
    bookingToDelete: null,
    loadingDelete: false,

    // Snackbar
    showSnackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success',

    // filter 
      statusOptions: [
      { title: 'All', value: '' },
      { title: 'pending', value: 'pending' },
      { title: 'confirmed', value: 'confirmed' },
      { title: 'cancelled', value: 'cancelled' },
    ],


    }
  },

  computed: {
    // ربط المكون بالـ Store
    ourRequestStore() {
      return useOurRequestStore()
    },
  },

  methods: {

      applyFilter(val) {
    this.ourRequestStore.fetchBookings(1, { status: val })
  },
  goToPage(page) {
    this.ourRequestStore.fetchBookings(page, { status: this.selectedStatus })
  },


     async openDetailsDialog(id) {
      await this.ourRequestStore.fetchBookingDetails(id);

      this.showDetailsDialog = true;
    },

    // ألوان الحالات
    getStatusColor(status) {
      switch (status) {
        case "pending":
          return "primary"
        case "confirmed":
          return "success"
        case "cancelled":
          return "error"
        default:
          return "grey"
      }
    },
     goToPage(page) {
    this.ourRequestStore.filters.page = page
    this.ourRequestStore.fetchBookings()
  },

    // أزرار الأكشن (مؤقتاً console.log)
     openConfirmDialog(item) {
    this.bookingToConfirm = item
    this.showConfirmDialog = true
  },
  async confirmBooking() {
    this.loadingConfirm = true
    try {
      await this.ourRequestStore.updateBookingStatus(this.bookingToConfirm.id, 'confirmed')
       this.snackbarMessage = 'Booking confirmed successfully!'
      this.snackbarColor = 'success'
      this.showSnackbar = true

      this.showConfirmDialog = false
      this.bookingToConfirm = null

      
    } finally {
      this.loadingConfirm = false
    }
  },
  closeConfirmDialog() {
    this.showConfirmDialog = false
    this.bookingToConfirm = null
  },

  openCancelDialog(item) {
    this.bookingToCancel = item
    this.showCancelDialog = true
  },
  async confirmCancel() {
    this.loadingCancel = true
    try {
      await this.ourRequestStore.updateBookingStatus(this.bookingToCancel.id, 'cancelled')
        this.snackbarMessage = 'Booking cancelled successfully!'
      this.snackbarColor = 'error'
      this.showSnackbar = true

      this.showCancelDialog = false
      this.bookingToCancel = null
    } finally {
      this.loadingCancel = false
    }
  },
  closeCancelDialog() {
    this.showCancelDialog = false
    this.bookingToCancel = null
  },

     openDeleteDialog(item) {
    this.bookingToDelete = item
    this.showDeleteDialog = true
  },
  async confirmDelete() {
    this.loadingDelete = true
    try {
      await this.ourRequestStore.deleteBooking(this.bookingToDelete.id)
       this.snackbarMessage = 'Booking deleted successfully!'
      this.snackbarColor = 'error'
      this.showSnackbar = true

      this.showDeleteDialog = false
      this.bookingToDelete = null
    } finally {
      this.loadingDelete = false
    }
  },
  closeDeleteDialog() {
    this.showDeleteDialog = false
    this.bookingToDelete = null
  }
  },

  mounted() {
    // استدعاء البيانات أول ما تفتح الصفحة
    this.ourRequestStore.fetchBookings()
     echo.private("admin-notification")
    .listen(".create-booking-event", (event) => {
      console.log("تم إنشاء حجز:", event.data);
      location.reload();
    })
    .listen(".cancel-booking-event", (event) => {
      console.log("تم إلغاء حجز:", event.data);
      location.reload();
    });
  },
  beforeUnmount() {
  echo.leave("admin-notification");
}
}
</script>

