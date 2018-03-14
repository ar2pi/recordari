// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from "./store";
import App from './App'

Vue.config.debug = !(process.env.NODE_ENV === 'production');
Vue.config.devtools = !(process.env.NODE_ENV === 'production');
Vue.config.productionTip = !(process.env.NODE_ENV === 'production');
Vue.config.silent = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
