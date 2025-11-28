import { createRouter, createWebHistory } from 'vue-router'

import home from '../pages/home.vue'
import About from '../pages/about.vue'
import Services from '../pages/services.vue'
import Contact from '../pages/contact.vue'
import Register from '../pages/register.vue'
import Login from '../pages/login.vue'
import badge from '@/pages/badge.vue'

const routes = [
  // {
  //   path: '/',       
  //   redirect: '/register'
  // },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/badge',
    component: badge,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/services',
    component: Services,
  },
  {
    path: '/contact',
    component: Contact,
  },
]

const router = createRouter({
  history: createWebHistory('/vireolin/'), 
  routes,
})

export default router
