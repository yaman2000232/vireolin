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
import Verified from '@/pages/Verified.vue'
import CheckEmail from '@/pages/CheckEmail.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import UpdatedProfile from '@/pages/UpdatedProfile.vue'
import ChangePassword from '@/pages/ChangePassword.vue'

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
 path: '/check-email',
  component: CheckEmail,
      meta: { hideLayout: true },

},
  {
 path: '/change-password',
  component: ChangePassword,
      meta: { hideLayout: true },

},
  {
 path: '/update-profile',
  component: UpdatedProfile,
      meta: { hideLayout: true },

},
  {
 path: '/verify-email/:user_id/:token',
  component: Verified,
      meta: { hideLayout: true },

},
 {
    path: '/forgot-password',
    component: ForgotPassword,
    meta: { hideLayout: true },
    
  },
 {
    path: '/reset-password',
    component: ResetPassword,
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
  history: createWebHistory(), 
  routes,
})

export default router
