<template>
<div>
  <div class="divider"></div>

  <div class="section">
    <div class="row center">

      <h3 class="light header">Explora tu cultura!</h3>

      <p class="col s12 m8 offset-m2 caption spacing">
      </p>

      <p class="col s12 m8 offset-m2 caption">
        <router-link to="mapa" class="btn-large waves-effect waves-light">Mapa del conflicto
          <i class="ion ion-map" data-pack="default" data-tags="gps, navigation, pin"></i>
        </router-link>
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="cronos" class="btn-large waves-effect waves-light">Cronologia
          <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
        </router-link>
      </p>
    </div>
  </div>
</div>
</template>

<script>

import * as VueMaterial from 'vue-material';
import Vue from 'vue';

export default {
  name: 'Intro',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<style>
.spacing {
  margin-top:120px;
}
.ion {
  font-size: 22px !important;
    margin-left: 10px;
  }
</style>
