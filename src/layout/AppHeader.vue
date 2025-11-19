<template>
  <v-app-bar app flat color="white" elevation="1" class="position-relative">

    <!-- الاسم يسار -->
    <v-toolbar-title class="font-weight-bold text-black">
      Vireolin
    </v-toolbar-title>

    <!-- الروابط في المنتصف (فقط md+) -->
    <div 
      class="d-none d-md-flex justify-center align-center links-center"
    >
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

    <!-- زر Login يمين (فقط md+) -->
    <v-btn
      color="orange-darken-2"
      class="text-white font-weight-bold d-none d-md-flex"
      prepend-icon="mdi-login"
      to="/login"
    >
      Login
    </v-btn>

    <!-- القائمة للموبايل -->
    <v-menu 
      v-model="menu"
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- هنا الحل الحقيقي -->
        <v-btn icon v-bind="props" class="d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/" @click="menu = false">Home</v-list-item>
        <v-list-item to="/services" @click="menu = false">Services</v-list-item>
        <v-list-item to="/contact" @click="menu = false">Contact</v-list-item>
        <v-list-item to="/about" @click="menu = false">About Us</v-list-item>

        <v-list-item to="/login" @click="menu = false">
          <v-icon start>mdi-login</v-icon> Login
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menu: false
    }
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
  color: rgb(0, 0, 0);
  text-transform: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: orange;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
