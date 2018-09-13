import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/reset.css'
import "../mock/index";
import ElementUI from 'element-ui'
import {store} from './store/store'
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
