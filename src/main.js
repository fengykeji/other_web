// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {
  Button
} from 'element-ui'
import VueBetterScroll from 'vue2-better-scroll'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueBetterScroll)
Vue.use(Button)
/* eslint-disable no-new */
Vue.prototype.base="http://47.107.246.94/";
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
