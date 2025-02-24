import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://47.102.147.8:3000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

