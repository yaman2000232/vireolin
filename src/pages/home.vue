<template>

    <v-skeleton-loader
      v-if="loadingHome"
      type="card, article, actions"
      class="mx-auto"
      max-width="1000"
      
    ></v-skeleton-loader>

    <div v-else>









    


<!-- <v-container class="d-flex justify-center my-12">
  <v-sheet
    height="6"
    width="320"
    rounded="lg"
    elevation="4"
    color="primary"
  ></v-sheet>
</v-container> -->









<v-container fluid class="mt-5 mb-8">
<v-row justify="center"  data-aos="fade-up-right"
       data-aos-duration="500"
       data-aos-delay="200">
  <v-col cols="12" md="8">
    <div class="d-flex flex-column justify-center align-center pa-8 text-center rounded-lg bg-surface">
      
      <div class="px-4 py-2 rounded-pill bg-surface text-primary text-subtitle-2 font-weight-medium mb-4 elevation-2">
        {{ $t('home.services.subtitle') }}
      </div>

      <div class="text-h2 font-weight-bold text-primary mb-4">
        {{ $t('home.services.title') }}
      </div>

      <div class="text-body-1 text-secondary mb-6">
        {{ $t('home.services.description') }}
      </div>

      <div
        style="
          height: 4px;
          width: 80px;
          border-radius: 2px;
          background: linear-gradient(to right, var(--v-theme-warning), var(--v-theme-primary));
        "
      ></div>
    </div>
  </v-col>
</v-row>



        <!-- للعميل -->
<div class="d-flex justify-center mb-6 mt-6" v-if="authStore.role === 'customer'">
  <v-btn
    color="primary"
    class="text-white font-weight-bold px-6 py-3 rounded-lg elevation-2"
    data-aos="fade-up-left"
    data-aos-duration="500"
    data-aos-delay="300"
    prepend-icon="mdi-plus-box-multiple"
    variant="flat"
    to="/myrequest"
  >
    {{ $t('home.roleActions.viewMyRequest') }}
  </v-btn>
</div>

<!-- للمسؤول -->
<div class="d-flex justify-center mb-6 mt-6 ga-6" v-if="authStore.role === 'admin'">
  <!-- زر إضافة خدمة -->
  <v-btn
    color="primary"
    class="text-white font-weight-bold px-6 py-3 rounded-lg elevation-2"
    data-aos="fade-up-left"
    data-aos-duration="500"
    data-aos-delay="300"
    prepend-icon="mdi-plus-box-multiple"
    variant="flat"
    @click="AddDialog = true"
  >
    {{ $t('home.roleActions.addService') }}
  </v-btn>

  <!-- زر الذهاب إلى الطلبات -->
  <v-btn
    color="primary"
    class="text-white font-weight-bold px-6 py-3 rounded-lg elevation-2"
    data-aos="fade-up-left"
    data-aos-duration="500"
    data-aos-delay="500"
    prepend-icon="mdi-file-document-multiple"
    variant="flat"
    to="/ourrequest"
  >
    {{ $t('home.roleActions.goToRequests') }}
  </v-btn>
