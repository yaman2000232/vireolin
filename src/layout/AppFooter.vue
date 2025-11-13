<!-- src/components/FooterSection.vue -->
<template>
  <v-footer class="footer orange-gradient white--text pa-10" padless>
    <v-container>
      <v-row>
        <!-- Our Locations -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4">Our Locations</h3>
          <p><v-icon left>mdi-map-marker</v-icon> UAE - Abu Dhabi: Mohammed Bin Zayed City Popular 12</p>
          <p><v-icon left>mdi-phone</v-icon> 00971508838054</p>
          <p><v-icon left>mdi-map-marker</v-icon> UAE - Al Ain: Al Noud Companies</p>
          <p><v-icon left>mdi-phone</v-icon> 009718838615</p>
          <p><v-icon left>mdi-map-marker</v-icon> Syria - Damascus-Sahnaya</p>
          <p><v-icon left>mdi-phone</v-icon> +963936172948</p>
        </v-col>

        <!-- Services -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4">Services</h3>
         <p>Technical Maintenance & Repairs</p>
<p>System Upgrades & Modernization</p>
<p>Smart Solutions & Preventive Services</p>

        </v-col>

        <!-- About Us -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-4">About Us</h3>
          <p>Luxury, Quality, and Sustainability</p>
          <div class="d-flex mt-4">
            <v-icon class="mr-3">mdi-email</v-icon>
            <v-icon class="mr-3">mdi-message</v-icon>
            <v-icon class="mr-3">mdi-youtube</v-icon>
            <v-icon class="mr-3">mdi-instagram</v-icon>
            <v-icon>mdi-facebook</v-icon>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6 white"></v-divider>

      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <p><v-icon left>mdi-web</v-icon> www.Vireolin.ae</p>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <p>.© Vireolin Maintenance & Development Services. All rights reserved 2024.
</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer.orange-gradient {
  background: linear-gradient(135deg, #ebdec8, #f4a938);
  color: white;
}
</style>
