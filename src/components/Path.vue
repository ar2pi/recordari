<template>
  <div>

    <p class="col s12 m8 offset-m2 caption">
      <router-link to="mapa" class="btn-large waves-effect waves-light">Jugar
        <i class="ion ion-map" data-pack="default" data-tags="gps, navigation, pin"></i>
      </router-link>
    </p>
    <p class="col s12 m8 offset-m2 caption">
      <router-link to="cronos" class="btn-large waves-effect waves-light">Aprender
        <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
      </router-link>
    </p>

    <md-image :md-src="require('../assets/chico.svg')" class="chico"></md-image>
  </div>
</template>

<script>

  //import * as VueMaterial from 'vue-material';
  //import Vue from 'vue';

  export default {
    name: 'ap-path',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