</div>

            

         <v-dialog v-model="AddDialog" max-width="600">
  <v-card class="pa-4">

    <!-- Title -->
    <v-card-title class="d-flex align-center justify-center">
      <v-icon color="orange-darken-2" size="28" class="me-2">mdi-plus-box-multiple</v-icon>
      <span class="text-h5 font-weight-bold">{{ $t('home.addServiceDialog.title') }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <!-- Image Upload -->
          <v-col cols="12">
            <v-file-input
              v-model="newService.images"
              :label="$t('home.addServiceDialog.uploadImages')"
              prepend-inner-icon="mdi-image"
              variant="outlined"
              multiple
              accept="image/*"
              class="mb-4"
            />
          </v-col>

         <!-- Arabic Title & Description -->
<v-col cols="12">
  <v-text-field
    v-model="newService.title_ar"
    :label="$t('home.addServiceDialog.titleField') + ' (AR)'"
    prepend-inner-icon="mdi-format-title"
    variant="outlined"
    class="mb-2"
  />
</v-col>

<v-col cols="12">
  <v-textarea
    v-model="newService.description_ar"
    :label="$t('home.addServiceDialog.descriptionField') + ' (AR)'"
    prepend-inner-icon="mdi-text"
    variant="outlined"
    auto-grow
    rows="3"
    class="mb-4"
  />
</v-col>

<!-- English Title & Description -->
<v-col cols="12">
  <v-text-field
    v-model="newService.title_en"
    :label="$t('home.addServiceDialog.titleField') + ' (EN)'"
    prepend-inner-icon="mdi-format-title"
    variant="outlined"
    class="mb-2"
  />
</v-col>

<v-col cols="12">
  <v-textarea
    v-model="newService.description_en"
    :label="$t('home.addServiceDialog.descriptionField') + ' (EN)'"
    prepend-inner-icon="mdi-text"
    variant="outlined"
    auto-grow
    rows="3"
    class="mb-4"
  />
</v-col>

<!-- German Title & Description -->
<v-col cols="12">
  <v-text-field
    v-model="newService.title_de"
    :label="$t('home.addServiceDialog.titleField') + ' (DE)'"
    prepend-inner-icon="mdi-format-title"
    variant="outlined"
    class="mb-2"
  />
</v-col>

<v-col cols="12">
  <v-textarea
    v-model="newService.description_de"
    :label="$t('home.addServiceDialog.descriptionField') + ' (DE)'"
    prepend-inner-icon="mdi-text"
    variant="outlined"
    auto-grow
    rows="3"
    class="mb-4"
  />
</v-col>

        </v-row>
      </v-container>
    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <!-- Actions -->
    <v-card-actions class="d-flex justify-end">
      <v-btn
        variant="outlined"
        color="grey-darken-1"
        prepend-icon="mdi-close-circle"
        @click="AddDialog = false"
        class="px-6"
      >
        {{ $t('home.addServiceDialog.close') }}
      </v-btn>

      <v-btn
        color="orange"
        prepend-icon="mdi-content-save"
        @click="addService"
        :loading="addingService"
        class="px-6"
      >
        {{ $t('home.addServiceDialog.add') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- <div>{{ servicesStore.pagination.total_pages }}</div> -->

<v-pagination
 v-if="servicesStore.pagination.total_pages > 1"

  v-model="servicesStore.pagination.current_page"
  :length="servicesStore.pagination.total_pages"
  @update:modelValue="servicesStore.listService($event)"
  class="mt-6"
/>


  <!-- cards -->
  <v-container>

<v-row align="stretch"
 data-aos="slide-right"
  data-aos-duration="1500"
  data-aos-delay="200">
  <v-col
    v-for="(service, index) in servicesStore.services"
    :key="index"
    cols="12"
    sm="6"
    md="4"
  >
    <v-card
      class="rounded-lg elevation-3 overflow-hidden hover-scale mt-5 h-100 d-flex flex-column position-relative"
      color="surface"
    >
      <div class="position-relative">
        <v-img
          :src="getServiceImage(service)"
          height="220px"
          cover
        ></v-img>

        <v-btn
        v-if="authStore.role === 'admin'"
          icon="mdi-pencil"
          color="primary"
          class="ma-2 position-absolute"
          style="top: 8px; right: 52px; z-index: 10;"
          @click="openEditDialog(service)"
        ></v-btn>

       

        <v-btn
        v-if="authStore.role === 'admin'"
          icon="mdi-delete"
          color="error"
          class="ma-2 position-absolute"
          style="top: 8px; right: 8px; z-index: 10;"
          @click="openConfirmDialog(service.id)"
        ></v-btn>
      </div>

      <v-card-text class="pa-6 text-center flex-grow-1">
        <h3 class="text-h6 font-weight-bold mb-2 text-primary">
          {{ service.title }}
        </h3>

     


        <p class="text-body-2 text-secondary mb-4">
          {{ service.description }}
        </p>
      </v-card-text>

      <v-card-actions class="justify-center mt-auto pb-4">
        <v-btn
          color="primary"
          class="text-white font-weight-bold elevation-2"
          append-icon="mdi-arrow-right"
          variant="flat"
          @click="openDialog(service.id)"
        >
         {{ $t('home.hero.learnMore') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>

</v-container>
 

 <!-- service request  -->

<v-dialog v-model="showDetailsDialog" max-width="700">
  <v-card elevation="6" rounded="lg">
    
    <!-- عنوان الديالوج -->
    <v-card-title class="text-h6 font-weight-bold text-primary d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-file-document-outline</v-icon>
      {{ $t('dialogs.bookingDetails.title') }}
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="pa-6">

      <!-- تحميل -->
      <div v-if="ourRequestStore.loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-2">{{ $t('dialogs.bookingDetails.loading') }}</p>
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
        <p>{{ $t('dialogs.bookingDetails.noData') }}</p>
      </div>

      <!-- المحتوى -->
      <div v-else>
        <!-- 🟦 قسم معلومات الحجز -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
          {{ $t('dialogs.bookingDetails.bookingInfo') }}
        </h3>
        <v-sheet class="pa-4 mb-6 rounded-lg" color="grey-lighten-4">
          <v-row>
            <v-col cols="6">
              <p><strong>{{ $t('dialogs.bookingDetails.fields.id') }}:</strong> {{ ourRequestStore.selectedBooking.id }}</p>
              <p><strong>{{ $t('dialogs.bookingDetails.fields.serviceId') }}:</strong> {{ ourRequestStore.selectedBooking.service_id }}</p>
            </v-col>
            <v-col cols="6">
              <p><strong>{{ $t('dialogs.bookingDetails.fields.userId') }}:</strong> {{ ourRequestStore.selectedBooking.user_id }}</p>
              <p>
                <strong>{{ $t('dialogs.bookingDetails.fields.status') }}:</strong>
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
              <p><strong>{{ $t('dialogs.bookingDetails.fields.message') }}:</strong> {{ ourRequestStore.selectedBooking.message }}</p>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- 🟦 قسم معلومات الخدمة -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
          {{ $t('dialogs.bookingDetails.serviceInfo') }}
        </h3>
        <v-sheet class="pa-4 mb-6 rounded-lg" color="grey-lighten-4">
          <p><strong>{{ $t('dialogs.bookingDetails.fields.serviceTitle') }}:</strong> {{ ourRequestStore.selectedBooking.service_type.title }}</p>
          <p><strong>{{ $t('dialogs.bookingDetails.fields.description') }}:</strong> {{ ourRequestStore.selectedBooking.service_type.description }}</p>
        </v-sheet>

        <!-- 🟦 قسم معلومات المستخدم -->
        <h3 class="text-subtitle-1 font-weight-bold text-primary mb-2">
          {{ $t('dialogs.bookingDetails.userInfo') }}
        </h3>
        <v-sheet class="pa-4 rounded-lg" color="grey-lighten-4">
          <p><strong>{{ $t('dialogs.bookingDetails.fields.name') }}:</strong> {{ ourRequestStore.selectedBooking.user.name }}</p>
          <p><strong>{{ $t('dialogs.bookingDetails.fields.email') }}:</strong> {{ ourRequestStore.selectedBooking.user.email }}</p>
          <p><strong>{{ $t('dialogs.bookingDetails.fields.phone') }}:</strong> {{ ourRequestStore.selectedBooking.user.phone_number }}</p>
          <p><strong>{{ $t('dialogs.bookingDetails.fields.emailVerifiedAt') }}:</strong> {{ ourRequestStore.selectedBooking.user.email_verified_at }}</p>
        </v-sheet>
      </div>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="flat" @click="showDetailsDialog = false">
        <v-icon left>mdi-close</v-icon>
        {{ $t('dialogs.bookingDetails.close') }}
      </v-btn>
    </v-card-actions>

  </v-card>
</v-dialog>



 <v-dialog v-model="confirmDialogEdit" max-width="700">
  <v-card class="pa-4">

    <!-- Title -->
    <v-card-title class="d-flex justify-center align-center">
      <v-icon color="grey-darken-2" size="28" class="me-2">mdi-pencil</v-icon>
      <span class="text-h5 font-weight-bold">{{ $t('dialogs.editService.title') }}</span>
    </v-card-title>

    <v-card-text>
      <!-- عرض الصور الحالية -->
      <div class="text-subtitle-1 font-weight-bold mb-2">
        {{ $t('dialogs.editService.currentPhotos') }}
      </div>
      <v-row>
        <v-col
          v-for="(img, index) in editService.images"
          :key="index"
          cols="6"
          class="d-flex flex-column align-center"
        >
          <!-- صورة مصغرة -->
          <v-img :src="img.url" max-height="120" max-width="120" class="mb-2" />

          <!-- اسم الصورة أو المسار -->
          <div class="text-caption mb-2">
            {{ img.original_name || img.image_path }}
          </div>

          <!-- زر الحذف -->
          <v-btn
            color="red"
            size="small"
            variant="outlined"
            @click="markPhotoForDeletion(img)"
          >
            {{ $t('dialogs.editService.delete') }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- رفع صور جديدة -->
      <v-file-input
        v-model="editService.new_photos"
        :label="$t('dialogs.editService.uploadNewPhotos')"
        prepend-inner-icon="mdi-image-plus"
        variant="outlined"
        multiple
        accept="image/*"
        class="mt-4 mb-4"
      />

      <!-- Title AR -->
<v-text-field
  v-model="editService.title_ar"
  :label="$t('dialogs.editService.titleFieldAr')"
  prepend-inner-icon="mdi-format-title"
  variant="outlined"
  class="mb-4"
/>

<!-- Title EN -->
<v-text-field
  v-model="editService.title_en"
  :label="$t('dialogs.editService.titleFieldEn')"
  prepend-inner-icon="mdi-format-title"
  variant="outlined"
  class="mb-4"
/>

<!-- Title DE -->
<v-text-field
  v-model="editService.title_de"
  :label="$t('dialogs.editService.titleFieldDe')"
  prepend-inner-icon="mdi-format-title"
  variant="outlined"
  class="mb-4"
/>

<!-- Description AR -->
<v-textarea
  v-model="editService.description_ar"
  :label="$t('dialogs.editService.descriptionFieldAr')"
  prepend-inner-icon="mdi-text"
  variant="outlined"
  auto-grow
  rows="4"
  class="mb-2"
/>

<!-- Description EN -->
<v-textarea
  v-model="editService.description_en"
  :label="$t('dialogs.editService.descriptionFieldEn')"
  prepend-inner-icon="mdi-text"
  variant="outlined"
  auto-grow
  rows="4"
  class="mb-2"
/>

<!-- Description DE -->
<v-textarea
  v-model="editService.description_de"
  :label="$t('dialogs.editService.descriptionFieldDe')"
  prepend-inner-icon="mdi-text"
  variant="outlined"
  auto-grow
  rows="4"
  class="mb-2"
/>

    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <!-- Actions -->
    <v-card-actions class="d-flex justify-end">
      <v-btn
        variant="outlined"
        color="grey-darken-1"
        prepend-icon="mdi-close-circle"
        @click="cancelEdit"
        class="px-6"
      >
        {{ $t('dialogs.editService.cancel') }}
      </v-btn>

      <v-btn
        color="primary"
        prepend-icon="mdi-content-save"
        @click="saveEdit"
        :loading="savingEdit"
        class="px-6"
      >
        {{ $t('dialogs.editService.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>




 <!-- Delete Dialog -->
<v-dialog v-model="confirmDialog" max-width="600">
  <v-card class="pa-4">
    <v-card-title class="d-flex align-center justify-center">
      <v-icon size="36" color="red" class="me-3">mdi-delete-alert</v-icon>
      <span class="text-h5 font-weight-medium">Confirm Deletion</span>
    </v-card-title>

    <v-card-text class="text-center mt-2">
      <div class="text-body-1 mb-2">
        Are you sure you want to
        <strong style="color: #b71c1c">delete this service?</strong>
      </div>
      <div class="text-body-2 text-medium-emphasis">
        This action cannot be undone. Once deleted, the service will be permanently removed from the system.
      </div>
    </v-card-text>

    <v-divider class="my-4"></v-divider>

    <v-card-actions class="justify-center">
      <v-btn variant="outlined" color="grey" @click="cancelDeletion" class="px-6">
        Cancel
      </v-btn>
      <v-btn
        color="red"
        variant="tonal"
        class="px-6"
        @click="confirmDeletion"
        :loading="loading"
      >
        <v-icon start>mdi-delete</v-icon>
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

      <v-snackbar
  v-model="snackbar"
  :timeout="3000"
  :color="snackbarColor"
  location="bottom right"
>
  <v-icon start>mdi-information</v-icon>
  {{ snackbarMessage }}

  <template v-slot:actions>
    <v-btn color="white" variant="text" @click="snackbar = false">
      Close
    </v-btn>
  </template>
</v-snackbar>



    <!--Learn More Dialog -->
<v-dialog v-model="dialog" max-width="900px" persistent>
  <v-card class="pa-6">
    <!-- Title bar with Close icon -->
    <v-card-title class="d-flex justify-end pa-0 mb-2">
      <v-btn icon color="grey-darken-1" @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-row>
      <!-- Image -->
      <v-col cols="12" md="6">
       <v-carousel
  v-if="selectedService?.images?.length"
  hide-delimiters
  height="300"
>
  <v-carousel-item
    v-for="img in selectedService.images"
    :key="img.id"
  >
    <v-img :src="img.url" cover></v-img>
  </v-carousel-item>
</v-carousel>

      </v-col>

      <!-- Content -->
      <v-col cols="12" md="6">
       <!-- Title -->
<h2 class="text-h5 text-primary font-weight-bold mb-4">
  {{ selectedService?.title || 'Browse more about our services on the Services page' }}
</h2>

<!-- Description -->
<p class="text-body-1 text-grey-darken mb-6 font-italic">
  {{ selectedService?.description || 'Request services or send issues and inquiries via the Contact button' }}
</p>


        <!-- Bookings -->
        <div v-if="authStore.role === 'admin' && selectedService?.service_bookings?.length" class="mb-6 pa-4 rounded-lg bg-surface">
          <h3 class="text-subtitle-1 font-weight-bold text-primary mb-4">
            Bookings
          </h3>
          <div
            v-for="booking in selectedService.service_bookings"
            :key="booking.id"
            class="d-flex align-center mb-2"
          >
            <v-icon color="blue-darken-2" class="mr-2">mdi-calendar-check</v-icon>
            <span>{{ booking.message }} -<strong :style="{ color: getStatusColor(booking.status) }">
  {{ booking.status }}
</strong>
</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Actions -->
    <v-card-actions class="d-flex justify-end mt-4">
      <v-btn
        color="primary"
        class="text-white font-weight-bold mr-2"
        @click="$router.push('/contact')"
      >
        Contact
      </v-btn>

      <v-btn
        color="grey-darken-2"
        class="text-white font-weight-bold"
        @click="$router.push('/services')"
      >
        Our Services
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


</v-container>


<v-sheet
  class="d-flex flex-column justify-center align-center text-center hero-section position-relative mb-5 bg-animate"
  height="90vh"
  :style="{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }"
>
  <div
    class="position-absolute top-0 left-0 right-0 bottom-0"
    style="background-color: rgba(0,0,0,0.7);"
  ></div>

  <div class="position-relative" style="z-index: 1;">
    <div 
      class="text-h4 font-weight-bold mb-6 text-primary"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      {{ $t('home.hero.title') }}
    </div>

    <div class="text-subtitle-1 mb-8 text-grey"
         data-aos="fade-up"
         data-aos-duration="1000"
         data-aos-delay="600"
    >
      <b>{{ $t('home.hero.subtitle') }}</b>
    </div>

    <div class="d-flex flex-row justify-center"
         data-aos="fade-up"
         data-aos-duration="1000"
         data-aos-delay="800"
    >
      <v-btn
        variant="outlined"
        color="primary"
        class="mr-4 font-weight-bold elevation-2 transition-fast-in-fast-out hover-scale"
        size="x-large"
        to="/about"
      >
        {{ $t('home.hero.learnMore') }}
      </v-btn>

      <v-btn
        color="primary"
        class="text-white font-weight-bold elevation-6 transition-fast-in-fast-out hover-scale"
        size="x-large"
        to="/contact"
      >
        {{ $t('home.hero.contact') }}
      </v-btn>
    </div>
  </div>
</v-sheet>

<v-container class="d-flex justify-center my-12">
  <v-sheet
    height="6"
    width="320"
    rounded="lg"
    elevation="4"
    style="background: linear-gradient(to right, #FFCC80, #FFB74D, #EF6C00);"
  ></v-sheet>
</v-container>

<v-container>
  <v-row class="mt-5 mb-5" align="stretch"> 
  <v-col md="3" sm="12">
    <v-card class="pa-6 text-center elevation-4 hover-scale h-100"  
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="200"
            color="surface"
    >
      <v-icon size="48" color="primary">mdi-calendar-star</v-icon>
      <v-card-text class="text-h5 font-weight-bold text-primary">10+</v-card-text>
      <p class="text-subtitle-1 text-secondary">{{ $t('home.cards.experience') }}</p>
    </v-card>
  </v-col>

  <v-col md="3" sm="12">
    <v-card class="pa-6 text-center elevation-4 hover-scale h-100"  
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="300"
            color="surface"
    >
      <v-icon size="48" color="primary">mdi-star-circle</v-icon>
      <v-card-text class="text-h5 font-weight-bold text-primary">95%</v-card-text>
      <p class="text-subtitle-1 text-secondary">{{ $t('home.cards.satisfaction') }}</p>
    </v-card>
  </v-col>

  <v-col md="3" sm="12">
    <v-card class="pa-6 text-center elevation-4 hover-scale h-100"  
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="400"
            color="surface"
    >
      <v-icon size="48" color="primary">mdi-briefcase-check</v-icon>
      <v-card-text class="text-h5 font-weight-bold text-primary">250+</v-card-text>
      <p class="text-subtitle-1 text-secondary">{{ $t('home.cards.projects') }}</p>
    </v-card>
  </v-col>

  <v-col md="3" sm="12">
    <v-card class="pa-6 text-center elevation-4 hover-scale h-100"  
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="500"
            color="surface"
    >
      <v-icon size="48" color="primary">mdi-account-group</v-icon>
      <v-card-text class="text-h5 font-weight-bold text-primary">20+</v-card-text>
      <p class="text-subtitle-1 text-secondary">{{ $t('home.cards.team') }}</p>
    </v-card>
  </v-col>
</v-row>

</v-container>

  

 <v-container class="d-flex justify-center my-12">
  <v-sheet
    height="6"
    width="320"
    rounded="lg"
    elevation="4"
    color="primary"
  ></v-sheet>
</v-container> 




<!-- why choose our services -->


<div class="mt-5">
  <v-container>
   <v-row>
  <v-col cols="12" md="7" data-aos="fade-right" data-aos-duration="700">
    <!-- Badge -->
    <div
      class="px-4 py-2 mb-3 rounded-pill bg-surface text-primary text-subtitle-2 font-weight-medium mb-4 d-inline py-4"
    >
      {{ $t('home.servicesSection.badge') }}
    </div>

    <!-- Title -->
    <p class="font-weight-bold text-h3 mt-5 text-primary">
      {{ $t('home.servicesSection.title') }}
    </p>

    <!-- Description -->
    <p class="mt-4 text-body-1 text-secondary">
      {{ $t('home.servicesSection.description') }}
    </p>

    <!-- Feature Cards -->
    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg" color="surface">
      <v-avatar size="40" class="ms-2" color="primary">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">{{ $t('home.servicesSection.features.quality.title') }}</p>
        <p class="text-secondary">{{ $t('home.servicesSection.features.quality.desc') }}</p>
      </div>
    </v-card>

    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg" color="surface">
      <v-avatar size="40" class="ms-2" color="primary">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">{{ $t('home.servicesSection.features.warranty.title') }}</p>
        <p class="text-secondary">{{ $t('home.servicesSection.features.warranty.desc') }}</p>
      </div>
    </v-card>

    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg" color="surface">
      <v-avatar size="40" class="ms-2" color="primary">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">{{ $t('home.servicesSection.features.innovation.title') }}</p>
        <p class="text-secondary">{{ $t('home.servicesSection.features.innovation.desc') }}</p>
      </div>
    </v-card>
  </v-col>

  <v-col cols="12" md="5" class="d-flex align-center justify-center" data-aos="fade-left" data-aos-delay="200" data-aos-duration="700">
    <v-img
      :src="servicesG"
      max-width="100%"
      contain
    ></v-img>
  </v-col>
</v-row>

  </v-container>
</div>


<v-container class="d-flex justify-center my-12">
  <v-sheet
    height="6"
    width="320"
    rounded="lg"
    elevation="4"
    style="background: linear-gradient(to right, #FFCC80, #FFB74D, #EF6C00);"
  ></v-sheet>
</v-container>




<v-container   >
 <p class="font-weight-bold text-h3 mt-5 text-primary text-center mb-5 mt-5" 
   data-aos="fade-up"  
   data-aos-delay="200">
  {{ $t('home.projectStages.title') }}
</p>

<v-carousel
  class="mt-5"
  data-aos="zoom-in"
  data-aos-delay="400"
  data-aos-duration="1000"
  cycle
  height="500"
  interval="8000"
  hide-delimiter-background
  transition="slide-x-transition"
  :transition-duration="2000" 
>
  <v-carousel-item>
    <v-img :src="servicesH" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.systemIntegration.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.systemIntegration.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesI" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.techAnalysis.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.techAnalysis.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesJ" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.cadDesign.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.cadDesign.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesK" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.management.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.management.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesL" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.operation.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.operation.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesM" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.maintenance.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.maintenance.desc') }}
      </p>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <v-img :src="servicesN" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-primary">
        {{ $t('home.projectStages.items.training.title') }}
      </h2>
      <p class="text-body-1 text-secondary">
        {{ $t('home.projectStages.items.training.desc') }}
      </p>
    </div>
  </v-carousel-item>
</v-carousel>

</v-container>


<v-container fluid class="hero bg-pink d-flex flex-column align-center justify-center text-center pa-4 pa-md-12"  data-aos="fade-up"   data-aos-duration="1000">

  <!-- العنوان الفرعي -->
  <div class="px-4 py-2 mb-3 rounded-pill bg-surface text-primary text-subtitle-1 font-weight-medium mb-4 d-inline">
  {{ $t('home.cta.startProject') }}
</div>

<!-- العنوان الرئيسي -->
<h1 class="text-h4 text-md-h2 font-weight-bold text-text mb-4">
  {{ $t('home.cta.mainTitle1') }}
  <span class="text-primary">{{ $t('home.cta.mainTitle2') }}</span>
</h1>

<!-- النص -->
<p class="text-body-2 text-md-h5 text-text mb-6">
  {{ $t('home.cta.description') }}
</p>

<!-- الأزرار -->
<div class="d-flex flex-column flex-sm-row gap-4 justify-center">
  <v-btn
    variant="outlined"
    class="text-text font-weight-bold elevation-2 transition-fast-in-fast-out hover-ora hover-scale mb-4 mb-sm-0"
    size="large"
    rounded="lg"
    to="/services"
  >
    {{ $t('home.cta.btnViewProjects') }}
  </v-btn>

  <v-btn
    color="white"
    class="text-primary font-weight-bold hover-scale"
    size="large"
    rounded="lg"
    to="/contact"
  >
    {{ $t('home.cta.btnContactNow') }}
  </v-btn>
</div>


</v-container>


    </div>














</template>

<script>
import { useServicesStore } from '@/store/servicesData'
import { useAuthStore } from '@/store/auth'
import { useOurRequestStore } from '@/store/ourRequest'

import heroImage from '@/assets/images/ser-4.avif'


import servicesG from '@/assets/images/servicesG.jpg'
import servicesH from '@/assets/images/servicesH.jpg'
import servicesI from '@/assets/images/servicesI.jpg'
import servicesJ from '@/assets/images/servicesJ.jpg'
import servicesK from '@/assets/images/servicesK.jpg'
import servicesL from '@/assets/images/servicesL.jpg'
import servicesM from '@/assets/images/servicesM.jpg'
import servicesN from '@/assets/images/servicesN.jpg'


export default {
  data() {
    return {
       


       loadingHome: true,
      heroImage,

           servicesG,
      servicesH,
      servicesI,
      servicesJ,
      servicesK,
      servicesL,
      servicesM,
      servicesN,

       dialog: false,
      selectedService: null,

       confirmDialog: false,

      confirmDialogEdit: false,

      toDeleteId: null,

         loading: false,

         AddDialog:false,
          addingService: false,
        newService: {
  title_ar: '',
  title_en: '',
  title_de: '',
  description_ar: '',
  description_en: '',
  description_de: '',
  images: []  // تبقى كما هي للصور
},



         editService: {
  id: null,
  title_ar: '',
  title_en: '',
  title_de: '',
  description_ar: '',
  description_en: '',
  description_de: '',
  images: [],        // الصور الحالية
  new_photos: [],    // الصور الجديدة
  deleted_photos: [] // الصور التي اختار المستخدم حذفها
},

          snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success',

      savingEdit: false,

      showDetailsDialog: false,

      // هنا بنخزن الـ features لكل خدمة حسب العنوان
      features: {
        'Medical Facility Maintenance': [
          '24/7 Emergency Support',
          'Certified Medical Engineers',
          'Preventive Maintenance Plans'
        ],
        'Printing & Gas Equipment Service': [
          'Precision Calibration',
          'Gas Safety Compliance',
          'Industrial Printer Support'
        ],
        'Fuel Station & Energy Systems': [
          'Safety Compliance Checks',
          'Energy Efficiency Solutions',
          '24/7 Fuel Station Support'
        ],
        'Crude Oil Infrastructure': [
          'Pipeline Integrity Monitoring',
          'Storage Safety Standards',
          'High-Pressure System Support'
        ],
        'Elevator & Lift Systems': [
          'Emergency Response Teams',
          'Certified Lift Engineers',
          'Preventive Maintenance Programs'
        ],
        'Alarm & Protection Systems': [
          'Advanced Alarm Systems',
          '24/7 Monitoring Services',
          'Smart Integration with IoT Devices'
        ]
      }


    }
  },
  computed:{
    servicesStore() {
      return useServicesStore()
    },
    authStore() {
      return useAuthStore()
    },
     ourRequestStore() {
      return useOurRequestStore()
    },
  },
 methods: {

   async openDetailsDialog(id) {
      await this.ourRequestStore.fetchBookingDetails(id);

      this.showDetailsDialog = true;
    },

  getStatusColor(status) {
    if (status === "confirmed") return "green"
    if (status === "pending") return "orange"
    if (status === "cancelled") return "red"
    return "grey"
  },

  getServiceImage(service) {
  if (service.images && service.images.length > 0) {
    return service.images[0].url
  }
  // صورة افتراضية من النت إذا ما في صور
  return "https://via.placeholder.com/400x220?text=No+Image"
},


  async addService() {
    this.addingService = true
    try {
     const newServiceObj = {
  title_ar: this.newService.title_ar,
  title_en: this.newService.title_en,
  title_de: this.newService.title_de,
  description_ar: this.newService.description_ar,
  description_en: this.newService.description_en,
  description_de: this.newService.description_de,
  images: this.newService.images
}


      await this.servicesStore.createServiceFromApi(newServiceObj)

      this.snackbarMessage = 'Service added successfully!'
      this.snackbarColor = 'success'
      this.snackbar = true

     this.newService = {
  title_ar: '',
  title_en: '',
  title_de: '',
  description_ar: '',
  description_en: '',
  description_de: '',
  images: []
}

      this.AddDialog = false
    } catch (error) {
      this.snackbarMessage = 'Failed to add service'
      this.snackbarColor = 'error'
      this.snackbar = true
      console.error(error)
    } finally {
      this.addingService = false
    }
  },

 openEditDialog(service) {
  this.editService = {
    id: service.id,
    title_ar: service.title_ar || '',
    title_en: service.title_en || '',
    title_de: service.title_de || '',
    description_ar: service.description_ar || '',
    description_en: service.description_en || '',
    description_de: service.description_de || '',
    images: [...service.images], // عرض الصور الحالية
    new_photos: [],
    deleted_photos: []
  }
  this.confirmDialogEdit = true
},




 cancelEdit() {
  this.confirmDialogEdit = false
  this.editService = {
    id: null,
    title_ar: '',
    title_en: '',
    title_de: '',
    description_ar: '',
    description_en: '',
    description_de: '',
    images: [],
    new_photos: [],
    deleted_photos: []
  }
},



 markPhotoForDeletion(img) {
  if (img.id) {
    this.editService.deleted_photos.push(img.id)
    console.log("❌ Marked photo for deletion (id):", img.id)
  } else if (img.image_path) {
    this.editService.deleted_photos.push(img.image_path)
    console.log("❌ Marked photo for deletion (path):", img.image_path)
  }
  this.editService.images = this.editService.images.filter(i => i !== img)
},


  async saveEdit() {
  this.savingEdit = true
  console.log("🚀 Saving edit with data:", this.editService)
  try {
    const updated = await this.servicesStore.updateServiceFromApi(
      this.editService.id,
      {
        title_ar: this.editService.title_ar,
        title_en: this.editService.title_en,
        title_de: this.editService.title_de,
        description_ar: this.editService.description_ar,
        description_en: this.editService.description_en,
        description_de: this.editService.description_de,
        new_photos: this.editService.new_photos,
        deleted_photos: this.editService.deleted_photos
      }
    )
    console.log("✅ Service updated:", updated)
    this.snackbarMessage = 'Service updated successfully!'
    this.snackbarColor = 'primary'
    this.snackbar = true
    this.confirmDialogEdit = false
  } catch (error) {
    console.error("❌ Failed to update service:", error)
    this.snackbarMessage = 'Failed to update service!'
    this.snackbarColor = 'error'
    this.snackbar = true
  } finally {
    this.savingEdit = false
  }
},

   async openDialog(id) {
    this.dialog = true
    try {
      let token = localStorage.getItem('accessToken')
      if (!token) throw new Error('No access token found')
      token = token.replace(/^'+|'+$/g, '').trim()

      const res = await fetch(`https://api.vireolin.de/api/serviceTypes/${id}`, {
        headers: {
          Accept: 'application/json',
      'x-locale': localStorage.getItem('locale') || 'de',

          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error('Failed to fetch service details')
      const data = await res.json()

      // الاستجابة عندك عبارة عن مصفوفة داخل مصفوفة
      this.selectedService = data.data[0]
    } catch (err) {
      console.error('Error fetching service details:', err)
    }
  },

  openConfirmDialog(id) {
    this.toDeleteId = id
    this.confirmDialog = true
  },
 cancelDeletion() {
    this.toDeleteId = null
    this.confirmDialog = false
  },

   async confirmDeletion() {
    if (this.toDeleteId == null) return
    this.loading = true
    console.log("🚀 Confirming deletion for serviceId:", this.toDeleteId)

    try {
      const deletedResponse = await this.servicesStore.deleteItem(this.toDeleteId)
      console.log("✅ Deleted response:", deletedResponse)

      this.snackbarMessage = 'Service deleted successfully!'
      this.snackbarColor = 'red'
      this.snackbar = true
    } catch (error) {
      console.error("❌ Failed to delete service:", error)
      this.snackbarMessage = 'Failed to delete service!'
      this.snackbarColor = 'error'
      this.snackbar = true
    } finally {
      this.loading = false
      this.confirmDialog = false
      this.toDeleteId = null
      console.log("🏁 Finished confirmDeletion")
    }
  }
},

async mounted() {
  this.loadingHome = true
  try {
   

    if (this.authStore.token) {
      // ✅ إذا مسجّل دخول → استدعاء الدالة الأصلية
      await this.servicesStore.listService(1)
    } else {
      // ✅ إذا مو مسجّل دخول → جلب الخدمات بدون token
      const res = await fetch(`https://api.vireolin.de/api/serviceTypes?page=1`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          'x-locale': localStorage.getItem('locale') || 'de',
        }
      })

      const data = await res.json()
      this.servicesStore.services = Array.isArray(data.data) ? data.data : []
      this.servicesStore.pagination = data.pagination || {}
    }
  } catch (err) {
    console.error(err)
  } finally {
    this.loadingHome = false
  }
}



}
</script>

<style>
.hero {
 min-height: 100vh;
  
  padding: 80px 20px;
  
}
.highlight {
  color: #fff176; 
}

.gap-4 > * {
  margin: 0 8px;
}

.hover-orange {
  color: white; /* النص الأساسي أبيض */
  border-color: white; /* الحدود بيضاء */
}

.hover-orange:hover {
  color: #ff9800; /* النص يصير برتقالي عند hover */
  background-color: white; /* الخلفية تبقى بيضاء */
  border-color: #ff9800; /* الحدود تصير برتقالية */
}

.hover-ora{
   color: white; /* النص الأساسي أبيض */
  border-color: white; /* الحدود بيضاء */
}
.hover-ora:hover{
 background-color:rgba(122, 115, 11, 0.679)

}

.hover-scale {
    cursor: pointer;
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05); /* يكبر شوي عند الـ hover */
}
.bg-animate {
  animation: floatBackground 6s ease-in-out infinite;
}

@keyframes floatBackground {
  0% {
    background-position: center 0px;
  }
  50% {
    background-position: center -50px; /* تطلع شوي */
  }
  100% {
    background-position: center 0px; /* ترجع */
  }
}

</style>
