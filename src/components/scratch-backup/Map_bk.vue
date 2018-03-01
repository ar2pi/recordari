<template>
  <div class="full-height">

    <div class="phone-viewport">
      <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">{{ message }}</h2>
      </md-toolbar>

      <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <md-toolbar class="md-large">
          <div class="md-toolbar-container">
            <img src="../assets/Recordari_blue.svg">
          </div>
        </md-toolbar>

        <p>fuentes:</p>
        <ul>
          <li>

            <p><a href="http://www.icbf.gov.co" target="_blank">icbf.gov.co</a></p>
          </li>
        </ul>

      </md-sidenav>

    </div>
    <div class="full-height">

      <main class="full-height">
        <gmap-map
          :center="center"
          :zoom="zoom"
          style="width: 100%; height: 100%; position: relative;"
        >
          <gmap-info-window
            :opened="infoWinOpen"
            :position="infoWindowPos"
            @closeclick="reinitInfoWindow()">{{ infoContent }}
          </gmap-info-window>
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :icon="icon"
            :visible="m.markerType === activeMarkers"
            @click="toggleInfoWindow(m,index)"
          ></gmap-marker>
        </gmap-map>
      </main>
      <md-bottom-bar>
        <md-bottom-bar-item @click="show('conciencia')" md-active><img class="opaque" src="../assets/Conciencia.svg">Conciencia
        </md-bottom-bar-item>
        <md-bottom-bar-item @click="show('reconciliacion')"><img class="opaque" src="../assets/Reconciliacion.svg">Reconciliacion
        </md-bottom-bar-item>
        <md-bottom-bar-item @click="show('reparacion')"><img class="opaque" src="../assets/Reparacion.svg">Reparacion
        </md-bottom-bar-item>
        <md-bottom-bar-item @click="show('testimonios')"><img class="opaque" src="../assets/Testimonios.svg">Testimonios
        </md-bottom-bar-item>
      </md-bottom-bar>
    </div>
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
    mounted: function () {},
    methods: {
      show: function (marker) {
        this.activeMarkers = marker;
        switch (marker) {
          case "reparacion":
            this.message = "Proceso de Restablecimiento de Derechos";
            break;
          case "reconciliacion":
            this.message = "Desmobilisados de grupos armados";
            break;
          case "testimonios":
            this.message = "Testimonios: ";
            break;
          case "conciencia":
            this.message = "Victimas de minas anti personales por region";
            break;
          default:
            this.message = "Elementos del conflicto"
        }
      },
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = marker.region + ': ' + marker.infoText;

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
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        message: "",
        activeMarkers: 'conciencia',
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 20,
            height: -90
          }
        },
        icon: require('../assets/Conciencia.svg')
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
    height: calc(100% - 25px);
  }

  .md-bottom-bar {
    bottom: 0;
    position: fixed;
  }

  .opaque {
    margin-top: -19px;
    height: 57px !important;
  }

  .hidden {
    display: none;
  }
</style>
