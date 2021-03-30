import Vue from 'vue'
import VueRouter from 'vue-router'
import { getItem } from '@/utils/Storage'

Vue.use(VueRouter)

const routes = [
  { path: "", redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/layout', name: 'layout', component: () => import('@/views/layout'), meta: { isLogin: true }, children: [
      { path: 'welcome', name: 'welcome', component: () => import('@/components/Welcome'), meta: { isLogin: true } },
      { path: 'content', name: 'content', component: () => import('@/views/content'), meta: { isLogin: true } },
    ]
  },
  { path: '*', component: () => import('@/components/NotFound') }
]
// , children: [{ path: 'welcome', name: 'welcome', component: () => import('@/components/Welcome') }]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.meta.isLogin) {
    let token = getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }

})

export default router
