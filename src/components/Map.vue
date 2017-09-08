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

      <div class="map-card md-fab md-fab-top-right"
           v-show="tooltip.show">
        <md-card>
          <p class="md-body-2 sp-hinset">¿ Sabias que ?</p>
          <span class="md-body-1 sp-hinset">{{ tooltip.content }}</span>
          <md-card-actions>
            <md-button class="md-accent md-dense"
                       @click="dive(tooltip.center, tooltip.location)">{{ !!tooltip.center ? 'Ver en mapa' : 'OK' }}
            </md-button>
          </md-card-actions>
        </md-card>
      </div>

      <md-dialog class="dialog-large"
                 md-open-from="#modal-info"
                 md-close-to="#modal-info"
                 ref="info">
        <md-dialog-title>{{ stateBus.activeDataset.name }}</md-dialog-title>
        <md-dialog-content>
          <div class="text-center">
            <md-spinner v-show="!modalInfo"
                        md-indeterminate></md-spinner>
          </div>
          <div v-show="!!modalInfo"
               v-html="modalInfo"></div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary"
                     @click="closeDialog('info')">Cerrar
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-button class="md-fab md-fab-top-right md-mini md-warn"
                 id="convert-data"
                 @click="toggleConvert(stateBus.activeDataset.convertType)"
                 v-show="!!stateBus.activeDataset.convertType">
        <strong class="font18">{{ conversions.sign }}</strong>
      </md-button>

      <md-button class="md-fab md-fab-bottom-left fab-second-bottom md-warn"
                 id="modal-info"
                 @click="openDialog('info')"
                 v-show="!!stateBus.activeDataset.modal">
        <md-icon>info</md-icon>
      </md-button>

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
            <router-link to="/">
              <md-image :md-src="require('../assets/recordari_white.svg')"
                        width="200"></md-image>
            </router-link>
          </div>
        </md-toolbar>
        <p class="pill">
          <router-link tag="md-button"
                       to="/mapa/conciencia"
                       class="no-margin full-width"
                       :class="$route.params.theme === 'conciencia' ? 'active-element' : 'md-raised md-primary'">
            Conciencia
          </router-link>
        </p>
        <p class="pill">
          <router-link tag="md-button"
                       to="/mapa/reparacion"
                       class="no-margin full-width"
                       :class="$route.params.theme === 'reparacion' ? 'active-element' : 'md-raised md-primary'">
            Reparacion
          </router-link>
        </p>
        <p class="pill">
          <router-link tag="md-button"
                       to="/mapa/reconciliacion"
                       class="no-margin full-width"
                       :class="$route.params.theme === 'reconciliacion' ? 'active-element' : 'md-raised md-primary'">
            Reconciliacion
          </router-link>
        </p>
        <p class="pill">
          <router-link tag="md-button"
                       to="/cronos"
                       class="no-margin full-width"
                       :class="$route.params.theme === 'timeline' ? 'active-element' : 'md-raised md-primary'">Timeline
          </router-link>
        </p>
        <div class="bottom-left-sidenav">
          <p class="md-subheading">Fuentes de datos:</p>
          <div class="brick-unit">
            <md-tooltip md-direction="right">Departamento Administrativo Nacional de Estadística</md-tooltip>
            <img :src="require('../assets/dane_100.png')" class="img-rounded" width="50" alt="DANE" />
          </div>
          <div class="brick-unit">
            <md-tooltip md-direction="right">Registro Único de Víctimas y Agencia para la Reincorporación y la Normalización</md-tooltip>
            <img :src="require('../assets/arn_100.png')" class="img-circle" width="50" alt="RUV y ARN" />
          </div>
          <div class="brick-unit">
            <md-tooltip md-direction="right">Instituto Colombiano de Bienestar Familiar</md-tooltip>
            <img :src="require('../assets/icbf_100.png')" class="img-rounded" width="50" alt="ICBF" />
          </div>
          <div class="brick-unit">
            <md-tooltip md-direction="right">Registro Único de Predios y Territorios Abandonados</md-tooltip>
            <img :src="require('../assets/rupta_100.png')" class="img-rounded" width="50" alt="RUPTA" />
          </div>
          <div class="brick-unit">
            <md-tooltip md-direction="right">Registraduria Nacional del Estado Civil</md-tooltip>
            <img :src="require('../assets/registraduria_100.png')" class="img-rounded" width="50" alt="Registraduria" />
          </div>
        </div>
      </md-sidenav>

      <div class="bottom-title"
           v-show="!!stateBus.activeDataset.name">
        {{ stateBus.activeDataset.name }}
      </div>
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

  const COLORS = [
    {COLOR_STROKE: '#B71C1C', COLOR_FILL: '#F44336'},
    {COLOR_STROKE: '#0174e1', COLOR_FILL: '#27A2ED'}
  ];
  const COLOR_HIGHLIGHT = '#333333';

  const api = axios.create({
    baseURL: '/static/datasets/',
    timeout: 999999
  });

  const pages = axios.create({
    baseURL: '/static/pages/',
    timeout: 999999
  });

  const datasets = {
    conciencia: [
      {
        name: 'Víctimas del conflicto armado',
        archive: 'conciencia/xDepartamentos_victimas-general_RUV1985-2017.json',
        geography: 'department',
        label: 'victimas directas del conflicto armado entre 1985 y 2017',
        tooltip: {
          center: {lat: 6.797495, lng: -75.539246},
          location: 5,
          content: 'Desde 1985 a 2017 8´504.127 personas están registradas como víctimas del conflicto armado, de las cuales 1´636.533 en Antioquia.'
        },
        modal: 'conciencia/victimas-general.html',
        convertType: '%'
      },
      {
        name: 'Desplazamientos y abandonos de tierras',
        archive: 'conciencia/xDepartamentos_desplazamiento-abandono_RUV1985-2017.json',
        geography: 'department',
        label: 'personas fueron desplazadas o forzadas de abandonar sus tierras por causa del conflicto entre 1985 y 2017',
        tooltip: {
          center: {lat: 6.797495, lng: -75.539246},
          location: 5,
          content: 'Desde 1985 a 2017 se presentaron 7´319.303 casos de desplazamiento y abandono forzado de tierras durante el conflicto armado en el país, de los cuales Antioquia presenta la cifra más alta de despojo con 1´377.563 colombianos afectados.'
        },
        modal: 'conciencia/desplazamiento-abandono.html',
        convertType: '%'
      },
      {
        name: 'Niños, niñas y adolescentes víctimas del conflicto',
        archive: 'conciencia/xDepartamentos_nna-victimas_ESRI1985-2014.json',
        geography: 'department',
        label: 'niños, niñas y adolescentes fueron víctimas del conflicto entre 1985 y 2017',
        tooltip: {
          center: {lat: 3.718662, lng: -76.552734},
          location: 76,
          content: 'Más de dos millones de víctimas son niños, niñas y adolescentes, es decir uno de cada tres víctimas pertenecen a esta población, de los cuales 49% son niñas. 46.630 pertenecen a pueblos indígenas. 864 niños y 245 niñas han sido víctimas de minas antipersonal.'
        },
        modal: 'conciencia/nna-victimas.html',
        convertType: '%'
      },
      {
        name: 'Niños y niñas reclutados por grupos armados',
        archive: 'conciencia/xDepartamentos_nna-vinculados_RUV1985-2017.json',
        geography: 'department',
        label: 'niños, niñas y adolescentes fueron vinculados en el conflicto entre 1985 y 2017',
        tooltip: {
          content: 'Desde 1999 cerca de 6.000 NNA se escaparon de los grupos armados o fueron liberados por la fuerza pública. 1 de cada 6 niños reclutados pertenecen a comunidades afrodescendientes e indígenas. La edad promedio de reclutamiento es de 13 años.'
        },
        convertType: '%'
      },
      {
        name: 'Víctimas de minas antipersonal',
        archive: 'conciencia/xDepartamentos_map_RUV1985-2017.json',
        geography: 'department',
        label: 'victimas directas de minas, municiones sin explotar y artefactos explosivos entre 1985 y 2017',
        tooltip: {
          content: 'Según datos de la Unidad de Víctimas los niños y adolescentes de sexo masculino han sido las principales víctimas de minas antipersonal.'
        },
        convertType: '%'
      },
      {
        name: 'Desapariciones forzosas',
        archive: 'conciencia/xDepartamentos_desapariciones_RUV1985-2017.json',
        geography: 'department',
        label: 'desapariciones forzadas por causa del conflicto entre 1985 y 2017',
        tooltip: {
          content: 'El departamento que más presenta casos  de desaparición es Antioquia. Según el Centro de Memoria Histórica  Entre 1970 y 2015 aproximadamente 60.630 personas han sido desaparecidas.  Por día, tres personas han sido víctimas de desaparición.'
        },
        convertType: '%'
      },
      {
        name: 'Secuestros',
        archive: 'conciencia/xDepartamentos_secuestros_RUV1985-2017.json',
        geography: 'department',
        label: 'secuestros por causa del conflicto entre 1985 y 2017',
        tooltip: {
          center: 'En el año 2000 se presentó la cifra más alta de secuestros con 3500 registros de retenciones ilegales, producidas en su mayoría por las Farc y el Eln. La más baja fue en el año 2016 con 205 secuestros a nivel nacional.'
        },
        convertType: '%'
      },
      {
        name: 'Actos terroristas',
        archive: 'conciencia/xDepartamentos_actos-terroristas_RUV1985-2017.json',
        geography: 'department',
        label: 'victimas de actos terroristas, atentados, combates y hostigamientos perpetrados entre 1985 y 2017',
        tooltip: {
          center: 'Según el índice de Terrorismo Mundial, Colombia es el país con más atentados en la Latinoamérica, seguido de Paraguay, México y Chile. A nivel mundial Colombia está en el puesto 17 de los países con más casos de acciones terroristas.'
        },
        convertType: '%'
      },
      {
        name: 'Violencia sexual',
        archive: 'conciencia/xDepartamentos_delitos-sexuales_RUV1985-2017.json',
        geography: 'department',
        label: 'delitos sexuales atribuidos al conflicto fueron cometidos entre 1985 y 2017',
        tooltip: {
          content: 'Según 12 organizaciones defensoras de los derechos humanos,  en el 90% de los casos de violencia sexual en el conflicto armado la impunidad persiste.'
        },
        convertType: '%'
      },
      {
        name: 'Homicidios',
        archive: 'conciencia/xDepartamentos_homicidios_RUV1985-2017.json',
        geography: 'department',
        label: 'homicidios atribuidos al conflicto fueron cometidos entre 1985 y 2017',
        convertType: '%'
      },
      {
        name: 'Actos de tortura',
        archive: 'conciencia/xDepartamentos_tortura_RUV1985-2017.json',
        geography: 'department',
        label: 'victimas de actos de tortura por causa del conflicto entre 1985 y 2017',
        convertType: '%'
      }
    ],
    reparacion: [
      {
        name: 'Victimas con reconocimiento sentencias y auto',
        archive: 'reparacion/xDepartamentos_sentencias_RUV1985-2017.json',
        geography: 'department',
        label: 'personas que han sido reconocidas como victimas del conflicto armado en el cumplimiento de la sentencia 280 de 2013 y la auto 119 de 2013',
        convertType: '%'
      },
      {
        name: 'Niños y niñas desvinculados',
        archive: 'reparacion/xDepartamentos_desvinculados_ICBF2012-2014.json',
        geography: 'department',
        label: 'niños y niñas desvinculados del conflicto entre 2012 y 2014',
        convertType: '%'
      },
      {
        name: 'Niños y niñas que ingresan al Proceso de Restablecimiento de Derechos',
        archive: 'reparacion/xDepartamentos_pard_ICBF2011-2016.json',
        geography: 'department',
        label: 'niños y niñas que ingresan al Proceso Administrativo de Restablecimiento de Derechos (PARD) entre 2011 y 2016',
        convertType: '%'
      }
    ],
    reconciliacion: [
      {
        name: 'Total de desmobilizados',
        archive: 'reconciliacion/xDepartamentos_desmobilizados_ARN2003-2017.json',
        geography: 'department',
        label: 'desmobilizados de los grupos alzados en armas entre 2003 y 2017',
        tooltip: {
          content: 'Según cifras de la Agencia Colombiana para la reintegración, hasta el momento hay 59.391 ex combatientes que se vincularon al proceso de desmovilización y reintegración, de los cuales el 89% son hombres y el 11% mujeres.'
        },
        convertType: '%'
      },
      {
        name: 'Resultados del plebiscito',
        archive: 'reconciliacion/xDepartamentos_plebiscito_Wikipedia2016.json',
        geography: 'department',
        label_1: 'por el si',
        label_2: 'por el no'
      }
    ]
  };

  function handleDepartments(context, layer, response) {
    response.data.objects.sort((a, b) => {
      if (+a.sum_registros < +b.sum_registros) {
        return 1;
      } else if (+a.sum_registros > +b.sum_registros) {
        return -1;
      }
      return 0;
    });
    context.stateBus.memoizedData.objects = {};
    context.stateBus.memoizedData.dataLength = 0;
    context.stateBus.memoizedData.properties = response.data.properties;
    for (let i = 0; i < response.data.objects.length; i++) {
      for (let j = 0; j < context.dptBoundaries.length; j++) {
        if (+response.data.objects[i]['codigo'] === context.dptBoundaries[j].options.daneCode) {
          context.dptBoundaries[j].options.strokeColor = COLORS[0].COLOR_STROKE;
          context.dptBoundaries[j].options.strokeOpacity = .9;
          context.dptBoundaries[j].options.fillColor = COLORS[0].COLOR_FILL;
          context.dptBoundaries[j].options.fillOpacity = 1 - (i / response.data.objects.length);
          context.dptBoundaries[j].options.colorMemo = COLORS[0];
          context.dptBoundaries[j].options.visible = true;
          if(!context.stateBus.memoizedData.objects[context.dptBoundaries[j].options.daneCode]) {
            context.stateBus.memoizedData.objects[context.dptBoundaries[j].options.daneCode] = response.data.objects[i];
            context.stateBus.memoizedData.dataLength++;
          }
        }
      }
    }
  }

  function handleDiffDepartments(context, layer, response) {
    let groups = [[], []];
    response.data.objects.forEach((e) => {
      // for the sake of simplicity we'll believe pct_1 == pct_2 highly unlikely
      if (+e.pct_1 > +e.pct_2) {
        groups[0].push(e);
      } else {
        groups[1].push(e);
      }
    });
    for (let i = 0; i < groups.length; i++) {
      groups[i].sort((a, b) => {
        if (+a[`pct_${i + 1}`] < +b[`pct_${i + 1}`]) {
          return 1;
        } else if (+a[`pct_${i + 1}`] > +b[`pct_${i + 1}`]) {
          return -1;
        }
        return 0;
      });
    }
    context.stateBus.memoizedData.objects = {};
    context.stateBus.memoizedData.dataLength = 0;
    context.stateBus.memoizedData.properties = response.data.properties;
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i].length; j++) {
        for (let k = 0; k < context.dptBoundaries.length; k++) {
          if (+groups[i][j]['codigo'] === context.dptBoundaries[k].options.daneCode) {
            context.dptBoundaries[k].options.strokeColor = COLORS[i].COLOR_STROKE;
            context.dptBoundaries[k].options.strokeOpacity = .9;
            context.dptBoundaries[k].options.fillColor = COLORS[i].COLOR_FILL;
            context.dptBoundaries[k].options.fillOpacity = 1 - (j / groups[i].length);
            context.dptBoundaries[k].options.colorMemo = COLORS[i];
            context.dptBoundaries[k].options.visible = true;
            if(!context.stateBus.memoizedData.objects[context.dptBoundaries[k].options.daneCode]) {
              context.stateBus.memoizedData.objects[context.dptBoundaries[k].options.daneCode] = groups[i][j];
              context.stateBus.memoizedData.dataLength++;
            }
          }
        }
      }
    }
  }

  function registerLayer(context, layer) {
    context.stateBus.activeDataset = context.datasets[layer];
    context.mapFilters = layer;
    context.reinitInfoWindow();
    context.reinitInfoModal();
    if (context.datasets[layer].convertType) {
      context.conversions.sign = context.datasets[layer].convertType;
    }
    if (context.datasets[layer].tooltip) {
      context.tooltip.content = context.datasets[layer].tooltip.content;
      context.tooltip.center = context.datasets[layer].tooltip.center || null;
      context.tooltip.location = context.datasets[layer].tooltip.location || null;
      setTimeout(((self) => {
        return () => {
          self.tooltip.show = true;
        }
      })(context), 600);
    } else {
      context.resetTooltip();
    }
    setTimeout(function (self) {
      return function () {
        self.closeDialog('dialog2');
      }
    }(context), 0);
  }

  function fetchPoblationInfo(context) {
    api.get('xDepartamentos_poblacion-colombia_DANE2017.json', {responseType: 'json'}).then((response) => {
      context.poblationInfo.properties = response.data.properties;
      context.poblationInfo.objects = {};
      for(let i = 0; i < response.data.objects.length; i++) {
        context.poblationInfo[response.data.objects[i].codigo] = response.data.objects[i];
      }
    }).catch((err) => {
      console.error('error loading dataset!', err);
    });
  }

  function fetchModalInfo(context, content) {
    pages.get(content, {responseType: 'text'}).then((response) => {
      context.modalInfo = response.data;
    }).catch((err) => {
      console.error('error loading dataset info!', err);
    });
    ;
  }

  function percentage(value, decimals) {
    value = value || 0;
    decimals = decimals || 0;
    value = value * 100;
    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    value = value + '%';
    return value;
  }

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
        onDownloadProgress: function (progressEvent) {
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
              strokeColor: COLORS[0].COLOR_STROKE,
              strokeOpacity: 0,
              strokeWeight: 3,
              fillColor: COLORS[0].COLOR_FILL,
              fillOpacity: 0,
              visible: false,
              name: data[i].properties.n,
              daneCode: data[i].properties.d,
              stateCode: data[i].properties.s
            }
          });
        }
        this.showLayer(0);
        fetchPoblationInfo(this);
        console.log('=== ended loading regions ===', (new Date()).getTime() - ms);
      }).catch((err) => {
        console.error('error loading dataset!', err);
      });
    },
    events: {},
    methods: {
      showLayer(layer) {
        api.get(this.datasets[layer].archive, {responseType: 'json'}).then((response) => {
          switch (response.data.properties.tipo) {
            case 'departamento':
              handleDepartments(this, layer, response);
              break;
            case 'departamento_diff_pct':
              handleDiffDepartments(this, layer, response);
              break;
          }
          registerLayer(this, layer);
          setTimeout(function (self) {
            return function () {
              if (self.datasets[layer].modal === self.stateBus.activeDataset.modal) {
                fetchModalInfo(self, self.datasets[layer].modal);
              }
            }
          }(this), 300);
        });
      },
      outlinePolygon(p, force) {
        if (!this.infoWindow.opened || force) {
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
      resetPolygonsOrder() {
        let objectsArr = [];
        for(let i in this.stateBus.memoizedData.objects) {
          objectsArr.push(this.stateBus.memoizedData.objects[i]);
        }
        objectsArr.sort((a, b) => {
          if (+a.sum_registros < +b.sum_registros) {
            return 1;
          } else if (+a.sum_registros > +b.sum_registros) {
            return -1;
          }
          return 0;
        });
        for (let i = 0; i < objectsArr.length; i++) {
          for (let j = 0; j < this.dptBoundaries.length; j++) {
            if (+objectsArr[i]['codigo'] === this.dptBoundaries[j].options.daneCode) {
              this.dptBoundaries[j].options.strokeColor = COLORS[0].COLOR_STROKE;
              this.dptBoundaries[j].options.strokeOpacity = .9;
              this.dptBoundaries[j].options.fillColor = COLORS[0].COLOR_FILL;
              this.dptBoundaries[j].options.fillOpacity = 1 - (i / objectsArr.length);
              this.dptBoundaries[j].options.visible = true;
            }
          }
        }
      },
      resetPolygon(p, force) {
        if (!this.infoWindow.opened || force) {
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            this.dptBoundaries[i].options.strokeOpacity = .9;
          }
          p.options.zIndex = 0;
          p.options.strokeColor = p.options.colorMemo.COLOR_STROKE;
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
        this.showLayer(0);
        this.$refs.leftSidenav.close();
      },
      setInfoWindowContent(p) {
        switch (this.stateBus.memoizedData.properties.tipo) {
          case 'departamento':
            if (!!this.stateBus.memoizedData.conversion) {
              this.infoWindow.content = {
                locality: this.stateBus.memoizedData.conversion.objects[p.options.daneCode].departamento,
                number: percentage(this.stateBus.memoizedData.conversion.objects[p.options.daneCode].quantifier, 2),
                label: this.stateBus.memoizedData.conversion.objects[p.options.daneCode].label
              };
            } else {
              this.infoWindow.content = {
                locality: this.stateBus.memoizedData.objects[p.options.daneCode].departamento,
                number: this.$options.filters.currency(this.stateBus.memoizedData.objects[p.options.daneCode].sum_registros, '', 0),
                label: this.stateBus.memoizedData.objects[p.options.daneCode].label || this.stateBus.activeDataset.label
              };
            }
            break;
          case 'departamento_diff_pct':
            let pct, label;
            if(this.stateBus.memoizedData.objects[p.options.daneCode].pct_1 > this.stateBus.memoizedData.objects[p.options.daneCode].pct_2) {
              pct = this.stateBus.memoizedData.objects[p.options.daneCode].pct_1;
              label = 'votos por el no';
            } else {
              pct = this.stateBus.memoizedData.objects[p.options.daneCode].pct_2;
              label = 'votos por el si';
            }
            this.infoWindow.content = {
              locality: this.stateBus.memoizedData.objects[p.options.daneCode].departamento,
              number: percentage(pct, 2),
              label
            };
            break;
        }
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
          this.setInfoWindowContent(p);
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
      reinitInfoModal() {
        this.modalInfo = '';
      },
      dive(center, location) {
        if (!!center && !!location) {
          this.map.center = center;
          //        this.map.zoom = 6;
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            if (this.dptBoundaries[i].options.daneCode === location) {
              this.toggleInfoWindow({latLng: center}, this.dptBoundaries[i], i);
              break;
            }
          }
        }
        this.tooltip.show = false;
      },
      toggleConvert(convertType) {
        if (this.conversions.sign === '%') {
          let convertBuffer = [];
          let totalBuffer = 0;
          for (let i in this.stateBus.memoizedData.objects) {
            convertBuffer.push({
              codigo: this.stateBus.memoizedData.objects[i].codigo,
              departamento: this.stateBus.memoizedData.objects[i].departamento,
              sum_registros: +this.stateBus.memoizedData.objects[i].sum_registros / +this.poblationInfo[+this.stateBus.memoizedData.objects[i].codigo].sum_registros
            });
          }
          convertBuffer.forEach((e) => {
            totalBuffer += e.sum_registros;
          });
          convertBuffer.forEach((e) => {
            e.comp_registros = e.sum_registros / totalBuffer;
          });
          convertBuffer.sort((a, b) => {
            if (+a.sum_registros < +b.sum_registros) {
              return 1;
            } else if (+a.sum_registros > +b.sum_registros) {
              return -1;
            }
            return 0;
          });
          this.stateBus.memoizedData.conversion = {objects:{}};
          for (let i = 0; i < convertBuffer.length; i++) {
            this.stateBus.memoizedData.conversion.objects[convertBuffer[i].codigo] = {
              departamento: convertBuffer[i].departamento,
              quantifier: convertBuffer[i].comp_registros,
              label: 'indice relativo a los otros departamentos segun el numero de casos por total de poblacion'
            }
          }
          for (let i = 0; i < convertBuffer.length; i++) {
            for (let j = 0; j < this.dptBoundaries.length; j++) {
              if (+convertBuffer[i]['codigo'] === this.dptBoundaries[j].options.daneCode) {
                this.dptBoundaries[j].options.strokeColor = COLORS[0].COLOR_STROKE;
                this.dptBoundaries[j].options.strokeOpacity = .9;
                this.dptBoundaries[j].options.fillColor = COLORS[0].COLOR_FILL;
                this.dptBoundaries[j].options.fillOpacity = 1 - (i / convertBuffer.length);
                this.dptBoundaries[j].options.visible = true;
              }
            }
          }
        } else if (this.conversions.sign === 'x') {
          this.resetPolygonsOrder();
          delete this.stateBus.memoizedData.conversion;
        }
        if (this.infoWindow.opened) {
          this.outlinePolygon(this.dptBoundaries[this.infoWindow.currentId], true);
          this.setInfoWindowContent(this.dptBoundaries[this.infoWindow.currentId]);
        }
        this.conversions.active = !this.conversions.active;
        this.conversions.sign = this.conversions.sign === 'x' ? convertType : 'x';
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

  .bottom-left-sidenav {
    position: absolute;
    bottom: 1em;
    left: 1em;
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
