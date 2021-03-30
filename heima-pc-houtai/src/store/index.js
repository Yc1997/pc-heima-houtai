import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/index'
import user from './modules/user/index'
import articleList from './modules/articleList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    user,
    articleList
  }
})
