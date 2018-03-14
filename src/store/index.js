import Vue from 'vue';
import Vuex from 'vuex';

import map from './modules/map';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    loaded: false
  },
  mutations: {
    load(state) {
      state.loaded = true;
    }
  },
  modules: {
    map,
  },
  strict: debug
});
