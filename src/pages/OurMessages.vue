<template>
  <v-container>
   <div class="d-flex align-center mb-4">
  <v-select
    v-model="selectedFilter"
    :items="filterOptions"
    label="Filter messages"
    variant="outlined"
    density="comfortable"
    class="flex-grow-1 mt-10"
    :disabled="contactStore.loading"
    :footer-props="{
    'items-per-page-options': [10, 25, 50]
  }"
    @update:modelValue="applyFilter"
  />
</div>



    <h2 class="text-h5 font-weight-bold mb-4">📩  Members Messages</h2>

 <v-data-table
  :headers="headers"
  :items="contactStore.messages"
  :loading="contactStore.loading"
  v-model:page="contactStore.pagination.page"
   :items-per-page="contactStore.pagination.perPage"
  :server-items-length="contactStore.pagination.total"
  class="elevation-2 rounded-lg"
  density="comfortable"
  hover
  :footer-props="{ 'items-per-page-options': [10, 25, 50] }"
  @update:page="onPageUpdate"
  @update:items-per-page="onPerPageUpdate"
>
  <!-- الاسم -->
  <template v-slot:item.user_name="{ item }">
    <v-chip color="blue lighten-2" text-color="white" class="ma-1" size="small">
      <v-icon start small>mdi-account</v-icon>
      {{ item.user_name }}
    </v-chip>
  </template>

  <!-- الإيميل -->
  <template v-slot:item.email="{ item }">
    <v-chip color="text " text-color="white" class="ma-1" size="small">
      <v-icon start small>mdi-email</v-icon>
      {{ item.email }}
    </v-chip>
  </template>

  <!-- الرقم -->
  <template v-slot:item.phone_number="{ item }">
    <v-chip color="teal lighten-2" text-color="white" class="ma-1" size="small">
      <v-icon start small>mdi-phone</v-icon>
      {{ item.phone_number }}
    </v-chip>
  </template>

  <!-- حالة القراءة -->
  <template v-slot:item.is_read="{ item }">
    <v-chip
      :color="item.is_read ? 'green' : 'red'"
      text-color="white"
      class="ma-1"
      size="small"
    >
      <v-icon start small>
        {{ item.is_read ? 'mdi-check-circle' : 'mdi-email-alert' }}
      </v-icon>
      {{ item.is_read ? 'Read' : 'Unread' }}
    </v-chip>
  </template>

  <!-- الأكشنز -->
  <template v-slot:item.actions="{ item }">
    <v-tooltip text="View Details" location="top">
      <template v-slot:activator="{ props }">
        <v-icon
          v-bind="props"
          color="primary"
          class="cursor-pointer mr-2"
          @click="openDialog(item.id)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-tooltip>

    <v-tooltip text="Delete Message" location="top">
      <template v-slot:activator="{ props }">
        <v-icon
          v-bind="props"
          color="red"
          class="cursor-pointer"
          @click="openDeleteDialog(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-tooltip>
  </template>
</v-data-table>




     <div v-if="contactStore.loading" class="text-center py-6">
  <v-progress-circular indeterminate color="primary"></v-progress-circular>
  <p class="mt-2">Loading messages...</p>
</div>

<!-- خطأ -->
<v-alert
  v-else-if="contactStore.errorMessage"
  type="error"
  variant="tonal"
  class="mb-4"
>
  {{ contactStore.errorMessage }}
</v-alert>

<!-- بدون بيانات -->
<!-- <div v-else-if="!selectedMessage" class="text-center py-6 text-grey">
  <v-icon size="40" color="grey">mdi-information-outline</v-icon>
  <p>No message details available.</p>
</div> -->

