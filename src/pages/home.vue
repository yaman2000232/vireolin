<template>

    <v-skeleton-loader
      v-if="loadingHome"
      type="card, article, actions"
      class="mx-auto"
      max-width="1000"
      
    ></v-skeleton-loader>

    <div v-else>









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
  <!-- overlay -->
  <div
    class="position-absolute top-0 left-0 right-0 bottom-0"
    style="background-color: rgba(0,0,0,0.8);"
  ></div>

  <div class="position-relative" style="z-index: 1;">
    <!-- المحتوى -->
    <div class="text-h2 font-weight-bold mb-6 text-white" style="text-shadow: 2px 2px 6px rgba(239,116,68,0.8);">
      Professional Maintenance & Service Management
    </div>
    <div class="text-subtitle-1 mb-8 text-grey-lighten-3">
      We provide complete maintenance and service follow-up with technical precision and organized workflow.
    </div>
    <div class="d-flex flex-row justify-center">
      <v-btn variant="outlined" color="orange-darken-2" class="mr-4 font-weight-bold elevation-2 transition-fast-in-fast-out hover-scale" size="x-large">
        Learn More
      </v-btn>
      <v-btn color="orange-darken-2" class="text-white font-weight-bold elevation-6 transition-fast-in-fast-out hover-scale" size="x-large">
        Contact
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
  <v-row class="mt-5 mb-5"  align="stretch"> 
    <!-- Years of Experience -->
    <v-col md="3" sm="12">
      <v-card class="pa-6 text-center elevation-4 hover-scale bg-grey-lighten-4 h-100">
        <v-icon size="48" color="orange-darken-2">mdi-calendar-star</v-icon>
        <v-card-text class="text-h5 font-weight-bold text-grey-darken-4">10+</v-card-text>
        <p class="text-subtitle-1 text-grey-darken-2">Years of Experience</p>
      </v-card>
    </v-col>

    <!-- Customer Satisfaction -->
    <v-col md="3" sm="12">
      <v-card class="pa-6 text-center elevation-4 hover-scale bg-grey-lighten-4 h-100">
        <v-icon size="48" color="orange-darken-2">mdi-star-circle</v-icon>
        <v-card-text class="text-h5 font-weight-bold text-grey-darken-4">95%</v-card-text>
        <p class="text-subtitle-1 text-grey-darken-2">Customer Satisfaction</p>
      </v-card>
    </v-col>

    <!-- Completed Projects -->
    <v-col md="3" sm="12">
      <v-card class="pa-6 text-center elevation-4 hover-scale bg-grey-lighten-4 h-100">
        <v-icon size="48" color="orange-darken-2">mdi-briefcase-check</v-icon>
        <v-card-text class="text-h5 font-weight-bold text-grey-darken-4">250+</v-card-text>
        <p class="text-subtitle-1 text-grey-darken-2">Completed Projects</p>
      </v-card>
    </v-col>

    <!-- Team Members -->
    <v-col md="3" sm="12">
      <v-card class="pa-6 text-center elevation-4 hover-scale bg-grey-lighten-4 h-100">
        <v-icon size="48" color="orange-darken-2">mdi-account-group</v-icon>
        <v-card-text class="text-h5 font-weight-bold text-grey-darken-4">20+</v-card-text>
        <p class="text-subtitle-1 text-grey-darken-2">Team Members</p>
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
    style="background: linear-gradient(to right, #FFCC80, #FFB74D, #EF6C00);"
  ></v-sheet>
</v-container>




<v-container fluid class="mt-5 mb-8">
 <v-row justify="center">
  <v-col cols="12" md="8">
    <div
      class="d-flex flex-column justify-center align-center pa-8 text-center bg-grey-lighten-4 rounded-lg"
    >
      <!-- العنوان الصغير -->
      <div class="px-4 py-2 rounded-pill bg-grey-lighten-3 text-orange-darken-2 text-subtitle-2 font-weight-medium mb-4">
        Our Distinguished Services
      </div>

      <!-- العنوان الرئيسي -->
<div class="text-h2 font-weight-bold text-orange-darken-2 mb-4">
  Our Services
