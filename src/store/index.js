import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedstate from 'vuex-persistedstate'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedstate()],
  state: {
    user: "",
    auth: false,
  },
  mutations: {
    user(state,payload) {
      state.user = payload
    },
    auth(state, payload) {
      state.auth = payload
    }
  },
  actions: {
    async login({ commit }, {email,password}) {
      await axios.post('https://thawing-sea-60162.herokuapp.com/api/login',{
        email : email,
        password : password
      })
      .then((response)=>{
        commit('user', response.data.data)
        commit('auth', response.data.auth)
      }).then(() => {
        router.replace('/mypage')
      })
      .catch(()=>{
        alert('メールアドレスかパスワードが間違っています')
      })
    },
    async logout({ commit }) {
      await axios.post('https://thawing-sea-60162.herokuapp.com/api/logout')
        .then((response) => {
        commit('auth', response.data.auth)
        }).then(() => {
        this.dispatch('reload')
      })
    },
    reload() {
      router.go({path: router.currentRoute.path, force: true})
    }
  },
  modules: {
  }
})
