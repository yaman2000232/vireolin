<template>
  <v-app-bar
    app
    flat
    color="surface"
    elevation="1"
    class="position-relative position-sticky pa-5"
  >
    <!-- Logo -->
    <v-toolbar-title class="d-flex align-center">
      <v-img
        :src="vireolin"
        alt="Vireolin Logo"
        width="130px"
        class="mr-2 bg-surface"
        cover
      />
    </v-toolbar-title>

    <!-- Desktop Links (md+) -->
    <div class="d-none d-md-flex justify-center align-center links-center">
      <v-btn variant="plain" :ripple="false" to="/" text>
        <span class="nav-link">Home</span>
      </v-btn>
      <v-btn variant="plain" :ripple="false" to="/services" text>
        <span class="nav-link">Services</span>
      </v-btn>
      <v-btn variant="plain" :ripple="false" to="/contact" text>
        <span class="nav-link">Contact</span>
      </v-btn>
      <v-btn variant="plain" :ripple="false" to="/about" text>
        <span class="nav-link">About Us</span>
      </v-btn>
    </div>

    <!-- Theme switch -->
    <v-btn
      icon
      @click="$vuetify.theme.global.name = 
        $vuetify.theme.global.name === 'light' ? 'dark' : 'light'"
      class="mx-2"
    >
      <v-icon class="theme-icon">
        {{ $vuetify.theme.global.name === 'light'
          ? 'mdi-moon-waning-crescent'
          : 'mdi-white-balance-sunny' }}
      </v-icon>
    </v-btn>

    <!-- My Requests / Manage Requests (Desktop Only) -->
    <div class="d-none d-md-flex" v-if="authStore.role === 'customer'">
      <v-btn
        color="primary"
        variant="text"
        size="small"
        class="font-weight-bold text-capitalize"
        to="/myrequest"
      >
        <v-icon start size="18">mdi-format-list-bulleted</v-icon>
        My Requests
      </v-btn>
    </div>

    <div class="d-none d-md-flex" v-if="authStore.role === 'admin'">
      <v-btn
        color="primary"
        variant="text"
        size="small"
        class="font-weight-bold text-capitalize"
        to="/ourrequest"
      >
        <v-icon start size="18">mdi-format-list-bulleted</v-icon>
        Manage Requests
      </v-btn>
    </div>

    <!-- Login Button (Desktop) -->
    <v-btn
      color="primary"
      class="text-white font-weight-bold d-none d-md-flex"
      prepend-icon="mdi-login"
      to="/login"
    >
      Login
    </v-btn>

    <!-- Mobile Menu -->
    <v-menu v-model="menu" offset-y transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/" @click="menu = false">Home</v-list-item>
        <v-list-item to="/services" @click="menu = false">Services</v-list-item>
        <v-list-item to="/contact" @click="menu = false">Contact</v-list-item>
        <v-list-item to="/about" @click="menu = false">About Us</v-list-item>

        <!-- ⭐️ ROLE-BASED MOBILE ITEMS ⭐️ -->
        <template v-if="authStore.role === 'customer'">
          <v-list-item to="/myrequest" @click="menu = false">
            <v-icon start>mdi-format-list-bulleted</v-icon>
            My Requests
          </v-list-item>
        </template>

        <template v-if="authStore.role === 'admin'">
          <v-list-item to="/ourrequest" @click="menu = false">
            <v-icon start>mdi-format-list-bulleted</v-icon>
            Manage Requests
          </v-list-item>
        </template>

        <!-- Login Mobile -->
        <v-list-item to="/login" @click="menu = false">
          <v-icon start>mdi-login</v-icon> Login
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import vireolin from '@/assets/images/Vireolin.png'
import { useAuthStore } from '@/store/auth'


export default {
  name: 'AppHeader',
  data() {
    return {
      menu: false,
      vireolin
    }
  },
  computed:{
    authStore() {
      return useAuthStore()
    },
  }
}
</script>

<style>
.links-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  position: relative;
  color: var(--v-theme-text); 
  text-transform: none;
  font-size: 16px;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: var(--v-theme-primary); 
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
