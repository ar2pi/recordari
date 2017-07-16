<template>
  <div class="full-height">

  <sidebar></sidebar>
  <main class="full-height">
  <gmap-map
    :center="center"
    :zoom="7"
    style="width: 100%; height: 100%; position: relative;"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
  </main>
  <bottombar></bottombar>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Bottombar from './Bottombar.vue';

import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input
  }
});

export default {
  name: 'Map',
  components:{
    'sidebar': Sidebar,
    'bottombar': Bottombar
  },
  ready: function() {
    $('.button-collapse').sideNav();
  },
  data () {
    return {
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }, {
        position: {lat: 11.0, lng: 11.0}
      }]
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app, .full-height {
  height: 100%;
}
</style>
