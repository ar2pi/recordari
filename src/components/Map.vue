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

    <div class="map-card md-fab md-fab-top-right"
         v-show="tooltip.show">
      <md-card>
        <p class="md-body-2 sp-hinset">¿ Sabias que ?</p>
        <span class="md-body-1 sp-hinset">{{ tooltip.content }}</span>
        <md-card-actions>
          <md-button class="md-accent md-dense"
                     @click="dive(tooltip.center, tooltip.location)">Ver en mapa
          </md-button>
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
        <div class="md-toolbar-container md-align-center">
          <md-image :md-src="require('../assets/recordari_white.svg')"
                    width="200"></md-image>
        </div>
      </md-toolbar>
      <p>
        <router-link tag="md-button"
                     to="/mapa/conciencia"
                     class="md-raised md-primary">Conciencia
        </router-link>
      </p>
      <p>
        <router-link tag="md-button"
                     to="/mapa/reparacion"
                     class="md-raised md-primary">Reparacion
        </router-link>
      </p>
      <p>
        <router-link tag="md-button"
                     to="/mapa/reconciliacion"
                     class="md-raised md-primary">Reconciliacion
        </router-link>
      </p>
      <p>
        <router-link tag="md-button"
                     to="/cronos"
                     class="md-raised md-primary">Timeline
        </router-link>
      </p>
    </md-sidenav>
  </div>
</md-theme>
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

const datasets = {
  conciencia: [
    {
      name: 'Desplazamientos y abandonos de tierras',
      archive: 'conciencia/xDepartamentos_desplazamiento-abandono_RUV1985-2017.json',
      geography: 'department',
      label: 'personas fueron desplazadas o forzadas de abandonar sus tierras por causa del conflicto entre 1985 y 2017',
      tooltip: {
        center: { lat: 6.797495, lng: -75.539246 },
        location: 5,
        content: 'Se contabilizaron a lo menos 1,311,141 desplazamientos y abandonos forzados de tierras durante el conflicto. 377,375 de los cuales en Antioquia'
      }
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
],
  reparacion: [
      {
          name: 'Total de desmobilizados',
          archive: 'reparacion/xDepartamentos_desmobilizados_ARN2003-2017.json',
          geography: 'department',
          label: 'desmobilizados de los grupos alzados en armas entre 2003 y 2017'
      }
],
  reconciliacion: [
      {
          name: 'Resultados del plebiscito',
          archive: 'reconciliacion/xDepartamentos_plebiscito_Wikipedia2016.json',
          geography: 'department',
          label_1: 'por el si',
          label_2: 'por el no'
      }
]
};

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
      this.datasets = datasets[`${to.params.theme}`];
      this.resetMap();
    }
    console.log('to', to);
    console.log('from', from);
    next();
  },
  mounted() {
    console.log('mounted');
    this.datasets = datasets[`${this.$route.params.theme}`];
    api.get('map-fix.squished.min.geojson', {
      responseType: 'json',
      onDownloadProgress: function(progressEvent) {
        // console.log(progressEvent);
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
      this.mapFilters = 0;
      this.showLayer(0);
      console.log('=== ended loading regions ===', (new Date()).getTime() - ms);
    }).catch((err) => {
      console.error('error loading dataset!', err);
    });
  },
  events: {},
  methods: {
    showLayer(layer) {

        console.log(layer, this.datasets, this.datasets[layer]);

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
        if (this.datasets[layer].tooltip) {
          this.tooltip.content = this.datasets[layer].tooltip.content;
          this.tooltip.center = this.datasets[layer].tooltip.center;
          this.tooltip.location = this.datasets[layer].tooltip.location;
          setTimeout(((self) => {
            return () => {
              self.tooltip.show = true;
            }
          })(this), 600);
        } else {
          this.resetTooltip();
        }
        setTimeout(function(self) {
          return function() {
            self.closeDialog('dialog2');
          }
        }(this), 0);
      });
    },
    outlinePolygon(p, force) {
      if ((!this.infoWindow.opened || force)) {
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
      }
    },
    reinitPolygons() {
      for (let i = 0; i < this.dptBoundaries.length; i++) {
        this.dptBoundaries[i].options.visible = false;
        this.dptBoundaries[i].options.strokeOpacity = 0;
        this.dptBoundaries[i].options.fillOpacity = 0;
      }
    },
    resetTooltip() {
      this.tooltip = {
        show: false,
        content: '',
        center: {},
        location: null
      }
    },
    resetMap() {
      this.mapFilters = '';
      this.reinitInfoWindow();
      this.reinitPolygons();
      this.resetTooltip();
      this.$refs.leftSidenav.close();
    },
    toggleInfoWindow($event, p, idx) {
      if (this.infoWindow.currentId === idx) {
        this.infoWindow.opened = !this.infoWindow.opened;
      } else {
        this.infoWindow.opened = true;
        this.infoWindow.currentId = idx;
      }
      if (this.infoWindow.opened) {
        if (this.stateBus.outlinedPolygon !== null && p.options.daneCode !== this.stateBus.outlinedPolygon) {
          let resettedPolygon = false;
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            if (+this.stateBus.outlinedPolygon === this.dptBoundaries[i].options.daneCode) {
              this.resetPolygon(this.dptBoundaries[i], true);
              resettedPolygon = true;
            }
          }
          if (resettedPolygon) {
            this.stateBus.outlinedPolygon = null;
          }
        }
        this.outlinePolygon(p, true);
        this.infoWindow.pos = {
          lat: (typeof $event.latLng.lat === 'function') ? $event.latLng.lat() : $event.latLng.lat,
          lng: (typeof $event.latLng.lng === 'function') ? $event.latLng.lng() : $event.latLng.lng
        };
        this.infoWindow.content = {
          locality: this.stateBus.memoizedData[p.options.daneCode].departamento,
          number: this.stateBus.memoizedData[p.options.daneCode].sum_registros,
          label: this.stateBus.memoizedData[p.options.daneCode].label || this.stateBus.activeDataset.label
        };
      }
    },
    reinitInfoWindow() {
      this.infoWindow.currentId = null;
      this.infoWindow.opened = false;
      if (this.stateBus.outlinedPolygon !== null) {
        let resettedPolygon = false;
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          if (+this.stateBus.outlinedPolygon === this.dptBoundaries[i].options.daneCode) {
            this.resetPolygon(this.dptBoundaries[i], true);
            resettedPolygon = true;
          }
        }
        if (resettedPolygon) {
          this.stateBus.outlinedPolygon = null;
        }
      }
    },
    dive(center, location) {
      this.map.center = center;
      //        this.map.zoom = 6;
      for (let i = 0; i < this.dptBoundaries.length; i++) {
        if (this.dptBoundaries[i].options.daneCode === location) {
          this.toggleInfoWindow({ latLng: center }, this.dptBoundaries[i], 0);
        }
      }
      this.tooltip.show = false;
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
      },
      tooltip: {
        show: false,
        content: '',
        center: {},
        location: null
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
