import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const jwt = require('jsonwebtoken');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
//	alert("in auth_request")	    
      state.status = 'loading'
    },
    auth_success(state, token, user) {
//	alert("in auth_success")	    
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_verify(state) {
	
	try {
		console.log(state.token)
		var decoded = jwt.verify(state.token, 'applicationsecret')
		console.log(decoded)
	      	state.status = 'success'
	} 
	catch(err) {
		console.log("error in token verification")
		console.log(err)
	      	state.status = 'error'
	}

    },
    auth_error(state) {
      state.status = 'error'
    },
    sso_success(state, token) {
//	alert("in sso_success")	    
      state.status = 'success'
      state.token = token
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:48304/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
        //    localStorage.setItem('token', token)
            // Add the following line:
            //axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:48304/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
//            localStorage.setItem('token', token)
            // Add the following line:
        //    axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    verify({ commit }) {
      return new Promise((resolve, reject) => {
	//const token = localStorage.getItem('token')
	//const token = axios.defaults.headers.common['Authorization']
        commit('auth_verify')
//        localStorage.removeItem('token')
//        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    sso({ commit },token) {
      return new Promise((resolve, reject) => {
	//const token = localStorage.getItem('token')
	//const token = axios.defaults.headers.common['Authorization']
        commit('sso_success',token)
//        localStorage.removeItem('token')
//        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
