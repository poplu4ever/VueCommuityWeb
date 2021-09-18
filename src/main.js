import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'
import '@/utils/veevalidate'
import directives from '@/utils/directive'

Vue.use(Alert)
Vue.use(Pop)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
