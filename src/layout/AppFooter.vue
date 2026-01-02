<!-- src/components/FooterSection.vue -->
<template>
  <v-footer class="footer pa-10" padless>
    <v-container>
      <v-row>
        <!-- Our Locations -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary">
            <b>{{ $t('footer.locations.title') }}</b>
          </h3>
         
          <p class="text-secondary">
            <v-icon left>mdi-map-marker</v-icon>
            {{ $t('footer.locations.address') }}
          </p>
          <p class="text-secondary">
            <v-icon left>mdi-phone</v-icon>
            {{ $t('footer.locations.phone') }}
          </p>
        </v-col>

        <!-- Services -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary">{{ $t('footer.services.title') }}</h3>
          <p class="text-secondary">{{ $t('footer.services.item1') }}</p>
          <p class="text-secondary">{{ $t('footer.services.item2') }}</p>
          <p class="text-secondary">{{ $t('footer.services.item3') }}</p>
        </v-col>

        <!-- About Us -->
        <v-col cols="12" md="4">
          <h3 class="text-h5 font-weight-bold mb-4 text-primary">{{ $t('footer.about.title') }}</h3>
          <p class="text-secondary">{{ $t('footer.about.text') }}</p>
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
            {{ $t('footer.website') }}
          </a>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <p class="text-primary">
            {{ $t('footer.rights') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>

</style>
