<template>
<div class="">
  <gmap-map :center="center"
            :zoom="zoom"
            :options="mapOptions"
            ref="map"
            style="width: 100%; height: 100%; position: absolute;">
    <gmap-polygon :key="index"
                  v-for="(p,index) in dptBoundaries"
                  :paths="p.paths"
                  :options="p.options">
    </gmap-polygon>
  </gmap-map>
  <button type="button"
          name="button"
          @click="showRegions()"
          style="position:absolute;">Show Regions</button>
</div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import * as VueMaterial from 'vue-material';
import Vue from 'vue';

const regions = () =>
  import ('../datasets/map-fix.geojson');

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
  }
});

export default {
  name: 'ap-map',
  mounted: function() {

    console.log(this.$refs);
    console.log(VueGoogleMaps);

    regions().then((data) => {
      var ms = (new Date()).getTime();
      console.log('=== started ===', ms);
      // console.log(data);


      let dptBoundaries = [];
      for (var i = 0; i < data.features.length; i++) {

        let dpt = [];
        for (var j = 0; j < data.features[i].geometry.coordinates[0].length; j++) {
          dpt.push({
            lat: data.features[i].geometry.coordinates[0][j][1],
            lng: data.features[i].geometry.coordinates[0][j][0]
          });
        }
        this.dptBoundaries.push({
          paths: dpt,
          options: {
            strokeColor: '#FF0000',
            strokeOpacity: 0,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0.3,
            name: data.features[i].properties.name,
            stateCode: data.features[i].properties.state_code
          }
        });
      }

      //        this.markers = tempArray;
      console.log('=== ended ===', (new Date()).getTime() - ms);
    }).catch((err) => {
      console.error('error loading dataset!', err);
    });
  },
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
    showRegions: function() {
      for (let i = 0; i < this.dptBoundaries.length; i++) {
        this.dptBoundaries[i].options.strokeOpacity = 1;
      }
    }
  },
  data() {
    return {
      center: {
        lat: 4.624335,
        lng: -74.063644
      },
      zoom: 5,
      mapOptions: {
        disableDefaultUI: true,
        zoomControl: true
      },
      dptBoundaries: [],
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
</style>
