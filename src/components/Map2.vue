<template>
  <div class="full-height">
    <main class="full-height">
      <div id="map-canvas"></div>
    </main>
    {{ TEST }}
  </div>
</template>


<script defer>
  // import Sidebar from './Sidebar.vue';
  // import Bottombar from './Bottombar.vue';

  import Vue from 'vue';

  import desvinculados from '../datasets/desvinculados.json';
  import map from '../datasets/map.json';
  import pard from '../datasets/pard.json';

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

  //  (function (w, d, n, Vue, GM) {
  //
  //    var mapCanvas = d.getElementById('map-canvas');
  //
  //    var latLng = new GM.LatLng(35.6833, 139.6833);
  //    var map = new GM.Map(mapCanvas, {center: latLng, zoom: 10});
  //
  //    var mapReset = function (center, zoom) {
  //      GM.event.trigger(map, 'resize');
  //      map.setCenter(center || map.getCenter());
  //      map.setZoom(zoom || map.getZoom());
  //    };
  //
  //    console.log(map);
  //  })(window, document, navigator, Vue, google.maps);

  //  var el = document.getElementById('map-canvas');
  //  var s = document.createElement("script");
  //  s.type = "text/javascript";
  //  s.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4";
  //  //        s.async = true;
  //  el.appendChild(s);

  var mapInit = function () {
    (function (w, d, n, Vue, GM) {

      var mapCanvas = d.getElementById('map-canvas');

      var latLng = new GM.LatLng(35.6833, 139.6833);
      var map = new GM.Map(mapCanvas, {center: latLng, zoom: 10});

      var mapReset = function (center, zoom) {
        GM.event.trigger(map, 'resize');
        map.setCenter(center || map.getCenter());
        map.setZoom(zoom || map.getZoom());
      };

      console.log(map);
    })(window, document, navigator, Vue, window.google.maps || {});
  };

  export default {
    name: 'Map2',
    components: {},
    ready: function () {
//      var el = document.getElementById('map-canvas');
//      var s = document.createElement("script");
//      s.type = "text/javascript";
//      s.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4";
//        s.async = true;
//      el.appendChild(s);
    },
    mounted: function () {
      var el = document.getElementById('map-canvas');
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4";
//      s.async = true;
      el.appendChild(s);

      var mapInit = function () {
        (function (w, d, n, Vue, GM) {

          var mapCanvas = d.getElementById('map-canvas');

          var latLng = new GM.LatLng(35.6833, 139.6833);
          var map = new GM.Map(mapCanvas, {center: latLng, zoom: 10});

          var mapReset = function (center, zoom) {
            GM.event.trigger(map, 'resize');
            map.setCenter(center || map.getCenter());
            map.setZoom(zoom || map.getZoom());
          };

          console.log(map);
        })(window, document, navigator, Vue, window.google.maps || {});
      };

//      (function (w, d, n, Vue, GM) {
//
//        var mapCanvas = d.getElementById('map-canvas');
//
//        var latLng = new GM.LatLng(35.6833, 139.6833);
//        var map = new GM.Map(mapCanvas, {center: latLng, zoom: 10});
//
//        var mapReset = function (center, zoom) {
//          GM.event.trigger(map, 'resize');
//          map.setCenter(center || map.getCenter());
//          map.setZoom(zoom || map.getZoom());
//        };
//
//        console.log(map);
//      })(window, document, navigator, Vue, window.google.maps || {});
    },
    methods: {},
    data() {
      return {
        TEST: '"//maps.googleapis.com/maps/api/js?key=AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4">'
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
</style>
