import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import crypto from 'crypto'
import services from '../api/services'

// function getToken() {
//   return crypto.randomBytes(64).toString('hex');
// }

var url = services.getUrl().url;

Vue.use(Vuex)


axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

export default new Vuex.Store({
    state: {
          status: '',
          token: localStorage.getItem('token') || '',
          name : '',
          email: '',
          id: ''
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
          },
        auth_success(state, token, name, email, id){
            state.status = 'success'
            state.token = token
            state.name = name,
            state.email = email,
            state.id = id
          },
          auth_error(state){
            state.status = 'error'
          },
          logout(state){
            state.status = ''
            state.token = '',
            state.email = '',
            state.name = '',
            state.id = ''
          }
    },
    actions: {
          login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: url + '/login', data: user, method: 'POST' })
                .then(resp => {
                  // console.log(resp.data)
                    if(resp.data.status === 200)
                    {
                        // console.log(resp)
                        var data = {
                          'token': crypto.randomBytes(64).toString('hex'),
                          'name': resp.data.member.name,
                          'email': resp.data.member.email,
                          'id': resp.data.member._id
                        };
                      
                        // console.log(data)

                        localStorage.setItem('token', data.token);
                        localStorage.setItem('name',  data.name);
                        localStorage.setItem('email',  data.email);
                        localStorage.setItem('id', data.id);                        

                        // Add the following line:
                        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;                        
                        commit('auth_success', data.token, data.name, data.email, data.id);
                        resolve(resp);
                    }
                    else reject(resp)
                    
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('id')
                    reject(err)
                })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: url + '/users/create', data: user, method: 'POST' })
                .then(resp => {
                    if(resp.status === 200)
                    {
                        commit('auth_success', null, null, null);
                    }
                    // const token = resp.data.access_token
                    // localStorage.setItem('token', token)
                    // const user = resp.data.user
                    
                    // Add the following line:
                    // axios.defaults.headers.common['Authorization'] = token
                    // commit('auth_success', token, user)
                    // commit('auth_success', token)
                    resolve(resp)
                    if(resp.status != 200)
                    {
                        return resp.status
                    }
                })
                .catch(err => {
                    commit('auth_error', err)
                    // localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
          logout({commit}){
            return new Promise((resolve, reject) => {
                  commit('logout')
                  localStorage.removeItem('token')
                  localStorage.removeItem('name')
                  localStorage.removeItem('email')
                  localStorage.removeItem('id')                  
                  resolve()
                  if(!resolve())
                  {
                      reject();
                  }
            })
          },
    },
    getters : {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      name: state => state.name,
      email: state => state.email,
      userToken: state => state.token,
      id: state => state.id
    }
})
