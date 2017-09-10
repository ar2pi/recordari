<template>
  <gmap-map
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
    style="width: 100%; height: 100%; position: absolute;"
  >
    <gmap-info-window
      :opened="infoWinOpen"
      :position="infoWindowPos"
      :options="infoOptions"
      @closeclick="reinitInfoWindow()">{{ infoContent }}
    </gmap-info-window>
    <gmap-cluster
      :maxZoom="10"
      :minimumClusterSize="25">
      <gmap-marker
        :key="index"
        v-for="(m,index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        :icon="m.icon"
        :visible="true"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>
    </gmap-cluster>
  </gmap-map>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import * as VueMaterial from 'vue-material';
  import Vue from 'vue';

  const testpromise = () => import('../datasets/map_victimas.json');

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
    }
  });

  export default {
    name: 'ap-map',
    mounted: function () {
      testpromise().then((data) => {
        var ms = (new Date()).getTime();
        console.log('=== started ===', ms);
        setTimeout(() => {
          let tempArray = [];
          for (let i = 0; i < data.length; i++) {
            let icon = data[i].Estado === 'Herido' ? 'circle.svg' : 'circle-red.svg';
            tempArray.push({
              position: {
                lat: parseFloat(data[i].Latitude.replace(',', '.')),
                lng: parseFloat(data[i].Longitude.replace(',', '.'))
              },
              icon: require(`../assets/icon-${icon}`)
            });
          }
          setTimeout(() => {
            this.markers = [...this.markers, ...tempArray];
          },0);
        },0);

//        this.markers = tempArray;
        console.log('=== ended ===', (new Date()).getTime() - ms);
      }).catch((err) => {
        console.error('error loading dataset!', err);
      });
    },
    methods: {
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = 'some content';
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen;
        } else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
      reinitInfoWindow: function () {
        this.currentMidx = null;
        this.infoWinOpen = false;
      }
    },
    data() {
      return {
        center: {lat: 4.624335, lng: -74.063644},
        zoom: 5,
        mapOptions: {
          disableDefaultUI: true,
          zoomControl: true
        },
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        markers: [],
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        icon: require('../assets/icon-explosion.svg')
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
