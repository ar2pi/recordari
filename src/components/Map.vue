<template>
    <div class="rec-map">
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
    </div>
</template>

<script>
import Vue from "vue";
import Vue2Filters from "vue2-filters";
import * as VueGoogleMaps from "vue2-google-maps";
import axios from "axios";
import styles from "../datasets/styles.json";

Vue.use(Vue2Filters);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4"
  }
});

const COLORS = [
  { COLOR_STROKE: "#B71C1C", COLOR_FILL: "#F44336" },
  { COLOR_STROKE: "#0174e1", COLOR_FILL: "#27A2ED" }
];
const COLOR_HIGHLIGHT = "#333333";

const api = axios.create({
  baseURL: "/static/datasets/",
  timeout: 999999
});

const pages = axios.create({
  baseURL: "/static/pages/",
  timeout: 999999
});

const datasets = {
  conciencia: [
    {
      name: "Víctimas del conflicto armado",
      archive: "conciencia/xDepartamentos_victimas-general_RUV1985-2017.json",
      geography: "department",
      label: "victimas directas del conflicto armado entre 1985 y 2017",
      tooltip: {
        center: { lat: 6.797495, lng: -75.539246 },
        location: 5,
        content:
          "Desde 1985 a 2017 8´504.127 personas están registradas como víctimas del conflicto armado, de las cuales 1´636.533 en Antioquia."
      },
      modal: "conciencia/victimas-general.html",
      convertType: "%"
    },
    {
      name: "Desplazamientos y abandonos de tierras",
      archive:
        "conciencia/xDepartamentos_desplazamiento-abandono_RUV1985-2017.json",
      geography: "department",
      label:
        "personas fueron desplazadas o forzadas de abandonar sus tierras por causa del conflicto entre 1985 y 2017",
      tooltip: {
        center: { lat: 6.797495, lng: -75.539246 },
        location: 5,
        content:
          "Desde 1985 a 2017 se presentaron 7´319.303 casos de desplazamiento y abandono forzado de tierras durante el conflicto armado en el país, de los cuales Antioquia presenta la cifra más alta de despojo con 1´377.563 colombianos afectados."
      },
      modal: "conciencia/desplazamiento-abandono.html",
      convertType: "%"
    },
    {
      name: "Niños, niñas y adolescentes víctimas del conflicto",
      archive: "conciencia/xDepartamentos_nna-victimas_ESRI1985-2014.json",
      geography: "department",
      label:
        "niños, niñas y adolescentes fueron víctimas del conflicto entre 1985 y 2017",
      tooltip: {
        center: { lat: 3.718662, lng: -76.552734 },
        location: 76,
        content:
          "Más de dos millones de víctimas son niños, niñas y adolescentes, es decir uno de cada tres víctimas pertenecen a esta población, de los cuales 49% son niñas. 46.630 pertenecen a pueblos indígenas. 864 niños y 245 niñas han sido víctimas de minas antipersonal."
      },
      modal: "conciencia/nna-victimas.html",
      convertType: "%"
    },
    {
      name: "Niños y niñas reclutados por grupos armados",
      archive: "conciencia/xDepartamentos_nna-vinculados_RUV1985-2017.json",
      geography: "department",
      label:
        "niños, niñas y adolescentes fueron vinculados en el conflicto entre 1985 y 2017",
      tooltip: {
        content:
          "Desde 1999 cerca de 6.000 NNA se escaparon de los grupos armados o fueron liberados por la fuerza pública. 1 de cada 6 niños reclutados pertenecen a comunidades afrodescendientes e indígenas. La edad promedio de reclutamiento es de 13 años."
      },
      modal: "conciencia/nna-reclutados.html",
      convertType: "%"
    },
    {
      name: "Víctimas de minas antipersonal",
      archive: "conciencia/xDepartamentos_map_RUV1985-2017.json",
      geography: "department",
      label:
        "victimas directas de minas, municiones sin explotar y artefactos explosivos entre 1985 y 2017",
      tooltip: {
        content:
          "Según datos de la Unidad de Víctimas los niños y adolescentes de sexo masculino han sido las principales víctimas de minas antipersonal."
      },
      convertType: "%"
    },
    {
      name: "Desapariciones forzosas",
      archive: "conciencia/xDepartamentos_desapariciones_RUV1985-2017.json",
      geography: "department",
      label:
        "desapariciones forzadas por causa del conflicto entre 1985 y 2017",
      tooltip: {
        content:
          "El departamento que más presenta casos  de desaparición es Antioquia. Según el Centro de Memoria Histórica  Entre 1970 y 2015 aproximadamente 60.630 personas han sido desaparecidas.  Por día, tres personas han sido víctimas de desaparición."
      },
      convertType: "%"
    },
    {
      name: "Secuestros",
      archive: "conciencia/xDepartamentos_secuestros_RUV1985-2017.json",
      geography: "department",
      label: "secuestros por causa del conflicto entre 1985 y 2017",
      tooltip: {
        center:
          "En el año 2000 se presentó la cifra más alta de secuestros con 3500 registros de retenciones ilegales, producidas en su mayoría por las Farc y el Eln. La más baja fue en el año 2016 con 205 secuestros a nivel nacional."
      },
      convertType: "%"
    },
    {
      name: "Actos terroristas",
      archive: "conciencia/xDepartamentos_actos-terroristas_RUV1985-2017.json",
      geography: "department",
      label:
        "victimas de actos terroristas, atentados, combates y hostigamientos perpetrados entre 1985 y 2017",
      tooltip: {
        center:
          "Según el índice de Terrorismo Mundial, Colombia es el país con más atentados en la Latinoamérica, seguido de Paraguay, México y Chile. A nivel mundial Colombia está en el puesto 17 de los países con más casos de acciones terroristas."
      },
      convertType: "%"
    },
    {
      name: "Violencia sexual",
      archive: "conciencia/xDepartamentos_delitos-sexuales_RUV1985-2017.json",
      geography: "department",
      label:
        "delitos sexuales atribuidos al conflicto fueron cometidos entre 1985 y 2017",
      tooltip: {
        content:
          "Según 12 organizaciones defensoras de los derechos humanos,  en el 90% de los casos de violencia sexual en el conflicto armado la impunidad persiste."
      },
      convertType: "%"
    },
    {
      name: "Homicidios",
      archive: "conciencia/xDepartamentos_homicidios_RUV1985-2017.json",
      geography: "department",
      label:
        "homicidios atribuidos al conflicto fueron cometidos entre 1985 y 2017",
      convertType: "%"
    },
    {
      name: "Actos de tortura",
      archive: "conciencia/xDepartamentos_tortura_RUV1985-2017.json",
      geography: "department",
      label:
        "victimas de actos de tortura por causa del conflicto entre 1985 y 2017",
      convertType: "%"
    }
  ],
  reparacion: [
    {
      name: "Victimas con reconocimiento sentencias y auto",
      archive: "reparacion/xDepartamentos_sentencias_RUV1985-2017.json",
      geography: "department",
      label:
        "personas que han sido reconocidas como victimas del conflicto armado en el cumplimiento de la sentencia 280 de 2013 y la auto 119 de 2013",
      convertType: "%"
    },
    {
      name: "Niños y niñas desvinculados",
      archive: "reparacion/xDepartamentos_desvinculados_ICBF2012-2014.json",
      geography: "department",
      label: "niños y niñas desvinculados del conflicto entre 2012 y 2014",
      convertType: "%"
    },
    {
      name:
        "Niños y niñas que ingresan al Proceso de Restablecimiento de Derechos",
      archive: "reparacion/xDepartamentos_pard_ICBF2011-2016.json",
      geography: "department",
      label:
        "niños y niñas que ingresan al Proceso Administrativo de Restablecimiento de Derechos (PARD) entre 2011 y 2016",
      convertType: "%"
    }
  ],
  reconciliacion: [
    {
      name: "Total de desmobilizados",
      archive: "reconciliacion/xDepartamentos_desmobilizados_ARN2003-2017.json",
      geography: "department",
      label: "desmobilizados de los grupos alzados en armas entre 2003 y 2017",
      tooltip: {
        content:
          "Según cifras de la Agencia Colombiana para la reintegración, hasta el momento hay 59.391 ex combatientes que se vincularon al proceso de desmovilización y reintegración, de los cuales el 89% son hombres y el 11% mujeres."
      },
      convertType: "%"
    },
    {
      name: "Resultados del plebiscito",
      archive: "reconciliacion/xDepartamentos_plebiscito_Wikipedia2016.json",
      geography: "department",
      label_1: "por el si",
      label_2: "por el no"
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
      if (
        +response.data.objects[i]["codigo"] ===
        context.dptBoundaries[j].options.daneCode
      ) {
        context.dptBoundaries[j].options.strokeColor = COLORS[0].COLOR_STROKE;
        context.dptBoundaries[j].options.strokeOpacity = 0.9;
        context.dptBoundaries[j].options.fillColor = COLORS[0].COLOR_FILL;
        context.dptBoundaries[j].options.fillOpacity =
          1 - i / response.data.objects.length;
        context.dptBoundaries[j].options.colorMemo = COLORS[0];
        context.dptBoundaries[j].options.visible = true;
        if (
          !context.stateBus.memoizedData.objects[
            context.dptBoundaries[j].options.daneCode
          ]
        ) {
          context.stateBus.memoizedData.objects[
            context.dptBoundaries[j].options.daneCode
          ] =
            response.data.objects[i];
          context.stateBus.memoizedData.dataLength++;
        }
      }
    }
  }
}

