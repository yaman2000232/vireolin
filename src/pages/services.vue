<template>
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

    <!-- First Service -->
  <v-row class="mb-9">
  <v-col class="d-flex align-center"
  cols="12"
    md="6"
   
  >
    <v-img
    class="hover-scale"
      :src="servicesStore.services[0].image"
      alt="Medical Facility Maintenance"
      height="400"
      cover
    ></v-img>
  </v-col>

  <v-col
    cols="12"
    md="6"
  >
    <h2 class="text-h4 text-orange font-weight-bold  mb-4">
      {{ servicesStore.services[0].title }}
    </h2>

    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[0].description }}"
    </p>

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
    <span>Certified Medical Engineers</span>
  </div>

  <div class="d-flex align-center">
    <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
    <span>Preventive Maintenance Plans</span>
  </div>
</div>

   <v-row>
  <v-col md="6" sm="12">
    <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
      <p class="font-weight-bold mb-1">Hospital Projects</p>
      <p class="text-body-2">Advanced Operating Rooms</p>
    </div>
  </v-col>

  <v-col md="6" sm="12">
    <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
      <p class="font-weight-bold mb-1">Clinic Projects</p>
      <p class="text-body-2">Modern Diagnostic Centers</p>
    </div>
  </v-col>

  <v-col md="6" sm="12">
    <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
      <p class="font-weight-bold mb-1">Residential Projects</p>
      <p class="text-body-2">Smart Health Apartments</p>
    </div>
  </v-col>

  <v-col md="6" sm="12">
    <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
      <p class="font-weight-bold mb-1">Research Facilities</p>
      <p class="text-body-2">Innovative Labs</p>
    </div>
  </v-col>
</v-row>

  </v-col>
</v-row>
<v-row justify="center">
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

<!-- second services  -->

            <v-row class="mb-9">
  <!-- Left side: Image -->
  <v-col
    cols="12"
    md="6"
    order="1"
    order-md="1"
    class="d-flex align-center"
  >
    <v-img
      class="hover-scale"
      :src="servicesStore.services[1].image"
      alt="Printing & Gas Equipment Service"
      height="400"
      cover
    ></v-img>
  </v-col>

  <!-- Right side: Content -->
  <v-col
    cols="12"
    md="6"
    order="2"
    order-md="2"
  >
    <!-- Title -->
    <h2 class="text-h4 text-orange font-weight-bold mb-4">
      {{ servicesStore.services[1].title }}
    </h2>

    <!-- Description -->
    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[1].description }}"
    </p>

    <!-- Features -->
    <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
        Our Features
      </h3>

      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Precision Calibration</span>
      </div>

      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Gas Safety Compliance</span>
      </div>

      <div class="d-flex align-center">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Industrial Printer Support</span>
      </div>
    </div>

    <!-- Extra Grid -->
    <v-row>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Printing Projects</p>
          <p class="text-body-2">High-Volume Industrial Printers</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Gas Systems</p>
          <p class="text-body-2">Safe Distribution Networks</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Production Facilities</p>
          <p class="text-body-2">Efficient Workflow Solutions</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Safety Audits</p>
          <p class="text-body-2">Compliance & Risk Management</p>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>
<v-row justify="center">
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

<!-- third  -->
    <v-row class="mb-9">
  <!-- Image -->
  <v-col cols="12" md="6" class="d-flex align-center">
    <v-img
      class="hover-scale"
      :src="servicesStore.services[2].image"
      alt="Fuel Station & Energy Systems"
      height="400"
      cover
    ></v-img>
  </v-col>

  <!-- Content -->
  <v-col cols="12" md="6">
    <h2 class="text-h4 text-orange font-weight-bold mb-4">
      {{ servicesStore.services[2].title }}
    </h2>
    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[2].description }}"
    </p>

    <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
        Our Features
      </h3>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Safety Compliance Checks</span>
      </div>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Energy Efficiency Solutions</span>
      </div>
      <div class="d-flex align-center">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>24/7 Fuel Station Support</span>
      </div>
    </div>

    <v-row>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Fuel Distribution</p>
          <p class="text-body-2">Reliable Supply Networks</p>
        </div>
      </v-col>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Energy Systems</p>
          <p class="text-body-2">Smart Grid Integration</p>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>
