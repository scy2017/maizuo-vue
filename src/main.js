import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 将axios挂载到vue实例原型上,后续使用的时候不需要每次导入
import axios from '@/api/http'
Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  // 将路由挂载到vue实例中
  router,
  store,
  render: h => h(App)
}).$mount('#app')
