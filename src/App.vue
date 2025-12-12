<template>
  <v-app>
    <AppHeader  v-if="!$route.meta?.hideLayout" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter  v-if="!$route.meta?.hideLayout" />
  </v-app>
</template>

<script>
import AppHeader from './layout/AppHeader.vue';
import AppFooter from './layout/AppFooter.vue';

export default{

components:{
  AppHeader,
  AppFooter
}


}


</script>
<style>
:root {
  --v-theme-background: #ffffff;
  --v-theme-surface: #f5f5f5;
  --v-theme-primary: #fb8c00;
  --v-theme-secondary: #9e9e9e;
  --v-theme-error: #e53935;
  --v-theme-info: #2196f3;
  --v-theme-success: #4caf50;
  --v-theme-warning: #ffc107;
  --v-theme-text: #212121;
}

html, body, .v-application, .v-card, .v-app-bar, .v-footer  {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}


</style>
