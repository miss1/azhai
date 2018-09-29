// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './config/axios'
import rem from './config/rem'

import Icon from 'vue-svg-icon/Icon.vue'
import { XHeader } from 'vux'

Vue.component('icon', Icon);
Vue.component('x-header', XHeader);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
