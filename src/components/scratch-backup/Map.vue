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
  // import Sidebar from './Sidebar.vue';
  // import Bottombar from './Bottombar.vue';

  import * as VueGoogleMaps from 'vue2-google-maps';
  import * as VueMaterial from 'vue-material';
  import Vue from 'vue';

  Vue.use(VueMaterial);

  import desvinculados from '../datasets/desvinculados.json';
  import map from '../datasets/map.json';
  import pard from '../datasets/pard.json';

  console.log(desvinculados);

  var markers = [];
  for (let key in desvinculados) {
    markers.push({
      position: {
        lat: parseFloat(desvinculados[key]['Latitud']),
        lng: parseFloat(desvinculados[key]['Longitud'])
      },
      infoText: desvinculados[key]['registros'],
      region: key,
      markerType: 'reconciliacion',
      icon: {
        url: '../assets/Reconciliacion.svg'
      },
      options: {
        icon: 'url(../assets/Reconciliacion.svg)'
      }
    });
  }
  for (let key in map) {
    markers.push({
      position: {
        lat: parseFloat(map[key]['Latitud']),
        lng: parseFloat(map[key]['Longitud'])
      },
      infoText: map[key]['registros'],
      region: key,
      markerType: 'conciencia',
      options: {
        icon: 'url(../assets/Conciencia.svg)'
      }
    });
  }
  for (let key in pard) {
    markers.push({
      position: {
        lat: parseFloat(pard[key]['Latitud']),
        lng: parseFloat(pard[key]['Longitud'])
      },
      infoText: pard[key]['registros'],
      region: key,
      markerType: 'reparacion',
      options: {
        icon: 'url(../assets/Reparacion.svg)'
      }
    });
  }

  var testimonios = [];
  testimonios.push({
    position: {
      lat: 9,
      lng: -74
    },
    infoText: "Mi hermanita menor se agarró a llorar cuando esos hombres golpeaban a mi papá y ella se pegó de su pierna. A él lo mataron con ella agarrada. El impacto de las balas la tumbó al piso y ella quedó inconsciente y ensangrentada. Ella nunca superó eso, no habla, no pudo estudiar y es muy malgeniada y rebelde, testimonio de niña de Montería.",
    region: "Monteria",
    markerType: 'testimonios',
    options: {
      icon: 'url(../assets/Reparacion.svg)'
    }
  });
  testimonios.push({
    position: {
      lat: 7,
      lng: -75
    },
    infoText: "Yo tenía 14 años y viajaba en un bus con mi mamá. En un retén los paramilitares lo pararon y nos bajaron a todos. Mi mamá me trataba de esconder, pero se dieron cuenta y empezaron a decirme que no fuera niñita. Yo tenía mucho miedo, me oriné en los pantalones. Al final nos dejaron ir… Y esto solo lo he contado hoy, casi 15 años después, porque me da vergüenza, testimonio de un adulto de San Carlos.",
    region: "Antioquia",
    markerType: 'testimonios',
    options: {
      icon: 'url(../assets/Reparacion.svg)'
    }
  });
  testimonios.push({
    position: {
      lat: 0.5,
      lng: -76
    },
    infoText: "Yo no supe cómo explicarle a mi hijo sobre la muerte de su padre. Cuando por fin le conté la verdad, me decía que quería vengarse. El susto mío fue tan grande que siempre evitaba que mi hijo saliera, lo privé de su infancia… Yo lo veo siempre triste. Incluso hasta hace muy poco, mi hijo me dijo que a veces sentía deseos de suicidarse. Testimonio de un madre del Putumayo.",
    region: "Orinoquia",
    markerType: 'testimonios',
    options: {
      icon: 'url(../assets/Reparacion.svg)'
    }
  });
  markers = markers.concat(testimonios);
  console.log(testimonios);
  console.log(markers);

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4',
      // v: 'OPTIONAL VERSION NUMBER',
      // libraries: 'places', //// If you need to use place input
    }
  });

  export default {
    name: 'Map',
    components: {},
    mounted: function () {
      this.show('conciencia');
    },
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

        console.log(marker);
        console.log(idx);
        console.log(this.currentMidx == idx);

        this.infoWindowPos = marker.position;
        this.infoContent = marker.region + ': ' + marker.infoText;

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx === idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;

        }
      },
      reinitInfoWindow: function () {
        this.currentMidx = null;
        this.infoWinOpen = false;
      },
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      toggleRightSidenav() {
      },
      closeRightSidenav() {
      },
      open(ref) {
      },
      close(ref) {
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
        icon: require('../assets/Conciencia.svg'),
//        iconPath: path.resolve(__dirname,'../assets/'),
        markers
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