function handleDiffDepartments(context, layer, response) {
  let groups = [[], []];
  response.data.objects.forEach(e => {
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
        if (
          +groups[i][j]["codigo"] === context.dptBoundaries[k].options.daneCode
        ) {
          context.dptBoundaries[k].options.strokeColor = COLORS[i].COLOR_STROKE;
          context.dptBoundaries[k].options.strokeOpacity = 0.9;
          context.dptBoundaries[k].options.fillColor = COLORS[i].COLOR_FILL;
          context.dptBoundaries[k].options.fillOpacity =
            1 - j / groups[i].length;
          context.dptBoundaries[k].options.colorMemo = COLORS[i];
          context.dptBoundaries[k].options.visible = true;
          if (
            !context.stateBus.memoizedData.objects[
              context.dptBoundaries[k].options.daneCode
            ]
          ) {
            context.stateBus.memoizedData.objects[
              context.dptBoundaries[k].options.daneCode
            ] =
              groups[i][j];
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
  if (context.datasets[layer].convertType) {
    context.conversions.sign = context.datasets[layer].convertType;
  }
  if (context.datasets[layer].tooltip) {
    context.tooltip.content = context.datasets[layer].tooltip.content;
    context.tooltip.center = context.datasets[layer].tooltip.center || null;
    context.tooltip.location = context.datasets[layer].tooltip.location || null;
    setTimeout(
      (self => {
        return () => {
          self.tooltip.show = true;
        };
      })(context),
      600
    );
  } else {
    context.resetTooltip();
  }
}

function fetchPoblationInfo(context) {
  api
    .get("xDepartamentos_poblacion-colombia_DANE2017.json", {
      responseType: "json"
    })
    .then(response => {
      context.poblationInfo.properties = response.data.properties;
      context.poblationInfo.objects = {};
      for (let i = 0; i < response.data.objects.length; i++) {
        context.poblationInfo[response.data.objects[i].codigo] =
          response.data.objects[i];
      }
    })
    .catch(err => {
      console.error("error loading dataset!", err);
    });
}

function fetchModalInfo(context, content) {
  pages
    .get(content, { responseType: "text" })
    .then(response => {
      context.modalInfo = response.data;
    })
    .catch(err => {
      console.error("error loading dataset info!", err);
    });
}

function percentage(value, decimals) {
  value = value || 0;
  decimals = decimals || 0;
  value = value * 100;
  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  value = value + "%";
  return value;
}

export default {
  name: "rec-component-map",
  beforeRouteUpdate(to, from, next) {
    if (to.params.theme) {
      if (this.datasets.length > 0) {
        this.resetMap();
      }
      this.datasets = datasets[`${to.params.theme}`];
    }
    console.log("to", to);
    console.log("from", from);
    next();
  },
  mounted() {
    console.log("mounted");
    this.datasets = datasets[`${this.$route.params.theme}`];
    api
      .get("map-fix.squished.min.geojson", {
        responseType: "json",
        onDownloadProgress: function(progressEvent) {
          // console.log(progressEvent);
        }
      })
      .then(response => {
        console.log(response);
        const ms = new Date().getTime();
        console.log("=== started loading regions ===", ms);
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
        console.log("=== ended loading regions ===", new Date().getTime() - ms);
      })
      .catch(err => {
        console.error("error loading dataset!", err);
      });
  },
  data() {
    return {
      mapFilters: "",
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
        center: { lat: 4.624335, lng: -74.063644 },
        options: {
          disableDefaultUI: true,
          zoomControl: true,
          minZoom: 3,
          maxZoom: 15,
          styles,
          gestureHandling: "greedy"
        }
      },
      infoWindow: {
        opened: false,
        currentId: null,
        pos: { lat: 0, lng: 0 },
        content: {}
        // options: {
        //     pixelOffset: {
        //         width: 0,
        //         height: -35
        //     }
        // }
      },
      tooltip: {
        show: false,
        content: "",
        center: {},
        location: null
      },
      conversions: {
        active: false,
        sign: "%",
        convertedData: {}
      },
      modalInfo: null
    };
  },
  methods: {
    showLayer(layer) {
      api
        .get(this.datasets[layer].archive, { responseType: "json" })
        .then(response => {
          switch (response.data.properties.tipo) {
            case "departamento":
              handleDepartments(this, layer, response);
              break;
            case "departamento_diff_pct":
              handleDiffDepartments(this, layer, response);
              break;
          }
          if (typeof this.datasets[layer].modal !== "undefined") {
            registerLayer(this, layer);
            setTimeout(
              (function(self) {
                return function() {
                  if (
                    self.datasets[layer].modal ===
                    self.stateBus.activeDataset.modal
                  ) {
                    fetchModalInfo(self, self.datasets[layer].modal);
                  }
                };
              })(this),
              300
            );
          }
        });
    },
    resetMap() {
      this.mapFilters = "";
      this.reinitInfoWindow();
      this.reinitPolygons();
      this.resetTooltip();
      this.showLayer(0);
    },
    resetTooltip() {
      this.tooltip = {
        show: false,
        content: "",
        center: {},
        location: null
      };
    },
    reinitPolygons() {
      for (let i = 0; i < this.dptBoundaries.length; i++) {
        this.dptBoundaries[i].options.visible = false;
        this.dptBoundaries[i].options.strokeOpacity = 0;
        this.dptBoundaries[i].options.fillOpacity = 0;
      }
    },
    outlinePolygon(p, force) {
      if (!this.infoWindow.opened || force) {
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          this.dptBoundaries[i].options.strokeOpacity = 0.5;
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
          this.dptBoundaries[i].options.strokeOpacity = 0.9;
        }
        p.options.zIndex = 0;
        p.options.strokeColor = p.options.colorMemo.COLOR_STROKE;
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
        if (
          this.stateBus.outlinedPolygon !== null &&
          p.options.daneCode !== this.stateBus.outlinedPolygon
        ) {
          let resettedPolygon = false;
          for (let i = 0; i < this.dptBoundaries.length; i++) {
            if (
              +this.stateBus.outlinedPolygon ===
              this.dptBoundaries[i].options.daneCode
            ) {
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
          lat:
            typeof $event.latLng.lat === "function"
              ? $event.latLng.lat()
              : $event.latLng.lat,
          lng:
            typeof $event.latLng.lng === "function"
              ? $event.latLng.lng()
              : $event.latLng.lng
        };
        this.setInfoWindowContent(p);
      }
    },
    setInfoWindowContent(p) {
      switch (this.stateBus.memoizedData.properties.tipo) {
        case "departamento":
          if (!!this.stateBus.memoizedData.conversion) {
            this.infoWindow.content = {
              locality: this.stateBus.memoizedData.conversion.objects[
                p.options.daneCode
              ].departamento,
              number: percentage(
                this.stateBus.memoizedData.conversion.objects[
                  p.options.daneCode
                ].quantifier,
                2
              ),
              label: this.stateBus.memoizedData.conversion.objects[
                p.options.daneCode
              ].label
            };
          } else {
            this.infoWindow.content = {
              locality: this.stateBus.memoizedData.objects[p.options.daneCode]
                .departamento,
              number: this.$options.filters.currency(
                this.stateBus.memoizedData.objects[p.options.daneCode]
                  .sum_registros,
                "",
                0
              ),
              label:
                this.stateBus.memoizedData.objects[p.options.daneCode].label ||
                this.stateBus.activeDataset.label
            };
          }
          break;
        case "departamento_diff_pct":
          let pct, label;
          if (
            this.stateBus.memoizedData.objects[p.options.daneCode].pct_1 >
            this.stateBus.memoizedData.objects[p.options.daneCode].pct_2
          ) {
            pct = this.stateBus.memoizedData.objects[p.options.daneCode].pct_1;
            label = "votos por el no";
          } else {
            pct = this.stateBus.memoizedData.objects[p.options.daneCode].pct_2;
            label = "votos por el si";
          }
          this.infoWindow.content = {
            locality: this.stateBus.memoizedData.objects[p.options.daneCode]
              .departamento,
            number: percentage(pct, 2),
            label
          };
          break;
      }
    },
    reinitInfoWindow() {
      this.infoWindow.currentId = null;
      this.infoWindow.opened = false;
      if (this.stateBus.outlinedPolygon !== null) {
        let resettedPolygon = false;
        for (let i = 0; i < this.dptBoundaries.length; i++) {
          if (
            +this.stateBus.outlinedPolygon ===
            this.dptBoundaries[i].options.daneCode
          ) {
            this.resetPolygon(this.dptBoundaries[i], true);
            resettedPolygon = true;
          }
        }
        if (resettedPolygon) {
          this.stateBus.outlinedPolygon = null;
        }
      }
    }
  }
};
</script>

<style>

</style>