<template>
  <v-app-bar
    flat
    elevation="1"
    style="position: fixed; top: 0; left: 0; right: 0; z-index: 10;"
    :class="{ 'bg-transparent': isScrolled }"
    class="pa-5 "
  >
    <!-- Logo -->
    <v-toolbar-title class="d-flex align-center">
      <v-img
        :src="vireolin"
        alt="Vireolin Logo"
        width="130px"
        class="mr-2 "
        cover
      />
    </v-toolbar-title>

    <!-- Desktop Links -->
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

    <!-- Role-based buttons -->
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

    <!-- Login Button -->
   <!-- إذا المستخدم غير مسجّل دخول → Login -->
<v-btn
  v-if="!authStore.token"
  color="primary"
  class="text-white font-weight-bold d-none d-md-flex"
  prepend-icon="mdi-login"
  to="/login"
>
  Login
</v-btn>

<!-- إذا المستخدم مسجّل دخول → أيقونة الحساب -->
<v-menu v-else>
  <template #activator="{ props }">
    <v-btn
      icon
      v-bind="props"
      class="d-none d-md-flex"
    >
      <v-icon size="30">mdi-account-circle</v-icon>
    </v-btn>
  </template>

  <v-list>
    <v-list-item to="/change-password">
      <v-icon start>mdi-key-change</v-icon>
      Change Password
    </v-list-item>
    <v-list-item to="/update-profile">
      <v-icon start>mdi-account-edit</v-icon>
      Update Account
    </v-list-item>

    <v-list-item @click="logout">
      <v-icon start>mdi-logout</v-icon>
      Logout
    </v-list-item>
  </v-list>
</v-menu>


    <!-- Mobile Menu -->
    <v-menu v-model="menu" offset-y transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="d-md-none overflow-hidden">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/" @click="menu = false">Home</v-list-item>
        <v-list-item to="/services" @click="menu = false">Services</v-list-item>
        <v-list-item to="/contact" @click="menu = false">Contact</v-list-item>
        <v-list-item to="/about" @click="menu = false">About Us</v-list-item>

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

       <!-- إذا المستخدم غير مسجّل دخول → Login -->
<v-list-item
  v-if="!authStore.token"
  to="/login"
  @click="menu = false"
>
  <v-icon start>mdi-login</v-icon>
  Login
</v-list-item>

<!-- إذا المستخدم مسجّل دخول → قائمة الحساب -->
<v-menu offset-y transition="slide-y-transition" v-if="authStore.token" class="d-md-none">
  <template #activator="{ props }">
    <v-btn icon v-bind="props">
      <v-icon size="30">mdi-account-circle</v-icon>
    </v-btn>
  </template>

  <v-list>
    <v-list-item to="/change-password" @click="menu = false">
      <v-icon start>mdi-key-change</v-icon>
      Change Password
    </v-list-item>
    <v-list-item to="/update-profile" @click="menu = false">
      <v-icon start>mdi-account-edit</v-icon>
      Update Account
    </v-list-item>
    <v-list-item @click="logout">
      <v-icon start>mdi-logout</v-icon>
      Logout
    </v-list-item>
  </v-list>
</v-menu>
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
      isScrolled: false,
      vireolin
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    logout() {
      this.authStore.logout();   // ← استدعاء دالة الستور
       this.menu = false;
      this.$router.push("/login"); // ← إعادة توجيه
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
.bg-transparent {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

/* لو بدك تأثير زجاجي بدل شفافية كاملة */
.bg-transparent {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(6px);
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

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

.overflow-hidden {
  overflow: hidden;
}

/* مهم: padding للمحتوى حتى ما يختفي تحت الـ AppBar */
.v-main {
  padding-top: 72px; /* عدّل حسب ارتفاع الـ AppBar */
}
</style>
