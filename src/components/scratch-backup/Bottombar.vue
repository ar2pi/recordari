<template>
  <md-bottom-bar>
    <md-bottom-bar-item @click="show('conciencia')"><img class="opaque" src="../assets/Conciencia.svg">Conciencia</md-bottom-bar-item>
  <md-bottom-bar-item><img class="opaque" src="../assets/Reconciliacion.svg">Reconciliacion</md-bottom-bar-item>
  <md-bottom-bar-item><img class="opaque" src="../assets/Reparacion.svg">Reparacion</md-bottom-bar-item>
  <md-bottom-bar-item><img class="opaque" src="../assets/Testimonios.svg">Testimonios</md-bottom-bar-item>
</md-bottom-bar>
</template>

<script>

import * as VueMaterial from 'vue-material';
import Vue from 'vue';

Vue.use(VueMaterial);

export default {
  name: 'Bottombar',
  // methods: {
  //   toggleLeftSidenav() {
  //     this.$refs.leftSidenav.toggle();
  //   },
  //   toggleRightSidenav() {
  //   },
  //   closeRightSidenav() {
  //   },
  //   open(ref) {
  //   },
  //   close(ref) {
  //   }
  // }
};
</script>

<style>
.md-bottom-bar {
  bottom:0;
  position: fixed;
}
.opaque {
  margin-top: -19px;
  height: 57px !important;
}
</style>
