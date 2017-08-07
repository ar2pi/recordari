<template>
  <div>
    <gmap-map :center="center"
              :zoom="zoom"
              :options="mapOptions"
              style="width: 100%; height: 100%; position: absolute;">
      <gmap-info-window
        :opened="infoWinOpen"
        :position="infoWindowPos"
        @closeclick="reinitInfoWindow()">{{ infoContent }}
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

    <div class="map-card md-fab md-fab-top-right">
      <md-card>
        <p class="md-body-2 sp-hinset">¿ Sabias que ?</p>
        <span class="md-body-1 sp-hinset">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</span>
        <md-card-actions>
          <md-button class="md-accent md-dense">Ver en mapa</md-button>
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
            <md-list-item :key="index"
                          v-for="(f,index) in datasets">
              <md-radio v-model="mapFilters"
                        name="map-filters"
                        :md-value="index"
                        class="md-primary"
                        @change="showLayer">{{ f.name }}
              </md-radio>
            </md-list-item>
          </md-list>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog('dialog2')">Cerrar
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-fab-bottom-left"
               id="fab"
               @click="openDialog('dialog2')">
      <md-icon>add</md-icon>
    </md-button>

    <md-button class="md-fab md-fab-top-left md-mini md-primary" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
    </md-sidenav>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import * as VueMaterial from 'vue-material'

  const api = axios.create({
    baseURL: '/static/datasets/',
    timeout: 100000
  });

  const datasets = [
    {
      id: '1',
      name: 'Actos terroristas',
      archive: 'conciencia/xDepartamentos_actos-terroristas_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '2',
      name: 'Delitos sexuales',
      archive: 'conciencia/xDepartamentos_delitos-sexuales_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Desplazamientos y abandonos de tierras',
      archive: 'conciencia/xDepartamentos_desplazamiento-abandono_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Homicidios',
      archive: 'conciencia/xDepartamentos_homicidios_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Niños, niñas y adolescentes victimas del conflicto',
      archive: 'conciencia/xDepartamentos_nna-victimas_ESRI1985-2014.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Niños y niñas vinculados',
      archive: 'conciencia/xDepartamentos_nna-vinculados_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Secuestros y desapariciones',
      archive: 'conciencia/xDepartamentos_secuestros-desapariciones_RUV1985-2017.json',
      geography: 'department'
    },
    {
      id: '1',
      name: 'Actos de tortura',
      archive: 'conciencia/xDepartamentos_tortura_RUV1985-2017.json',
      geography: 'department'
    }
  ];

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
    }
  });

  Vue.material.registerTheme('default', {
    primary: 'indigo',
    accent: 'pink',
    warn: 'deep-orange',
  });

  export default {
    name: 'ap-map',
    created: () => {

    },
    mounted: function () {
      api.get('map-fix.geojson', {responseType: 'json'}).then((response) => {
        console.log(response);
        const ms = (new Date()).getTime();
        console.log('=== started loading regions ===', ms);
        let data = response.data.features;
        for (let i = 0; i < data.length; i++) {
          let dpt = [];
          for (let j = 0; j < data[i].geometry.coordinates[0].length; j++) {
            dpt.push({
              lat: data[i].geometry.coordinates[0][j][1],
              lng: data[i].geometry.coordinates[0][j][0]
            });
          }
          this.dptBoundaries.push({
            paths: dpt,
            options: {
              strokeColor: '#FF0000',
              strokeOpacity: 0,
              strokeWeight: 3,
              fillColor: '#FF0000',
              fillOpacity: 0,
              visible: false,
              name: data[i].properties.name,
              stateCode: data[i].properties.state_code,
              daneCode: data[i].properties['DANE:departamento']
            }
          });
        }
        console.log('=== ended loading regions ===', (new Date()).getTime() - ms);
      }).catch((err) => {
        console.error('error loading dataset!', err);
      });
    },
    events: {},
    methods: {
      showLayer: function (layer) {
        api.get(this.datasets[layer].archive, {responseType: 'json'}).then((response) => {
          response.data.objects.sort((a, b) => {
            if (+a.sum_registros < +b.sum_registros) {
              return 1;
            } else if (+a.sum_registros > +b.sum_registros) {
              return -1;
            }
            return 0;
          });
          for (let i = 0; i < response.data.objects.length; i++) {
            for (let j = 0; j < this.dptBoundaries.length; j++) {
              if (+response.data.objects[i]['codigo'] === this.dptBoundaries[j].options.daneCode) {
                this.dptBoundaries[j].options.strokeOpacity = .9;
                this.dptBoundaries[j].options.fillOpacity = 1 - (i / response.data.objects.length);
                this.dptBoundaries[j].options.visible = true;
                this.stateBus.memoizedData[this.dptBoundaries[j].options.daneCode] = response.data.objects[i];
              }
            }
          }
          this.stateBus.memoizedData.properties = response.data.properties;
          setTimeout(function (self) {
            return function () {
              self.closeDialog('dialog2');
            }
          }(this), 0);
        });
      },
      outlinePolygon: function (p) {
        if (this.stateBus.outlinedPolygon !== p.options.daneCode) {
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            this.dptBoundaries[i].options.strokeOpacity = .5;
            this.dptBoundaries[i].options.zIndex = 0;
          }
          p.options.zIndex = 999;
          p.options.strokeOpacity = 1;
          p.options.strokeColor = '#333333';
          this.stateBus.outlinedPolygon = p.options.daneCode;
        }
      },
      resetPolygon(p) {
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          this.dptBoundaries[i].options.strokeOpacity = .9;
        }
        p.options.zIndex = 0;
        p.options.strokeColor = p.options.fillColor;
        this.stateBus.outlinedPolygon = null;
      },
      toggleInfoWindow: function ($event, p, idx) {
//        this.infoWindowPos = p.position;
        console.log(p);
        console.log(this.stateBus.memoizedData);
        this.infoWindowPos = {lat: $event.latLng.lat(), lng: $event.latLng.lng()};
        this.infoContent = this.stateBus.memoizedData[p.options.daneCode].sum_registros;
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
      },
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      closeLeftSidenav() {
        this.$refs.leftSidenav.close();
      },
      open(ref) {
        console.log('Opened: ' + ref);
      },
      close(ref) {
        console.log('Closed: ' + ref);
      }
    },
    data() {
      return {
        checkbox: '',
        mapFilters: '',
        datasets,
        stateBus: {
          memoizedData: {},
          outlinedPolygon: null,
          infoContent: ''
        },
        infoContent: '',
        center: {
          lat: 4.624335,
          lng: -74.063644
        },
        dptBoundaries: [],
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

  .md-list-item .md-radio {
    display: block;
  }
  .md-list-item .md-radio-container {
    float:left;
  }
</style>
