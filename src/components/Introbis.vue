<template>
  <md-theme md-name="recordari">
    <div>
      <gmap-map :center="map.center"
                :zoom="map.zoom"
                :options="map.options"
                style="width: 100%; height: 100%; position: absolute;">
        <gmap-info-window :opened="infoWindow.opened"
                          :position="infoWindow.pos"
                          @closeclick="reinitInfoWindow()">
          <div class="info-content">
            <strong>{{ infoWindow.content.locality }}</strong>
            <p><span class="md-subheading">{{ infoWindow.content.number }}</span>
              <span v-html="infoWindow.content.label"></span></p>
          </div>
        </gmap-info-window>
        <gmap-polygon :key="index"
                      v-for="(p,index) in dptBoundaries"
                      :paths="p.paths"
                      :options="p.options"
                      @mouseover="outlinePolygon(p)"
                      @mouseout="resetPolygon(p)"
                      @click="toggleInfoWindow($event, p, index)">
        </gmap-polygon>
      </gmap-map>

      <md-dialog class="dialog-large md-active"
                 md-open-from="#modal-info"
                 md-close-to="#modal-info"
                 ref="info">
        <md-dialog-title>Dogz</md-dialog-title>
        <md-dialog-content>
          <div>Catzes</div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary"
                     @click="closeDialog('info')">Cerrar
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-button class="md-primary md-raised" @click="openDialog('info')">Prompt</md-button>

    </div>
  </md-theme>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Vue2Filters from 'vue2-filters'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import styles from '../datasets/styles.json'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
    }
  });
  Vue.use(Vue2Filters);

  export default {
    name: 'ap-map',
    created() {
      console.log('created');
    },
    beforeRouteUpdate(to, from, next) {

    },
    mounted() {
      console.log('mounted');
      this.openDialog('info');
    },
    events: {},
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
    },
    data() {
      return {
        mapFilters: '',
        stateBus: {
          memoizedData: {},
          outlinedPolygon: null,
          activeDataset: {}
        },
        datasets: [],
        dptBoundaries: [],
        poblationInfo: {},
        map: {
          zoom: 5,
          center: {lat: 4.624335, lng: -74.063644},
          options: {
            disableDefaultUI: true,
            zoomControl: true,
            minZoom: 3,
            maxZoom: 15,
            styles,
            gestureHandling: 'greedy'
          }
        },
        infoWindow: {
          opened: false,
          currentId: null,
          pos: {lat: 0, lng: 0},
          content: {},
          // options: {
          //     pixelOffset: {
          //         width: 0,
          //         height: -35
          //     }
          // }
        },
        tooltip: {
          show: false,
          content: '',
          center: {},
          location: null
        },
        conversions: {
          active: false,
          sign: '%',
          convertedData: {}
        },
        modalInfo: null
      }
    }
  }
</script>

<style>
  .map-card {
    width: 60%;
    min-width: 225px;
    max-width: 600px;
  }

  .info-content {
    max-width: 220px;
  }

  .active-element {
    border-left: 2px solid #0174e1;
    background-color: #eee;
  }

  .bottom-title {
    position: fixed;
    left: 96px;
    bottom: 26px;
    margin-right: 48px;
    padding: 16px;
    background-color: white;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.07), 0 3px 1px -2px rgba(0, 0, 0, 0.06);
  }

  .fab-second-bottom {
    bottom: 100px !important;
  }

  .dialog-large .md-dialog {
    width: 80%;
  }

  @media (min-width: 600px) {
    .bottom-left-sidenav {
      position: absolute;
      bottom: 1em;
      left: 1em;
    }
    .bottom-left-sidenav img {
      width: 50px;
    }
  }

  /* overwrite default */

  .md-dialog {
    width: 60%;
    min-width: 310px;
  }

  .md-list-item .md-radio {
    display: block;
  }

  .md-list-item .md-radio-container {
    float: left;
  }

  .md-sidenav .md-sidenav-content {
    max-width: 80%;
  }

  .md-dialog p {
    margin: 1em 0;
  }
</style>
