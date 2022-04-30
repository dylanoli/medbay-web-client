import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
