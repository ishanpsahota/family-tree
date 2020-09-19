import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Trees from '../views/Trees.vue'
import Register from '../views/Register.vue'
import NewTree from '../views/NewTree.vue'
// import Viewtree from '../views/ViewTree2.vue'
import Viewtree from '../views/Viewtree.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/trees',
    name: 'Trees',
    component: Trees,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/new',
    name: 'NewTree',
    component: NewTree,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tree/:id',
    name: 'Viewtree',
    component: Viewtree,
    meta: {
      requiresAuth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
