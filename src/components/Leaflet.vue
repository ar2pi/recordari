<template>
    <!--<gmap-map-->
      <!--:center="center"-->
      <!--:zoom="zoom"-->
      <!--style="width: 100%; height: 100%; position: relative;"-->
    <!--&gt;-->
      <!--<v-marker :lat-lng="marker"></v-marker>-->
      <!--<gmap-info-window-->
        <!--:opened="infoWinOpen"-->
        <!--:position="infoWindowPos"-->
        <!--@closeclick="reinitInfoWindow()">{{ infoContent }}-->
      <!--</gmap-info-window>-->
      <!--<gmap-marker-->
        <!--:key="index"-->
        <!--v-for="(m, index) in markers"-->
        <!--:position="m.position"-->
        <!--:clickable="true"-->
        <!--:draggable="false"-->
        <!--:icon="icon"-->
        <!--:visible="m.markerType === activeMarkers"-->
        <!--@click="toggleInfoWindow(m,index)"-->
      <!--&gt;</gmap-marker>-->
    <!--</gmap-map>-->

    <v-map :zoom="zoom" :center="center">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
    </v-map>
</template>

<script>
  import * as Vue2Leaflet from 'vue2-leaflet';
  import * as VueMaterial from 'vue-material';
  import Vue from 'vue';

  Vue.component('v-map', Vue2Leaflet.Map);
  Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
  Vue.component('v-marker', Vue2Leaflet.Marker);

//  Vue.use(VueGoogleMaps, {
//    load: {
//      key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
//    }
//  });

  export default {
    name: 'ap-map',
    data() {
      return {
//        center: {lat: 4.624335, lng: -74.063644},
//        zoom: 5,
//        infoContent: '',
//        infoWindowPos: {
//          lat: 0,
//          lng: 0
//        },
//        message: "",
//        activeMarkers: 'conciencia',
//        infoWinOpen: false,
//        currentMidx: null,
//        //optional: offset infowindow so it visually sits nicely on top of our marker
//        infoOptions: {
//          pixelOffset: {
//            width: 20,
//            height: -90
//          }
//        },
//        icon: require('../assets/Conciencia.svg'),

        zoom: 13,
        center: [47.413220, -1.219482],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(47.413220, -1.219482),
      }
    }
  }
</script>

<style>
</style>
