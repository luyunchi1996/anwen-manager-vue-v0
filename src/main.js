// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import global_ from './components/Global'
import axios from 'axios'
import Qs from 'qs'
import VueCookie from 'vue-cookie'
import Element from 'element-ui';
Vue.use(Element);
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.GLOBAL = global_
Vue.prototype.qs = Qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
