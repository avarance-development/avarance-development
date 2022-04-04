import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Shop from '../views/Shop.vue'
import Error404 from '../views/Error404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: "Login",
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: "Register",
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue'),
    meta: {
      title: "Reset Password",
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      title: "Shop",
    }
  },
  {
    path: "/:catchAll(.*)",
    name: 'Error404',
    component: () => import('../views/Error404.vue'),
    meta: {
      title: "Error 404",
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Avarance`;
  next();
})

export default router