<!-- تفاصيل الرسالة -->
<div v-else>
 <v-dialog v-model="dialog" max-width="600px" transition="dialog-bottom-transition">
  <v-card class="rounded-lg elevation-3">
    <!-- العنوان -->
    <v-card-title class="text-h6 font-weight-bold d-flex align-center">
      <v-icon start color="primary">mdi-email</v-icon>
      Message Details
    </v-card-title>

    <!-- المحتوى -->
    <v-card-text class="text-body-1">
      <v-list density="compact">
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-identifier</v-icon>
          </v-list-item-icon>
          <v-list-item-title><strong>ID:</strong> {{ contactStore.selectedMessage.id }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="secondary">mdi-message-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title><strong>Message:</strong> {{ contactStore.selectedMessage.message }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="success">mdi-calendar-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title><strong>Created At:</strong> {{ new Date(contactStore.selectedMessage.created_at).toLocaleString() }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="warning">mdi-calendar-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title><strong>Updated At:</strong>    {{ new Date(contactStore.selectedMessage.updated_at).toLocaleString() }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- الأزرار -->
    <v-card-actions class="justify-end">
      <v-btn color="grey" variant="tonal" @click="dialog = false">
        <v-icon start>mdi-close</v-icon>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</div>

      
  </v-container>

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
import { useContactStore } from '@/store/contact'
// import { echo } from "../plugins/echo";


export default {
  name: 'OurMessages',

  data() {
    return {
     headers: [
  { title: 'User Name', key: 'user_name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone_number' },
  { title: 'Is Read', key: 'is_read' },
  { title: 'Actions', key: 'actions', sortable: false }
],

 selectedFilter: 'all', 
    filterOptions: [
      { title: 'All messages', value: 'all' },
      { title: 'Read messages', value: 'read' },
      { title: 'Unread messages', value: 'unread' }
    ],
    currentFilters: {},

       dialog: false,
    //   delete information in data 
      showDeleteDialog: false,
    messageToDelete: null,
    loadingDelete: false,
    showSnackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success'


    }
  },
  computed:{
    contactStore() {
      return useContactStore()
    }
  },
  methods:{
 async openDialog(id) {
  // تجيب الرسالة من السيرفر
  await this.contactStore.fetchContactMessage(id)

  // تفتح الـ dialog
  this.dialog = true

  // تحديث محلي للحالة إلى "مقروءة"
  const msg = this.contactStore.messages.find(m => m.id === id)
  if (msg) msg.is_read = 1

  if (this.contactStore.selectedMessage) {
    this.contactStore.selectedMessage.is_read = 1
  }
},



  openDeleteDialog(item) {
    this.messageToDelete = item
    this.showDeleteDialog = true
  },
  async confirmDelete() {
    this.loadingDelete = true
    try {
      await this.contactStore.deleteMessages(this.messageToDelete.id)
      this.snackbarMessage = 'Message deleted successfully!'
      this.snackbarColor = 'red'
      this.showSnackbar = true

      this.showDeleteDialog = false
      this.messageToDelete = null
    } finally {
      this.loadingDelete = false
    }
  },
  closeDeleteDialog() {
    this.showDeleteDialog = false
    this.messageToDelete = null
  },

   async applyFilter(value) {
    if (value === 'read') {
      this.currentFilters = { is_read: 1 }
    } else if (value === 'unread') {
      this.currentFilters = { is_read: 0 }
    } else {
      this.currentFilters = {}
    }

    await this.contactStore.fetchContactMessages(1, this.currentFilters)
  },

    // Buttons
    // async filterRead() {
    //   this.currentFilters = { is_read: 1 }
    //   await this.contactStore.fetchContactMessages(1, this.currentFilters)
    // },
    // async filterUnread() {
    //   this.currentFilters = { is_read: 0 }
    //   await this.contactStore.fetchContactMessages(1, this.currentFilters)
    // },
//     async filterByNameYaman() {
//   this.currentFilters = { user_name: 'Yaman' }
//   await this.contactStore.fetchContactMessages(1, this.currentFilters)
// }

//      async resetFilters() {
//     this.currentFilters = {} // بدون أي فلتر
//     await this.contactStore.fetchContactMessages(1, this.currentFilters)
//   },

    // Keep filters when user changes pagination
  onPageUpdate(page) {
    this.contactStore.fetchContactMessages(page)
  },
  onPerPageUpdate(perPage) {
    this.contactStore.pagination.perPage = perPage
    this.contactStore.fetchContactMessages(1) // نرجع للصفحة الأولى
  }
  },

mounted() {
  // استدعاء الرسائل أول ما تفتح الصفحة
  this.contactStore.fetchContactMessages(1, this.currentFilters);

  this.$echo.private("admin-notification")
    .listen(".recieve-message-event", (event) => {
      console.log("تم إنشاء رسالة:", event.data);

      // تحديث البيانات بدون Refresh
      this.contactStore.fetchContactMessages(1, this.currentFilters);

      this.snackbarMessage = "وصلت رسالة جديدة!";
      this.snackbarColor = "info";
      this.showSnackbar = true;
    });
},

beforeUnmount() {
  this.$echo.leave("private-admin-notification");
}


}
</script>
