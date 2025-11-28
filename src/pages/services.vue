<template>
  <v-skeleton-loader
    v-if="servicesStore.loading"
    type="card, article, actions"
    class="mx-auto"
    max-width="1000"
  ></v-skeleton-loader>

  <div v-else>
    <v-container fluid class="mt-5">
      <!-- Section Header -->
      <v-row justify="center">
        <v-col cols="12" md="6">
          <div
            class="d-flex flex-column justify-center align-center pa-8 text-center"
            color="grey-lighten-4"
          >
            <div
              class="px-4 py-2 rounded-pill bg-grey-lighten-3 text-orange-darken-2 text-subtitle-2 font-weight-medium mb-4"
            >
              Our Distinguished Services
            </div>

            <div class="text-h2 font-weight-bold text-grey-darken-4 mb-4">
              Our Services
            </div>

            <div class="text-body-1 text-grey-dark mb-6">
              We deliver professional maintenance and service solutions tailored
              to residential and commercial needs — from routine inspections to
              urgent repairs, with a focus on reliability, efficiency, and
              long-term care.
            </div>

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

      <!-- Services Loop -->
      <v-container>
        <v-row
          v-for="service in servicesStore.services"
          :key="service.id"
          class="mb-9"
        >
          <!-- صورة الخدمة -->
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-img
              class="hover-scale"
              :src="service.images[0]?.url"
              alt="Service Image"
              height="400"
              cover
            ></v-img>
          </v-col>

          <!-- تفاصيل الخدمة -->
          <v-col cols="12" md="6">
            <h2 class="text-h4 text-orange font-weight-bold mb-4">
              {{ service.title }}
            </h2>

            <p class="text-body-1 text-grey-darken mb-6 font-italic">
              "{{ service.description }}"
            </p>

            <!-- مثال على تفاصيل إضافية -->
            <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
              <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
                Our Features
              </h3>
              <div class="d-flex align-center mb-2">
                <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
                <span>24/7 Emergency Support</span>
              </div>
              <div class="d-flex align-center mb-2">
                <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
                <span>Certified Engineers</span>
              </div>
            </div>
          </v-col>

          <!-- Divider بين كل خدمة -->
          <v-col cols="12" class="d-flex justify-center">
            <div
              style="
                height: 4px;
                width: 50%;
                border-radius: 2px;
                background: linear-gradient(to right, #FFCC80, #EF7444);
              "
            ></div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Training Section -->
      <v-container fluid class="py-10 bg-grey-lighten-4">
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <!-- Title -->
            <h2 class="text-h4 text-orange-darken-3 font-weight-bold mb-6">
              Our Office Provides High-Quality Training & Qualification
            </h2>

            <!-- Image placeholder -->
            <v-img
              :src="training"
              alt="Training & Development"
              height="400"
              class="mb-6 hover-scale"
              cover
            ></v-img>

            <!-- Description -->
            <p class="text-body-1 text-grey-darken mb-6 font-italic">
              We deliver professional training and qualification programs designed to enhance technical skills,
              improve safety standards, and ensure long-term excellence for both individuals and organizations.
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
    </v-container>
  </div>
</template>

<script>
import { useServicesStore } from '@/store/servicesData'
import training from '@/assets/images/training.avif'

export default {
  data() {
    return {
      training
    }
  },
  computed: {
    servicesStore() {
      return useServicesStore()
    }
  },
  async mounted() {
    await this.servicesStore.listService()
  }
}
</script>

<style>
.hover-scale {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
</style>
