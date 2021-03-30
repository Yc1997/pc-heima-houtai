import { LoginData } from '@/api/login'
import { setItem, getItem, removeItem } from '@/utils/Storage.js'
import { SET_USERINFO } from '../mutation_types'
export default {
  namespaced: true,
  state: {
    // userInfo: getItem('userInfo') || {},
    token: getItem('token') || ''
  },
  mutations: {
    [SET_USERINFO](state, payload) {
      state.userInfo = payload
      state.token = payload.token
      // setItem('userInfo', state.userInfo)
      setItem('token', state.token)
    },
    ['LOGOUT'](state) {
      removeItem('token')
    }
  },
  actions: {
    login({ commit }, payload) {
      LoginData(payload).then(res => {

        let { data } = res.data
        commit('SET_USERINFO', data)
        if (payload.success) {
          payload.success(res)
        }
      }).catch(err => {
        payload.success(err)
      })
    }
  }
}