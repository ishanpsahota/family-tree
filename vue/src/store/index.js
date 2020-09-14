import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let url = `http://localhost:${process.env.PORT}/`;

export default new Vuex.Store({
    state: {
          status: '',
          token: localStorage.getItem('token') || '',
          name : '',
          email: ''
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
          },
        auth_success(state, token, name, email){
            state.status = 'success'
            state.token = token
            state.name = name,
            state.email = email
          },
          auth_error(state){
            state.status = 'error'
          },
          logout(state){
            state.status = ''
            state.token = ''
          }
    },
    actions: {
          login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: url + '/login', data: user, method: 'POST' })
                .then(resp => {
                    if(resp.status === 200)
                    {
                        const token = resp.data.access_token;
                        // const user = {
                        //     name: resp.data.name,
                        //     email: resp.data.email
                        // };
                        const name = resp.data.name;
                        const email = resp.data.email;

                        localStorage.setItem('token', token);
                        localStorage.setItem('name',  name);
                        localStorage.setItem('email',  email);
                        // Add the following line:
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                        commit('auth_success', token, name, email);
                        resolve(resp);
                    }
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
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
                  delete axios.defaults.headers.common['Authorization']
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
      userToken: state => state.token
    }
})
