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
    <v-card v-else class="mt-5">
      <v-card-title class="text-h6">
        {{ $t('ourRequest.pageTitle') }}
      </v-card-title>

      <!-- فلتر الحالة -->
      <div class="d-flex align-center mb-4">
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          item-title="title"
          item-value="value"
          :label="$t('ourRequest.filterBookings')"
          variant="outlined"
          density="comfortable"
          class="flex-grow-1"
          :disabled="ourRequestStore.loading"
          @update:modelValue="applyFilter"
        />
      </div>

      <!-- الجدول -->
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
            <span class="text-h6 font-weight-bold mb-2">
              <v-icon start color="primary" size="18">mdi-account</v-icon>
              {{ item.user?.name || '—' }}
            </span>
            <span class="text-body-2 mb-1">
              <v-icon start color="blue" size="16">mdi-email</v-icon>
              {{ item.user?.email || '—' }}
            </span>
            <span class="text-body-2">
              <v-icon start color="green" size="16">mdi-phone</v-icon>
              {{ item.user?.phone_number || '—' }}
            </span>
          </div>
        </template>

        <!-- Service info -->
        <template v-slot:item.service="{ item }">
          <div class="d-flex flex-column pa-2">
            <span class="text-h6 font-weight-bold mb-2 text-primary">
              <v-icon start color="primary" size="18">mdi-briefcase</v-icon>
              {{ item.service_type?.title || '—' }}
            </span>
            <span class="text-body-2 text-text">
              {{ item.service_type?.description || $t('ourRequest.description') }}
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
              {{ $t('ourRequest.message') }}
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
            <v-tooltip :text="$t('ourRequest.confirmDialog.title')" location="top">
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
            <v-tooltip :text="$t('ourRequest.cancelDialog.title')" location="top">
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
            <v-tooltip :text="$t('ourRequest.deleteDialog.title')" location="top">
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
            <v-tooltip :text="$t('ourRequest.detailsDialog.title')" location="top">
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

            <!-- View Messages -->
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
                  <v-icon>mdi-message-text</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>

      <!-- Booking Details Dialog -->
      <v-dialog v-model="showDetailsDialog" max-width="700">
        <v-card elevation="6" rounded="lg">
          <v-card-title class="text-h6 font-weight-bold text-primary d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-file-document-outline</v-icon>
            {{ $t('ourRequest.detailsDialog.title') }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <div v-if="ourRequestStore.loading" class="text-center py-6">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <p class="mt-2">{{ $t('ourRequest.loadingBookingDetails') }}</p>
            </div>

            <v-alert
              v-else-if="ourRequestStore.error"
              type="error"
              variant="tonal"
              class="mb-4"
            >
              {{ ourRequestStore.error }}
            </v-alert>

            <div v-else-if="!ourRequestStore.selectedBooking" class="text-center py-6 text-grey">
              <v-icon size="40" color="grey">mdi-information-outline</v-icon>
              <p>{{ $t('ourRequest.noBookingDetails') }}</p>
            </div>

            <div v-else>
              <!-- Booking Info -->
              <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
                {{ $t('ourRequest.bookingInfo') }}
              </h3>
              <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
                <v-row>
                  <v-col cols="6">
                    <p><strong>{{ $t('ourRequest.id') }}:</strong> {{ ourRequestStore.selectedBooking.id }}</p>
                    <p><strong>{{ $t('ourRequest.serviceID') }}:</strong> {{ ourRequestStore.selectedBooking.service_id }}</p>
                  </v-col>
                  <v-col cols="6">
                    <p><strong>{{ $t('ourRequest.userID') }}:</strong> {{ ourRequestStore.selectedBooking.user_id }}</p>
                    <p>
                      <strong>{{ $t('ourRequest.status') }}:</strong>
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
                    <p><strong>{{ $t('ourRequest.message') }}:</strong> {{ ourRequestStore.selectedBooking.message }}</p>
                  </v-col>
                </v-row>
              </v-sheet>

              <!-- Service Info -->
              <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2 ">
                {{ $t('ourRequest.serviceInfo') }}
              </h3>
              <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
                <p><strong>{{ $t('ourRequest.serviceTitle') }}:</strong> {{ ourRequestStore.selectedBooking.service_type.title }}</p>
                <p><strong>{{ $t('ourRequest.description') }}:</strong> {{ ourRequestStore.selectedBooking.service_type.description }}</p>
              </v-sheet>

              <!-- User Info -->
              <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
                {{ $t('ourRequest.userInfo') }}
              </h3>
              <v-sheet class="pa-4 mb-6 rounded-lg elevation-4" color="surface">
                <p><strong>{{ $t('ourRequest.name') }}:</strong> {{ ourRequestStore.selectedBooking.user.name }}</p>
                <p><strong>{{ $t('ourRequest.email') }}:</strong> {{ ourRequestStore.selectedBooking.user.email }}</p>
                <p><strong>{{ $t('ourRequest.phone') }}:</strong> {{ ourRequestStore.selectedBooking.user.phone_number }}</p>
                <p><strong>{{ $t('ourRequest.emailVerifiedAt') }}:</strong> {{ ourRequestStore.selectedBooking.user.email_verified_at }}</p>
              </v-sheet>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="flat" @click="showDetailsDialog = false">
              <v-icon left>mdi-close</v-icon>
              {{ $t('ourRequest.detailsDialog.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>

  <!-- Confirm Dialog -->
  <v-dialog v-model="showConfirmDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon start color="success">mdi-check-circle</v-icon>
        {{ $t('ourRequest.confirmDialog.title') }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ $t('ourRequest.confirmDialog.text') }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text color="grey" @click="closeConfirmDialog">
          {{ $t('ourRequest.confirmDialog.cancel') }}
        </v-btn>
        <v-btn color="success" :loading="loadingConfirm" @click="confirmBooking">
          {{ $t('ourRequest.confirmDialog.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Cancel Dialog -->
  <v-dialog v-model="showCancelDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon start color="error">mdi-cancel</v-icon>
        {{ $t('ourRequest.cancelDialog.title') }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ $t('ourRequest.cancelDialog.text') }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text color="grey" @click="closeCancelDialog">
          {{ $t('ourRequest.cancelDialog.no') }}
        </v-btn>
        <v-btn color="error" :loading="loadingCancel" @click="confirmCancel">
          {{ $t('ourRequest.cancelDialog.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Dialog -->
  <v-dialog v-model="showDeleteDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon start color="red">mdi-delete</v-icon>
        {{ $t('ourRequest.deleteDialog.title') }}
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ $t('ourRequest.deleteDialog.text') }}
        <br>
        <span class="text-caption text-red">{{ $t('ourRequest.deleteDialog.warning') }}</span>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text color="grey" @click="closeDeleteDialog">
          {{ $t('ourRequest.deleteDialog.no') }}
        </v-btn>
        <v-btn color="red" :loading="loadingDelete" @click="confirmDelete">
          {{ $t('ourRequest.deleteDialog.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar -->
  <v-snackbar
    v-model="showSnackbar"
    timeout="3000"
    :color="snackbarColor"
    location="bottom right"
  >
    <v-icon start>mdi-information</v-icon>
    {{ $t('ourRequest.snackbar.info') }}
  </v-snackbar>
</template>

<script>
import { useOurRequestStore } from '@/store/ourRequest'



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
    selectedStatus: '',



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
  //    goToPage(page) {
  //   this.ourRequestStore.filters.page = page
  //   this.ourRequestStore.fetchBookings()
  // },

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

       this.$echo.private("admin-notification")
    .listen(".create-booking-event", (event) => {
      console.log("تم إنشاء حجز:", event.data);
      // تحديث البيانات بدون Refresh
      this.ourRequestStore.fetchBookings();
      this.snackbarMessage = "وصل طلب جديد!";
      this.snackbarColor = "info";
      this.showSnackbar = true;
    })
    .listen(".cancel-booking-event", (event) => {
      console.log("تم إلغاء حجز:", event.data);
      // تحديث البيانات بدون Refresh
      this.ourRequestStore.fetchBookings();
      this.snackbarMessage = "تم إلغاء طلب!";
      this.snackbarColor = "error";
      this.showSnackbar = true;
    });
    
  },

   beforeUnmount() {
    this.$echo.leave("private-admin-notification");
  }
 
}
</script>

