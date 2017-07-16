<template>
  <md-bottom-bar md-shift>
  <md-bottom-bar-item md-icon="ondemand_video">Movies</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="music_note">Music</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="books" md-active>Books</md-bottom-bar-item>
  <md-bottom-bar-item md-icon="photo">Pictures</md-bottom-bar-item>
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
</style>
