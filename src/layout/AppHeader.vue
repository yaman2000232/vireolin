<template>
  <v-app-bar app flat color="white" elevation="1">
   <v-toolbar-title class="font-weight-bold text-black">
  Vireolin
</v-toolbar-title>


    <v-spacer />

    <div class="d-none d-md-flex">
 <v-btn variant="plain" :ripple="false" to="/" text>
  <span class="nav-link">Home</span>
</v-btn>
<v-btn variant="plain" :ripple="false" to="/about" text>
  <span class="nav-link">About</span>
</v-btn>
<v-btn variant="plain" :ripple="false" to="/services" text>
  <span class="nav-link">Services</span>
</v-btn>
<v-btn variant="plain" :ripple="false" to="/contact" text>
  <span class="nav-link">Contact</span>
</v-btn>
</div>


    <v-menu 
      v-model="menu"
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="d-md-none">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/" @click="menu = false">Home</v-list-item>
        <v-list-item to="/about" @click="menu = false">About</v-list-item>
        <v-list-item to="/services" @click="menu = false">Services</v-list-item>
        <v-list-item to="/contact" @click="menu = false">Contact</v-list-item>
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
  background-color: black;
  transition: width 0.3s ease; 
}

.nav-link:hover::after {
  width: 100%; 
}


</style>
