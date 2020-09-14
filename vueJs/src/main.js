import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueHeadful from 'vue-headful';
import axios from 'axios'

Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful);

Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
