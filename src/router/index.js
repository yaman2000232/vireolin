import { createRouter, createWebHistory } from 'vue-router'

import home from '../pages/home.vue'
import About from '../pages/about.vue'
import Services from '../pages/services.vue'
import Contact from '../pages/contact.vue'
import Register from '../pages/register.vue'
import Login from '../pages/login.vue'
import OurRequest from '@/pages/OurRequest.vue'
import MyRequest from '@/pages/MyRequest.vue'
import OurMessages from '@/pages/OurMessages.vue'

const routes = [
  // {
  //   path: '/',       
  //   redirect: '/register'
  // },
  {
    path: '/register',
    component: Register,
      meta: { hideLayout: true },
  },
  {
    path: '/myrequest',
    component: MyRequest,
    meta: { hideLayout: true },
    
  },
  {
    path: '/ourrequest',
    component: OurRequest,
     
  },
  {
    path: '/ourmessages',
    component: OurMessages,
     
  },
  {
    path: '/login',
    component: Login,
     meta: { hideLayout: true },
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
