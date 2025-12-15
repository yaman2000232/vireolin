/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

// Styles
import 'unfonts.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Router
import router from './router'

// Pinia
import { createPinia } from 'pinia'

import vuetify from './plugins/vuetify'

import echo from "./plugins/echo";

// import {echo} from "./bootstrap";



const app = createApp(App)

// استخدم Pinia
app.use(createPinia())

// استخدم Router
app.use(router)

// استخدم Vuetify (الألوان والـ theme)
app.use(vuetify)

// app.config.globalProperties.$echo = echo;
app.config.globalProperties.$echo = echo;           

// شغل التطبيق
app.mount('#app')
