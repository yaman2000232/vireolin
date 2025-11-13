<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter/>
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
