import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElementTiptapPlugin } from 'element-tiptap';
// import element-tiptap 样式
import 'element-tiptap/lib/index.css';
//按需引入element组件
import './plugin'
//引入element-ui css文件
import 'element-ui/lib/theme-chalk/index.css';

//引入本地存储api
import './utils/Storage'
//全局过滤器
import './utils/day'
Vue.config.productionTip = false


// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
Vue.use(ElementTiptapPlugin, { lang: "en" });
// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