</div>


      <!-- النص الوصفي -->
      <div class="text-body-1 text-grey-darken-3 mb-6">
        We deliver professional maintenance and service solutions tailored to residential and commercial needs — 
        from routine inspections to urgent repairs, with a focus on reliability, efficiency, and long-term care.
      </div>

      <!-- الخط الزخرفي -->
      <div
        style="
          height: 4px;
          width: 80px;
          border-radius: 2px;
          background: linear-gradient(to right, #FFCC80, #EF7444);
        "
      ></div>
    </div>
  </v-col>
</v-row>


       <div class="d-flex justify-center mb-6 mt-6">
  <v-btn
    color="orange-darken-2"
    class="text-white font-weight-bold px-6 py-3 rounded-lg elevation-2"
    prepend-icon="mdi-plus-box-multiple"
    variant="flat"
    @click="AddDialog = true"
  >
    Add a Service
  </v-btn>
</div>

            

           <v-dialog v-model="AddDialog" max-width="600">
  <v-card class="pa-4">

    <!-- Title -->
    <v-card-title class="d-flex align-center justify-center">
      <v-icon color="orange-darken-2" size="28" class="me-2">mdi-plus-box-multiple</v-icon>
      <span class="text-h5 font-weight-bold">Add New Service</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <!-- Image Upload -->
          <v-col cols="12">
            <v-file-input
              v-model="newService.images"
              label="Upload Service Images"
              prepend-inner-icon="mdi-image"
              variant="outlined"
              multiple
              accept="image/*"
              class="mb-4"
            />
          </v-col>

          <!-- Title -->
          <v-col cols="12">
            <v-text-field
              v-model="newService.title"
              label="Title"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              class="mb-4"
            />
          </v-col>

          <!-- Description -->
          <v-col cols="12">
            <v-textarea
              v-model="newService.description"
              label="Description"
              prepend-inner-icon="mdi-text"
              variant="outlined"
              auto-grow
              rows="4"
              class="mb-2"
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
        Close
      </v-btn>

      <v-btn
        color="orange"
        prepend-icon="mdi-content-save"
        @click="addService"
        :loading="addingService"
        class="px-6"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
<v-pagination
  v-if="servicesStore.pagination.total_pages > 1"
  v-model="servicesStore.pagination.current_page"
  :length="servicesStore.pagination.total_pages"
  @update:modelValue="servicesStore.listService($event)"
  class="mt-6"
/>


  <!-- cards -->
  <v-container>

 <v-row align="stretch">
  <v-col
    v-for="(service, index) in servicesStore.services"
    :key="index"
    cols="12"
    sm="6"
    md="4"
  >
    <v-card class="rounded-lg elevation-3 overflow-hidden hover-scale bg-grey-lighten-5 mt-5 h-100 d-flex flex-column position-relative">
      
      <!-- صورة الخدمة مع الأزرار في الزاوية -->
      <div class="position-relative">
      <v-img
  :src="getServiceImage(service)"
  height="220px"
  cover
></v-img>



        <!-- زر التعديل -->
        <v-btn
          icon="mdi-pencil"
          color="orange-lighten-1"
          class="ma-2 position-absolute"
          style="top: 8px; right: 48px; z-index: 10;"
          @click="openEditDialog(service)"
        ></v-btn>

        <!-- زر الحذف -->
        <v-btn
          icon="mdi-delete"
          color="red"
          class="ma-2 position-absolute"
          style="top: 8px; right: 8px; z-index: 10;"
          @click="openConfirmDialog(service.id)"
        ></v-btn>
      </div>

      <!-- محتوى البطاقة -->
      <v-card-text class="pa-6 text-center flex-grow-1">
        <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-4">
          {{ service.title }}
        </h3>


        <v-chip
    v-if="service.service_bookings && service.service_bookings.length"
    :color="getStatusColor(service.service_bookings[0].status)"
    text-color="white"
    class="mb-3"
  >
    {{ service.service_bookings[0].status }}
  </v-chip>



        <p class="text-body-2 text-grey-darken-2 mb-4">
          {{ service.description }}
        </p>
      </v-card-text>

      <!-- زر Learn More في الأسفل وبالمنتصف -->
      <v-card-actions class="justify-center mt-auto pb-4">
  <v-btn
    color="orange-darken-2"
    class="text-white font-weight-bold elevation-2"
    append-icon="mdi-arrow-right"
    variant="flat"
    @click="openDialog(service.id)"
  >
    Learn More
  </v-btn>
</v-card-actions>

    </v-card>
  </v-col>
</v-row>
</v-container>
 




  <!-- Edit Dialog -->
<v-dialog v-model="confirmDialogEdit" max-width="700">
  <v-card class="pa-4">

    <!-- Title -->
    <v-card-title class="d-flex justify-center align-center">
      <v-icon color="grey-darken-2" size="28" class="me-2">mdi-pencil</v-icon>
      <span class="text-h5 font-weight-bold">Edit Service</span>
    </v-card-title>

    <v-card-text>
      <!-- عرض الصور الحالية -->
      <div class="text-subtitle-1 font-weight-bold mb-2">Current Photos</div>
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
            Delete
          </v-btn>
        </v-col>
      </v-row>

      <!-- رفع صور جديدة -->
      <v-file-input
        v-model="editService.new_photos"
        label="Upload New Photos"
        prepend-inner-icon="mdi-image-plus"
        variant="outlined"
        multiple
        accept="image/*"
        class="mt-4 mb-4"
      />

      <!-- Title field -->
      <v-text-field
        v-model="editService.title"
        label="Title"
        prepend-inner-icon="mdi-format-title"
        variant="outlined"
        class="mb-4"
      />

      <!-- Description field -->
      <v-textarea
        v-model="editService.description"
        label="Description"
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
        Cancel
      </v-btn>

      <v-btn
        color="primary"
        prepend-icon="mdi-content-save"
        @click="saveEdit"
        :loading="savingEdit"
        class="px-6"
      >
        Save
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
        <v-img
          v-if="selectedService?.images?.length"
          :src="selectedService.images[0].url"
          height="300"
          cover
        ></v-img>
      </v-col>

      <!-- Content -->
      <v-col cols="12" md="6">
        <h2 class="text-h5 text-orange font-weight-bold mb-4">
          {{ selectedService?.title }}
        </h2>
        <p class="text-body-1 text-grey-darken mb-6 font-italic">
          {{ selectedService?.description }}
        </p>

        <!-- Bookings -->
        <div v-if="selectedService?.service_bookings?.length" class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
          <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
            Bookings
          </h3>
          <div
            v-for="booking in selectedService.service_bookings"
            :key="booking.id"
            class="d-flex align-center mb-2"
          >
            <v-icon color="blue-darken-2" class="mr-2">mdi-calendar-check</v-icon>
            <span>{{ booking.message }} - <strong>{{ booking.status }}</strong></span>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Actions -->
    <v-card-actions class="d-flex justify-end mt-4">
      <v-btn
        color="orange-darken-2"
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

<v-container class="d-flex justify-center my-12">
  <v-sheet
    height="6"
    width="320"
    rounded="lg"
    elevation="4"
    style="background: linear-gradient(to right, #FFCC80, #FFB74D, #EF6C00);"
  ></v-sheet>
</v-container>



<!-- why choose our services -->


<div class="mt-5">
<v-container>
   <v-row>
  <v-col cols="12" md="7">
    <div class="px-4 py-2 mb-3 rounded-pill bg-grey-lighten-4 text-orange-darken-1 text-subtitle-2 font-weight-medium mb-4 d-inline py-4">
      Complate Group
    </div>

    <p class="font-weight-bold text-h3 mt-5 text-orange"> 
      Vireolin's Diverse Services
    </p>

    <p class="mt-4 text-body-1 text-grey-darken-4">
      Our services cover the entire journey — from the very first step of planning and design, through installation and maintenance, all the way to final delivery and long-term support. We provide end-to-end solutions that ensure quality, reliability, and efficiency at every stage.
    </p>

    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg">
      <v-avatar size="40" class="ms-2" color="orange-darken-2">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">World-Class Quality</p>
        <p class="text-orange-lighten-1">International standards in execution.</p>
      </div>
    </v-card>

    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg">
      <v-avatar size="40" class="ms-2" color="orange-darken-2">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">Comprehensive Warranty</p>
        <p class="text-orange-lighten-1">Warranty on all products and services.</p>
      </div>
    </v-card>

    <v-card class="d-flex justify-start align-center mt-4 ga-3 py-2 elevation-4 rounded-lg">
      <v-avatar size="40" class="ms-2" color="orange-darken-2">
        <v-icon size="20" color="white">mdi-check-circle</v-icon>
      </v-avatar>
      <div class="d-flex flex-column align-center justify-center">
        <p class="text-h5">Continuous Innovation</p>
        <p class="text-orange-lighten-1">Latest technologies and solutions.</p>
      </div>
    </v-card>
  </v-col>

  <v-col cols="12" md="5" class="d-flex align-center justify-center">
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




<v-container>

<p class="font-weight-bold text-h3 mt-5 text-black
 text-center mb-5 mt-5">
  Project Implementation Stages
</p>

<v-carousel class="mt-5"
  cycle
  height="500"
    interval="8000"
  hide-delimiter-background
>
  <!-- 1️⃣ تكامل وربط الأنظمة -->
  <v-carousel-item>
      <v-img :src="servicesH" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">System Integration</h2>
      <p class="text-body-1 text-grey-darken-3">
        Seamless integration of diverse systems to ensure unified performance and optimized workflows.
      </p>
    </div>
  </v-carousel-item>

  <!-- 2️⃣ التحليل الفني والمسح الميداني -->
  <v-carousel-item>
      <v-img :src="servicesI" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">Technical Analysis & Field Survey</h2>
      <p class="text-body-1 text-grey-darken-3">
        Accurate field surveys and technical assessments to build a strong foundation for project success.
      </p>
    </div>
  </v-carousel-item>

  <!-- 3️⃣ التصميم والتخطيط التنفيذي CAD -->
  <v-carousel-item>
      <v-img :src="servicesJ" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">CAD Design & Planning</h2>
      <p class="text-body-1 text-grey-darken-3">
        Detailed CAD-based designs and execution plans that transform concepts into precise realities.
      </p>
    </div>
  </v-carousel-item>

  <!-- 4️⃣ الإدارة والإشراف -->
  <v-carousel-item>
      <v-img :src="servicesK" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">Management & Supervision</h2>
      <p class="text-body-1 text-grey-darken-3">
        Professional project management and supervision ensuring efficiency, safety, and timely delivery.
      </p>
    </div>
  </v-carousel-item>

  <!-- 5️⃣ التشغيل والقبول الفني -->
  <v-carousel-item>
      <v-img :src="servicesL" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">Operation & Technical Acceptance</h2>
      <p class="text-body-1 text-grey-darken-3">
        Smooth commissioning and technical acceptance processes guaranteeing reliable system performance.
      </p>
    </div>
  </v-carousel-item>

  <!-- 6️⃣ الصيانة الدورية والفحص -->
  <v-carousel-item>
      <v-img :src="servicesM" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">Periodic Maintenance & Inspection</h2>
      <p class="text-body-1 text-grey-darken-3">
        Regular maintenance and inspections to extend system lifespan and prevent unexpected failures.
      </p>
    </div>
  </v-carousel-item>

  <!-- 7️⃣ التدريب والتأهيل -->
  <v-carousel-item>
      <v-img :src="servicesN" height="300"></v-img>
    <div class="d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold mt-4 text-orange">Training & Qualification</h2>
      <p class="text-body-1 text-grey-darken-3">
        Comprehensive training programs to empower teams with the skills needed for sustainable success.
      </p>
    </div>
  </v-carousel-item>
</v-carousel>



</v-container>


<v-container fluid class="hero d-flex flex-column align-center justify-center text-center pa-4 pa-md-12">

  <!-- العنوان الفرعي -->
  <div class="px-4 py-2 mb-3 rounded-pill bg-grey-lighten-4 text-orange-darken-1 text-subtitle-1 font-weight-medium mb-4 d-inline">
    Start Your Project Now
  </div>

  <!-- العنوان الرئيسي -->
  <h1 class="text-h4 text-md-h2 font-weight-bold text-white mb-4">
    Ready to Turn Your Vision into <span class="highlight">Reality ?</span>
  </h1>

  <!-- النص -->
  <p class="text-body-2 text-md-h5 text-white mb-6">
    Contact us now and start your project with <strong>Vireolin Group</strong>
  </p>

  <!-- الأزرار -->
  <div class="d-flex flex-column flex-sm-row gap-4 justify-center">
  <v-btn
    variant="outlined"
    class="font-weight-bold elevation-2 transition-fast-in-fast-out hover-ora hover-scale mb-4 mb-sm-0"
    size="large"
    rounded="lg"
  >
    View Our Projects
  </v-btn>

  <v-btn
    color="white"
    class="text-orange font-weight-bold hover-scale"
    size="large"
    rounded="lg"
  >
    → Contact Us Now
  </v-btn>
</div>

</v-container>


    </div>














</template>

<script>
import { useServicesStore } from '@/store/servicesData'
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
      title: '',
      description: '',
      images: [] 
    },


           editService: {
      id: null,
      title: '',
      description: '',
      images: [],           // الصور الحالية
      new_photos: [],       // الصور الجديدة
      deleted_photos: []    // الصور اللي المستخدم اختار حذفها
    },
          snackbar: false,
    snackbarMessage: '',
    snackbarColor: 'success',

      savingEdit: false,

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
  },
 methods: {
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
    return servicesG
  },

  async addService() {
    this.addingService = true
    try {
      const newServiceObj = {
        title: this.newService.title,
        description: this.newService.description,
        images: this.newService.images
      }

      await this.servicesStore.createServiceFromApi(newServiceObj)

      this.snackbarMessage = 'Service added successfully!'
      this.snackbarColor = 'success'
      this.snackbar = true

      this.newService = { title: '', description: '', images: [] }
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
    title: service.title,
    description: service.description,
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
    title: '',
    description: '',
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
        title: this.editService.title,
        description: this.editService.description,
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

      const res = await fetch(`http://127.0.0.1:8000/api/serviceTypes/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error('Failed to fetch service details')
      const data = await res.json()

      // الاستجابة عندك عبارة عن مصفوفة داخل مصفوفة
      this.selectedService = data.data[0][0]
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
    await this.servicesStore.listService(1) // مرّر رقم الصفحة الأولى
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
  background: linear-gradient(135deg, #ff9800, #ffb74d); 
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
 background-color:rgb(255, 166, 0)

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
