import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export const state = () => ({
    logged: false,
    user: '',

  })
  
export const mutations = {
  login(state, email) {
    state.logged = true
    VueCookies.set("email", email)
    state.user = email
  },
  logout(state) {
    state.logged = false
    VueCookies.remove("email")
    state.user = '';
  }
}