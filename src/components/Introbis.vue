<template>
  <md-theme md-name="recordari">
    <div>
      <gmap-map :center="map.center"
                :zoom="map.zoom"
                :options="map.options"
                style="width: 100%; height: 100%; position: absolute;">
      </gmap-map>

      <md-dialog class="dialog-large"
                 md-open-from="#modal-info"
                 md-close-to="#modal-info"
                 ref="info">
        <md-dialog-title>
          <div class="text-center">Recordari</div>
        </md-dialog-title>
        <md-dialog-content>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, unde ratione, praesentium vitae magni eveniet pariatur, accusamus libero accusantium odit placeat omnis molestiae doloribus totam odio ipsam ullam quae nostrum?</div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary"
                     @click="closeDialog('info')">Ok
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <right-sidebar />
    </div>
  </md-theme>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import Vue2Filters from 'vue2-filters';
import * as VueGoogleMaps from 'vue2-google-maps';
import styles from '../datasets/styles.json';

import RightSidebar from './RightSidebar';

Vue.component('right-sidebar', RightSidebar);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4'
  }
});
Vue.use(Vue2Filters);

export default {
  name: 'ap-map',
  created() {},
  beforeRouteUpdate(to, from, next) {},
  mounted() {
    setTimeout(() => {
      this.postMount();
    }, 0);
  },
  events: {},
  methods: {
    postMount() {
      setTimeout(() => {
        this.openDialog('info');
      }, 1000);
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    }
  },
  data() {
    return {
      map: {
        zoom: 5,
        center: { lat: 4.624335, lng: -74.063644 },
        options: {
          disableDefaultUI: true,
          zoomControl: true,
          minZoom: 3,
          maxZoom: 15,
          styles,
          gestureHandling: 'greedy'
        }
      }
    };
  }
};
</script>

<style>

</style>