<v-row justify="center">
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

<!-- four  -->
    <v-row class="mb-9">
  <v-col cols="12" md="6" class="d-flex align-center">
    <v-img
      class="hover-scale"
      :src="servicesStore.services[3].image"
      alt="Crude Oil Infrastructure"
      height="400"
      cover
    ></v-img>
  </v-col>

  <v-col cols="12" md="6">
    <h2 class="text-h4 text-orange font-weight-bold mb-4">
      {{ servicesStore.services[3].title }}
    </h2>
    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[3].description }}"
    </p>

    <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
        Our Features
      </h3>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Pipeline Integrity Monitoring</span>
      </div>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Storage Safety Standards</span>
      </div>
      <div class="d-flex align-center">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>High-Pressure System Support</span>
      </div>
    </div>

    <v-row>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Pipeline Projects</p>
          <p class="text-body-2">Advanced Inspection Systems</p>
        </div>
      </v-col>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Storage Units</p>
          <p class="text-body-2">Safe & Secure Facilities</p>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>
<v-row justify="center">
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

 <!-- five -->


    <v-row class="mb-9">
  <v-col cols="12" md="6" class="d-flex align-center">
    <v-img
      class="hover-scale"
      :src="servicesStore.services[4].image"
      alt="Elevator & Lift Systems"
      height="400"
      cover
    ></v-img>
  </v-col>

  <v-col cols="12" md="6">
    <h2 class="text-h4 text-orange font-weight-bold mb-4">
      {{ servicesStore.services[4].title }}
    </h2>
    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[4].description }}"
    </p>

    <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
        Our Features
      </h3>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Emergency Response Teams</span>
      </div>
      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Certified Lift Engineers</span>
      </div>
      <div class="d-flex align-center">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Preventive Maintenance Programs</span>
      </div>
    </div>

    <v-row>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Residential Buildings</p>
          <p class="text-body-2">Smart Elevator Systems</p>
        </div>
      </v-col>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Commercial Towers</p>
          <p class="text-body-2">High-Speed Lifts</p>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>
<v-row justify="center">
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

 

 <!-- six  -->


        <v-row class="mb-9">
  <!-- Image -->
  <v-col cols="12" md="6" class="d-flex align-center">
    <v-img
      class="hover-scale"
      :src="servicesStore.services[5].image"
      alt="Alarm & Protection Systems"
      height="400"
      cover
    ></v-img>
  </v-col>

  <!-- Content -->
  <v-col cols="12" md="6">
    <!-- Title -->
    <h2 class="text-h4 text-orange font-weight-bold mb-4">
      {{ servicesStore.services[5].title }}
    </h2>

    <!-- Description -->
    <p class="text-body-1 text-grey-darken mb-6 font-italic">
      "{{ servicesStore.services[5].description }}"
    </p>

    <!-- Features -->
    <div class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
        Our Features
      </h3>

      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Advanced Alarm Systems</span>
      </div>

      <div class="d-flex align-center mb-2">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>24/7 Monitoring Services</span>
      </div>

      <div class="d-flex align-center">
        <v-icon color="green-darken-2" class="mr-2">mdi-check-circle</v-icon>
        <span>Smart Integration with IoT Devices</span>
      </div>
    </div>

    <!-- Extra Grid -->
    <v-row>
      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Residential Security</p>
          <p class="text-body-2">Smart Home Alarm Systems</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Commercial Protection</p>
          <p class="text-body-2">Integrated Safety Solutions</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Industrial Facilities</p>
          <p class="text-body-2">High-Security Monitoring</p>
        </div>
      </v-col>

      <v-col md="6" sm="12">
        <div class="pa-4 mb-4 rounded-lg bg-orange-lighten-4 hover-scale">
          <p class="font-weight-bold mb-1">Emergency Response</p>
          <p class="text-body-2">Rapid Alert Systems</p>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>



  </v-container>


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

</template>
<script>
import { useServicesStore } from '@/store/servicesData'
import training from '@/assets/images/training.avif'
 export default{
    data(){
        return{
            training,

        }
    },
     computed:{
    servicesStore() {
      return useServicesStore()
    },
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
}</style>