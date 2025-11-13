/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

// Router
import router from './router'

// Pinia
import { createPinia } from 'pinia'

const app = createApp(App)

// استخدم Pinia
app.use(createPinia())

// استخدم Router
app.use(router)

// سجل باقي الـ Plugins (مثل Vuetify)
registerPlugins(app)

// شغل التطبيق
app.mount('#app')
