import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // 将路由挂载到vue实例中
  router,
  store,
  render: h => h(App)
}).$mount('#app')
