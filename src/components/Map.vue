<template>
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
        <p><span class="md-subheading">{{ infoWindow.content.number | currency('', 0) }}</span> {{ infoWindow.content.label }}</p>
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

  <md-button class="md-fab md-fab-top-left md-mini md-primary"
             @click="toggleLeftSidenav">
    <md-icon>menu</md-icon>
  </md-button>
  <md-sidenav class="md-left"
              ref="leftSidenav"
              @open="open('Left')"
              @close="close('Left')">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
    <p>
      <router-link tag="md-button"
                   to="/mapa/conciencia"
                   class="md-raised md-primary">Conciencia
        <i class="ion ion-map"
           data-pack="default"
           data-tags="gps, navigation, pin"></i>
      </router-link>
    </p>
    <p>
      <router-link tag="md-button"
                   to="/mapa/reparacion"
                   class="md-raised md-primary">Reparacion
        <i class="ion ion-map"
           data-pack="default"
           data-tags="gps, navigation, pin"></i>
      </router-link>
    </p>
    <p>
      <router-link tag="md-button"
                   to="/mapa/reconciliacion"
                   class="md-raised md-primary">Reconciliacion
        <i class="ion ion-map"
           data-pack="default"
           data-tags="gps, navigation, pin"></i>
      </router-link>
    </p>
    <p>
      <router-link tag="md-button"
                   to="/cronos"
                   class="md-raised md-primary">Timeline
        <i class="ion ion-map"
           data-pack="default"
           data-tags="gps, navigation, pin"></i>
      </router-link>
    </p>
  </md-sidenav>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vue2Filters from 'vue2-filters'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as VueMaterial from 'vue-material'
import styles from '../datasets/styles.json'

const COLOR_STROKE = '#B71C1C';
const COLOR_FILL = '#F44336';
const COLOR_HIGHLIGHT = '#333333';

const api = axios.create({
  baseURL: '/static/datasets/',
  timeout: 999999
});

const datasets = [[
  {
    name: 'Desplazamientos y abandonos de tierras',
    archive: 'conciencia/xDepartamentos_desplazamiento-abandono_RUV1985-2017.json',
    geography: 'department',
    label: 'personas fueron desplazadas o forzadas de abandonar sus tierras por causa del conflicto entre 1985 y 2017'
    },
  {
    name: 'Niños, niñas y adolescentes victimas del conflicto',
    archive: 'conciencia/xDepartamentos_nna-victimas_ESRI1985-2014.json',
    geography: 'department',
    label: 'niños, niñas y adolescentes fueron victimas del conflicto entre 1985 y 2017'
    },
  {
    name: 'Niños y niñas vinculados',
    archive: 'conciencia/xDepartamentos_nna-vinculados_RUV1985-2017.json',
    geography: 'department',
    label: 'niños, niñas y adolescentes fueron vinculados en el conflicto entre 1985 y 2017'
    },
  {
    name: 'Actos terroristas',
    archive: 'conciencia/xDepartamentos_actos-terroristas_RUV1985-2017.json',
    geography: 'department',
    label: 'actos terroristas fueron perpetrados entre 1985 y 2017'
    },
  {
    name: 'Delitos sexuales',
    archive: 'conciencia/xDepartamentos_delitos-sexuales_RUV1985-2017.json',
    geography: 'department',
    label: 'delitos sexuales atribuidos al conflicto fueron cometidos entre 1985 y 2017'
    },
  {
    name: 'Homicidios',
    archive: 'conciencia/xDepartamentos_homicidios_RUV1985-2017.json',
    geography: 'department',
    label: 'homicidios atribuidos al conflicto fueron cometidos entre 1985 y 2017'
    },
  {
    name: 'Secuestros y desapariciones',
    archive: 'conciencia/xDepartamentos_secuestros-desapariciones_RUV1985-2017.json',
    geography: 'department',
    label: 'secuestros y desapariciones atribuidos al conflicto entre 1985 y 2017'
    },
  {
    name: 'Actos de tortura',
    archive: 'conciencia/xDepartamentos_tortura_RUV1985-2017.json',
    geography: 'department',
    label: 'actos de tortura por causa del conflicto fueron cometidos entre 1985 y 2017'
    }
  ], [], []];

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
  }
});

Vue.use(Vue2Filters);

Vue.material.registerTheme('default', {
  primary: 'indigo',
  accent: 'pink',
  warn: 'deep-orange',
});

