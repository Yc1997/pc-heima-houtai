import { getUser } from '@/api/user'
export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    ['SET_USER'](state, payload) {
      state.user = payload
    }
  },
  actions: {
    getUserData({ commit }) {
      getUser().then(res => {
        commit('SET_USER', res.data.data)
      })
    }
  }
}