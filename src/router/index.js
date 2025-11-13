import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Services from '../pages/services.vue'
import Contact from '../pages/contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