export default {
  name: 'ap-map',
  created() {
    console.log('created');
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.theme) {
      switch (to.params.theme) {
        case 'conciencia':
          this.datasets = datasets[0];
          break;
        case 'reparacion':
          this.datasets = datasets[1];
          break;
        case 'reconciliacion':
          this.datasets = datasets[2];
          break;
      }
      this.resetMap();
      this.$refs.leftSidenav.close();
    }
    console.log('to', to);
    console.log('from', from);
    next();
  },
  mounted: function() {
    console.log('mounted');
    switch (this.$route.params.theme) {
      case 'conciencia':
        this.datasets = datasets[0];
        break;
      case 'reparacion':
        this.datasets = datasets[1];
        break;
      case 'reconciliacion':
        this.datasets = datasets[2];
        break;
    }
    api.get('map-fix.min.geojson', {
      responseType: 'json',
      onDownloadProgress: function(progressEvent) {
        console.log(progressEvent);
      }
    }).then((response) => {
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
            strokeColor: COLOR_STROKE,
            strokeOpacity: 0,
            strokeWeight: 3,
            fillColor: COLOR_FILL,
            fillOpacity: 0,
            visible: false,
            name: data[i].properties.n,
            daneCode: data[i].properties.d,
            stateCode: data[i].properties.s
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
    showLayer: function(layer) {
      api.get(this.datasets[layer].archive, { responseType: 'json' }).then((response) => {
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
        this.stateBus.activeDataset = this.datasets[layer];
        setTimeout(function(self) {
          return function() {
            self.closeDialog('dialog2');
          }
        }(this), 0);
      });
    },
    outlinePolygon: function(p, force) {
      if ((!this.infoWindow.opened || force) && this.stateBus.outlinedPolygon !== p.options.daneCode) {
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          this.dptBoundaries[i].options.strokeOpacity = .5;
          this.dptBoundaries[i].options.zIndex = 0;
        }
        p.options.zIndex = 999;
        p.options.strokeOpacity = 1;
        p.options.strokeColor = COLOR_HIGHLIGHT;
        this.stateBus.outlinedPolygon = p.options.daneCode;
      }
    },
    resetPolygon(p, force) {
      if (!this.infoWindow.opened || force) {
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          this.dptBoundaries[i].options.strokeOpacity = .9;
        }
        p.options.zIndex = 0;
        p.options.strokeColor = COLOR_STROKE;
        this.stateBus.outlinedPolygon = null;
      }
    },
    reinitPolygons() {
      for (let i = 0; i < this.dptBoundaries.length; i++) {
        this.dptBoundaries[i].options.visible = false;
        this.dptBoundaries[i].options.strokeOpacity = 0;
        this.dptBoundaries[i].options.fillOpacity = 0;
      }
    },
    resetMap() {
      this.mapFilters = '';
      this.reinitInfoWindow();
      this.reinitPolygons();
    },
    toggleInfoWindow: function($event, p, idx) {
      //        this.infoWindow.pos = p.position;
      console.log('p', p);
      console.log('memoizedData', this.stateBus.memoizedData);
      //        this.infoWindow.pos = {lat: $event.latLng.lat(), lng: $event.latLng.lng()};
      //        this.infoWindow.content = {
      //          locality: this.stateBus.memoizedData[p.options.daneCode].departamento,
      //          number: this.stateBus.memoizedData[p.options.daneCode].sum_registros,
      //          label: this.stateBus.memoizedData[p.options.daneCode].label || this.stateBus.activeDataset.label
      //        };
      //        console.log(this.infoWindow.content);
      if (this.infoWindow.currentId === idx) {
        this.infoWindow.opened = !this.infoWindow.opened;
      } else {
        this.infoWindow.opened = true;
        this.infoWindow.currentId = idx;
      }
      if (this.infoWindow.opened) {
        if (this.stateBus.outlinedPolygon !== null && p.options.daneCode !== this.stateBus.outlinedPolygon) {
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            if (+this.stateBus.outlinedPolygon === this.dptBoundaries[i].options.daneCode) {
              this.resetPolygon(this.dptBoundaries[i], true);
            }
          }
        }
        this.outlinePolygon(p, true);
        this.infoWindow.pos = { lat: $event.latLng.lat(), lng: $event.latLng.lng() };
        this.infoWindow.content = {
          locality: this.stateBus.memoizedData[p.options.daneCode].departamento,
          number: this.stateBus.memoizedData[p.options.daneCode].sum_registros,
          label: this.stateBus.memoizedData[p.options.daneCode].label || this.stateBus.activeDataset.label
        };
      }
    },
    reinitInfoWindow: function() {
      this.infoWindow.currentId = null;
      this.infoWindow.opened = false;
      if (this.stateBus.outlinedPolygon !== null) {
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          if (+this.stateBus.outlinedPolygon === this.dptBoundaries[i].options.daneCode) {
            this.resetPolygon(this.dptBoundaries[i], true);
          }
        }
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
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
      mapFilters: '',
      stateBus: {
        memoizedData: {},
        outlinedPolygon: null,
        activeDataset: {}
      },
      datasets: [],
      dptBoundaries: [],
      map: {
        zoom: 6,
        center: { lat: 4.624335, lng: -74.063644 },
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
        pos: { lat: 0, lng: 0 },
        content: {},
        // options: {
        //     pixelOffset: {
        //         width: 0,
        //         height: -35
        //     }
        // }
      }
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

.info-content {
  max-width: 220px;
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
</style>
