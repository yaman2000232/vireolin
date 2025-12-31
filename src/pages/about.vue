<!-- src/components/AboutBanner.vue -->


<template>
   <v-skeleton-loader
    v-if="servicesStore.loading"
    type="card, article, actions"
    class="mx-auto"
    max-width="1000"
  ></v-skeleton-loader>

  <div v-else>
    <v-container fluid class="ab-a d-flex flex-column align-center justify-center text-center mt-5 mb-5">
      <v-chip
        class="mb-4 rounded-pill text-primary px-6 py-5 text-h6"
        label
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <v-icon left class="mr-2">mdi-information-outline</v-icon> About Us
      </v-chip>

      <h1 
        class="display-1 text-h2 font-weight-bold mb-2 text-primary"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Vireolin Services – Maintenance & Development
      </h1>

      <div
        class="mt-5 mb-5"
        style="height:4px;width:80px;border-radius:2px;background:linear-gradient(to right,#FFCC80,#EF7444);"
        data-aos="zoom-in"
        data-aos-duration="1000"
      ></div>

      <!-- Our Story + Stats -->
      <v-row class="mt-10 bg-surface pa-8 rounded-lg">
        <v-col cols="12" md="5" data-aos="fade-right" data-aos-duration="1000">
          <v-chip
            class="mb-4 rounded-pill text-primary px-6 py-5 text-h6"
            label
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <p>Our Story</p>
          </v-chip>

          <div class="vireolin-intro px-4 py-6">
            <h2 class="text-h4 font-weight-bold mb-6 text-primary" data-aos="fade-up">Vireolin Services</h2>
            <p class="text-body-1 mb-5" data-aos="fade-up" data-aos-delay="100">
              <strong>At Vireolin</strong>, we specialize in smart maintenance solutions that keep systems running smoothly and efficiently.
            </p>
            <p class="text-body-1 mb-5" data-aos="fade-up" data-aos-delay="200">
              We deliver <strong>advanced technologies</strong> tailored to modern infrastructure needs.
            </p>
            <p class="text-body-1 mb-5" data-aos="fade-up" data-aos-delay="300">
              Vireolin is currently based in <strong>Germany 🇩🇪</strong>
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="7" class="d-flex align-center justify-center">
          <v-row align="stretch">
            <!-- Cards with fade-right sequential -->
            <v-col cols="12" sm="6">
              <v-card elevation="2" class="pa-4 text-center h-100 hover-scale elevation-2"
                data-aos="fade-right" data-aos-duration="1000" data-aos-delay="100">
                <v-icon size="48" color="primary">mdi-calendar-star</v-icon>
                <v-card-text class="text-h5 font-weight-bold">10+</v-card-text>
                <p class="text-subtitle-1">Years of Experience</p>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card elevation="2" class="pa-4 text-center h-100 hover-scale elevation-2"
                data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                <v-icon size="48" color="primary">mdi-star-circle</v-icon>
                <v-card-text class="text-h5 font-weight-bold">95%</v-card-text>
                <p class="text-subtitle-1">Customer Satisfaction</p>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card elevation="2" class="pa-4 text-center h-100 hover-scale elevation-2"
                data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
                <v-icon size="48" color="primary">mdi-briefcase-check</v-icon>
                <v-card-text class="text-h5 font-weight-bold">250+</v-card-text>
                <p class="text-subtitle-1">Completed Projects</p>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card elevation="2" class="pa-4 text-center h-100 hover-scale elevation-2"
                data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400">
                <v-icon size="48" color="primary">mdi-account-group</v-icon>
                <v-card-text class="text-h5 font-weight-bold">20+</v-card-text>
                <p class="text-subtitle-1">Team Members</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Values & Vision -->
    <v-container fluid>
      <div class="text-center mt-5">
        <p class="text-h3 text-primary font-weight-bold mb-5" data-aos="fade-up">Our Values & Vision</p>
        <p class="text-text text-h6 mb-9" data-aos="fade-up" data-aos-delay="200">
          We believe in excellence and innovation in everything we do
        </p>
      </div>

      <v-row align="stretch">
        <v-col md="3" sm="12">
          <v-card class="pa-6 text-center fixed-card h-100" elevation="2"
            data-aos="fade-right" data-aos-delay="100">
            <v-icon size="48" color="primary" class="mb-3">mdi-diamond-stone</v-icon>
            <p class="text-h6 font-weight-bold mb-2">Our Values</p>
            <p class="text-body-2 text-primary card-text">
              Luxury and sustainability, uncompromised quality, global standards.
            </p>
          </v-card>
        </v-col>

        <v-col md="3" sm="12">
          <v-card class="pa-6 text-center fixed-card h-100" elevation="2"
            data-aos="fade-right" data-aos-delay="200">
            <v-icon size="48" color="primary" class="mb-3">mdi-eye</v-icon>
            <p class="text-h6 font-weight-bold mb-2">Our Vision</p>
            <p class="text-body-2 text-primary card-text">
              Contribute to rebuilding Syria, lead in development, inspire progress.
            </p>
          </v-card>
        </v-col>

        <v-col md="3" sm="12">
          <v-card class="pa-6 text-center fixed-card h-100" elevation="2"
            data-aos="fade-right" data-aos-delay="300">
            <v-icon size="48" color="primary" class="mb-3">mdi-target</v-icon>
            <p class="text-h6 font-weight-bold mb-2">Our Mission</p>
            <p class="text-body-2 text-primary card-text">
              Deliver innovative solutions, highest quality standards, sustainable growth.
            </p>
          </v-card>
        </v-col>

        <v-col md="3" sm="12">
          <v-card class="pa-6 text-center fixed-card h-100" elevation="2"
            data-aos="fade-right" data-aos-delay="400">
            <v-icon size="48" color="primary" class="mb-3">mdi-office-building</v-icon>
            <p class="text-h6 font-weight-bold mb-2">Real Estate Development</p>
            <p class="text-body-2 text-primary card-text">
              Comprehensive projects, luxury and quality, global standards.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Locations -->
       <!-- Locations -->
    <v-container fluid class="py-12 text-center" color="orange-lighten-5">
      <h2 class="text-h3 font-weight-bold mb-2 text-primary" 
          data-aos="fade-up" 
          data-aos-duration="1000">
        Our Locations
      </h2>

      <!-- <p class="text-h6 mb-8 text-warning" 
         data-aos="fade-up" 
         data-aos-delay="200" 
         data-aos-duration="1000">
        From Germany 🇩🇪 to Syria 🇸🇾 soon
      </p> -->

      <v-row justify="center" align="stretch" class="mt-6">
        <!-- Card 1 -->
        <v-col cols="12" md="5">
          <v-card class="pa-10 text-center hover-scale" elevation="4" color="orange-lighten-4"
            data-aos="fade-right" data-aos-duration="1000" data-aos-delay="100">
            <v-icon size="64" color="primary" class="mb-4">mdi-city</v-icon>
            <h3 class="text-h5 font-weight-bold mb-2">Germany – Hamburg</h3>
            <p class="text-body-1">
              Our current headquarters where we started delivering innovative services and technologies.
            </p>
          </v-card>
        </v-col>

        <!-- Card 2 -->
        <!-- <v-col cols="12" md="5">
          <v-card class="pa-10 text-center hover-scale" elevation="4" color="orange-lighten-4"
            data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
            <v-icon size="64" color="primary" class="mb-4">mdi-earth</v-icon>
            <h3 class="text-h5 font-weight-bold mb-2">Coming Soon – Syria</h3>
            <p class="text-body-1">
              Our next step is expanding into Syria, bringing our expertise and smart solutions to new markets.
            </p>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useServicesStore } from '@/store/servicesData'
export default{

   computed: {
    servicesStore() {
      return useServicesStore()
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

<style >
.ab-a{

    padding: 100px;
}
.hover-scale {
    cursor: pointer;
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05); 
}

.fixed-card{
  min-height: 250px;
}
.card-text {
  line-height: 1.4; 
  margin-top: 8px;
}
.fixed-card:hover{
  cursor: pointer;
  scale: 1.03;
  border: 1px solid orange;
}
.fixed-card:hover p:nth-of-type(1) {
  color: rgb(134, 103, 44);
  transition: color 0.3s ease; 
}



</style>
