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

// router.beforeEach((to, from, next) => {

//   console.log('-- beforeEach ---');
//   console.log(arguments);

//   // let isDelegated = false;

//   // for (let matched = (to.matched || []), i = matched.length; i--;) {
//   //     let route = matched[i];

//   //     if (route.meta.beforeEach) {
//   //         isDelegated = true;
//   //         route.meta.beforeEach(to, from, next);
//   //     }
//   // }

//   // !isDelegated && next();
//   next();
// });

// router.beforeResolve((to, from, next) => {

//   console.log('-- beforeResolve ---');
//   console.log(arguments);
//   next();
// });

// router.afterEach((to, from, next) => {

//   console.log('-- afterEach ---');
//   console.log(arguments);
//   next();
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
