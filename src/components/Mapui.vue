<template>
<div>
  <gmap-map :center="center"
            :zoom="zoom"
            :options="mapOptions"
            style="width: 100%; height: 100%; position: absolute;">
  </gmap-map>

  <div class="map-card md-fab md-fab-top-right">
    <md-card>
      <p class="md-body-2 sp-hinset">¿ Sabias que ?</p>
      <span class="md-body-1 sp-hinset">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</span>
      <md-card-actions>
        <md-button class="md-dense">Ver en mapa</md-button>
      </md-card-actions>
    </md-card>
  </div>
  <md-dialog md-open-from="#fab"
             md-close-to="#fab"
             ref="dialog2">
    <md-dialog-title>Filtros</md-dialog-title>

    <md-dialog-content>
      <form>
        <label>Mostrar en mapa</label>
        <md-list>
          <md-list-item>
            <md-radio v-model="radio5"
                      id="my-test13"
                      name="my-test-group4"
                      md-value="1"
                      class="md-primary">Orange radio</md-radio>
          </md-list-item>
          <md-list-item>
            <md-radio v-model="radio5"
                      id="my-test14"
                      name="my-test-group4"
                      md-value="2"
                      class="md-primary">Another Orange radio</md-radio>
          </md-list-item>
          <md-list-item>
            <md-radio v-model="radio5"
                      id="my-test15"
                      name="my-test-group4"
                      md-value="3"
                      class="md-primary">Another another Orange radio</md-radio>
          </md-list-item>
        </md-list>
        <md-list>
          <md-list-item>
            <md-checkbox id="my-test1"
                         name="my-test1"
                         v-model="checkbox">Regular Checkbox</md-checkbox>
          </md-list-item>
          <md-list-item>
            <md-checkbox id="my-test2"
                         name="my-test2"
                         v-model="checkbox"
                         class="md-primary">Primary Color</md-checkbox>
          </md-list-item>
          <md-list-item>
            <md-checkbox id="my-test3"
                         name="my-test3"
                         v-model="checkbox"
                         class="md-warn">Warn Color</md-checkbox>
          </md-list-item>
        </md-list>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog('dialog2')">Cerrar</md-button>
    </md-dialog-actions>
  </md-dialog>

  <md-button class="md-fab md-fab-bottom-left"
             id="fab"
             @click="openDialog('dialog2')">
    <md-icon>add</md-icon>
  </md-button>
</div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import * as VueMaterial from 'vue-material';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
  }
});

export default {
  name: 'ap-map',
  mounted: function() {},
  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = 'some content';
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    reinitInfoWindow: function() {
      this.currentMidx = null;
      this.infoWinOpen = false;
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  },
  data() {
    return {
      checkbox: '',
      radio5: '',
      center: {
        lat: 4.624335,
        lng: -74.063644
      },
      zoom: 5,
      mapOptions: {
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'greedy'
      },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      markers: [{
        position: {
          lat: 4,
          lng: -72
        },
        markerType: 'test'
      }],
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      icon: require('../assets/Conciencia.svg')
    }
  }
}
</script>

<style>
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#app,
.full-height {
  height: 100%;
}

.map-card {
  width: 60%;
  max-width: 600px;
}


/* overwrite default */

.md-dialog {
  width: 60%;
  min-width: 310px;
}
</style>
