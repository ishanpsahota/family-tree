import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: HelloWorld
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]

const router = new Router({
  mode: 'history',
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