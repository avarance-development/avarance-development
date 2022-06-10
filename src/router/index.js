import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Shop from '../views/Shop.vue'
import Error404 from '../views/Error404.vue'
import Contact from "../views/Contact.vue"

import { auth } from "../firebase/firebaseInit.js"

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
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: "Contact",
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/saved',
    name: 'SavedItems',
    component: () => import('../views/SavedItems.vue'),
    meta: {
      title: "Saved Items",
      requiresAuth: true,
    }
  },
  {
    path: '/shop/:category',
    name: 'Shop',
    component: Shop,
    meta: {
      title: "Shop",
    }
  },
  {
    path: '/createproduct',
    name: 'CreateProduct',
    component: () => import('../views/CreateProduct.vue'),
    meta: {
      title: "Create Product",
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/success/:sessionID',
    name: 'Success',
    component: () => import('../views/Success.vue'),
    meta: {
      title: "Success!"
    }
  },
  {
    path: '/:category/:productId',
    name: 'ViewProduct',
    component: () => import('../views/ViewProduct.vue'),
    props: true,
    meta: {
      title: "View Product",
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
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Avarance`;
  next();
})

router.beforeEach(async (to, from, next) => {
  let user = auth.currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
  
})

export default router
