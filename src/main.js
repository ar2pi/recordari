// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.debug = !(process.env.NODE_ENV === 'production');
Vue.config.devtools = !(process.env.NODE_ENV === 'production');
Vue.config.productionTip = !(process.env.NODE_ENV === 'production');
Vue.config.silent = process.env.NODE_ENV === 'production';

// const EventBus = new Vue();
// Object.defineProperties(Vue.prototype, {
//   $bus: {
//     get: function () {
//       return EventBus
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
