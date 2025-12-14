<!-- src/components/FooterSection.vue -->
<template>
  <v-footer class="footer   pa-10" padless>
    <v-container>
      <v-row>
        <!-- Our Locations -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary"><b>Our Locations</b> </h3>
         
          <p class="text-secondary"><v-icon left>mdi-map-marker</v-icon> Germany - Hampurg: Vierlander Damm71,20539</p>
          <p class="text-secondary"><v-icon left>mdi-phone</v-icon> 009718838615</p>
          <p class="text-secondary"><v-icon left>mdi-map-marker</v-icon> Syria - Damascus</p>
          <p class="text-secondary"><v-icon left>mdi-phone</v-icon> +963934767535</p>
        </v-col>

        <!-- Services -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary">Services</h3>
         <p class="text-secondary">Technical Maintenance & Repairs</p>
<p class="text-secondary">System Upgrades & Modernization</p>
<p class="text-secondary">Smart Solutions & Preventive Services</p>

        </v-col>

        <!-- About Us -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary">About Us</h3>
          <p class="text-secondary">Luxury, Quality, and Sustainability</p>
          <div class="d-flex mt-4">
           <a href="mailto:info@vireolin.de">
  <v-icon class="mr-3 text-warning">mdi-email</v-icon>
</a>


         <a href="https://www.youtube.com" target="_blank">
  <v-icon class="mr-3 text-warning">mdi-youtube</v-icon>
</a>

          <a href="https://www.instagram.com/vireolin?igsh=MWY2NGp4NTJnNmo3bw==" target="_blank">
  <v-icon class="mr-3 text-warning">mdi-instagram</v-icon>
</a>

            <a href="https://www.facebook.com/vireolin" target="_blank">
  <v-icon class="text-warning">mdi-facebook</v-icon>
</a>

          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6 white"></v-divider>

      <v-row justify="space-between">
        <v-col cols="12" md="6">
         <a href="https://www.vireolin.de" target="_blank" class="text-primary">
  <v-icon left>mdi-web</v-icon>
  www.Vireolin.de
</a>

        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <p class="text-primary">.© Vireolin Maintenance & Development Services. All rights reserved 2025.
</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>

</style>
