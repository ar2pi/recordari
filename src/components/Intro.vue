<template>
<md-theme md-name="recordari">
  <md-layout class="full-height">
    <md-layout md-vertical-align="stretch">
      <md-layout md-align="center"
                 md-vertical-align="center"
                 v-show="!initialized"
                 style="overflow:hidden;">
        <md-layout md-flex="60"
                   md-align="center">
          <div id="intro-logo">
            <md-image :md-src="require('../assets/recordari_white.svg')"></md-image>
          </div>
        </md-layout>
      </md-layout>
      <md-layout v-show="initialized">
        <div id="intro-fork"
             :class="($parent.loadedOnce) ? '' : 'transparent'"
             style="margin:auto;width:100%;">
          <div class="md-fab md-fab-top-left">
            <md-image :md-src="require('../assets/recordari_white.svg')"
                      width="135"></md-image>
          </div>
          <!-- <md-layout md-flex="5">
            <md-image :md-src="require('../assets/recordari-min.svg')"
                      height="24"></md-image>
            <router-link tag="md-button"
                         to="mapui"
                         class="md-raised md-accent md-dense">
              <i class="ion ion-map"
                 data-pack="default"
                 data-tags="gps, navigation, pin"></i> Docente
            </router-link>
        </md-layout> -->
          <div class="text-center">
            <div class="row pill fork-element">
              <div id="btn1"
                   :class="showElement === 'fe1' ? 'raised' : ''">
                <md-button class="md-raised md-primary fork-button"
                           data-toggle="fe1"
                           @click="toggleForkElement">
                  Conciencia
                </md-button>
                <div ref="fe1"
                     class="row sm-valign-wrapper"
                     style="opacity:0;overflow:hidden;"
                     v-show="showElement === 'fe1'">
                  <div class="col-md-5">
                    <p class="sp-hinset--small">
                      La historia en Colombia se parte en dos, antes y después de la guerra, atrás quedaron más de 50 años de conflicto armado que tanto daño causó a más de 8 millones de colombianos. La reconstrucción de un nuevo país es responsabilidad de todos los que habitamos
                      en él, por eso tomar conciencia significa conocer las consecuencias de estos devastadores tiempos.</p>
                  </div>
                  <div class="">
                    <router-link tag="md-button"
                                 to="mapa/conciencia"
                                 class="md-raised md-accent">
                      Ver mapa
                      <md-icon>keyboard_arrow_right</md-icon>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pill fork-element">
              <div id="btn2"
                   :class="showElement === 'fe2' ? 'raised' : ''">
                <md-button class="md-raised md-primary fork-button"
                           data-toggle="fe2"
                           @click="toggleForkElement">
                  Reparación
                </md-button>
                <div ref="fe2"
                     class="row sm-valign-wrapper"
                     style="opacity:0;overflow:hidden;"
                     v-show="showElement === 'fe2'">
                  <div class="col-md-5">
                    <p class="sp-hinset--small">
                      Según cada caso, las víctimas oficialmente declaradas, pueden acceder a la reparación y a la restitución de sus tierras por medio de la reparación judicial y administrativa.</p>
                  </div>
                  <div class="">
                    <router-link tag="md-button"
                                 to="mapa/reparacion"
                                 class="md-raised md-accent">
                      Ver mapa
                      <md-icon>keyboard_arrow_right</md-icon>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pill fork-element">
              <div id="btn3"
                   :class="showElement === 'fe3' ? 'raised' : ''">
                <md-button class="md-raised md-primary fork-button"
                           data-toggle="fe3"
                           @click="toggleForkElement">
                  Reconciliación
                </md-button>
                <div ref="fe3"
                     class="row sm-valign-wrapper"
                     style="opacity:0;overflow:hidden;"
                     v-show="showElement === 'fe3'">
                  <div class="col-md-5">
                    <p class="sp-hinset--small">
                      La reconciliación es el paso más importante para poder seguir con este proceso de paz que se está llevando a cabo en nuestro país. Si no existe un perdón verdadero entre todos los protagonistas del conflicto, la paz estable y duradera va a ser casi imposible.</p>
                  </div>
                  <div class="">
                    <router-link tag="md-button"
                                 to="mapa/reconciliacion"
                                 class="md-raised md-accent">
                      Ver mapa
                      <md-icon>keyboard_arrow_right</md-icon>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pill fork-element">
              <div id="btn4"
                   :class="showElement === 'fe4' ? 'raised' : ''">
                <md-button class="md-raised md-primary fork-button"
                           data-toggle="fe4"
                           @click="toggleForkElement">
                  Timeline
                </md-button>
                <div ref="fe4"
                     class="row sm-valign-wrapper"
                     style="opacity:0;overflow:hidden;"
                     v-show="showElement === 'fe4'">
                  <div class="col-md-5">
                    <p class="sp-hinset--small">
                      A continuacion puedes aprender mas sobre los eventos claves del conflicto a traves del tiempo</p>
                  </div>
                  <div class="">
                    <router-link tag="md-button"
                                 to="cronos"
                                 class="md-raised md-accent">
                      Ver timeline
                      <md-icon>keyboard_arrow_right</md-icon>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-fab md-fab-bottom-right">
          <router-link tag="md-button"
                       to="docente"
                       class="md-raised md-accent md-dense">
            Docente
          </router-link>
        </div>
        <md-speed-dial md-mode="scale"
                       class="md-fab-bottom-left">
          <md-button class="md-fab"
                     md-fab-trigger>
            <md-icon md-icon-morph>close</md-icon>
            <md-icon>share</md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-clean">
            <md-icon :md-src="require('../assets/twitter.svg')"></md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-clean">
            <md-icon :md-src="require('../assets/facebook.svg')"></md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-clean">
            <md-icon :md-src="require('../assets/instagram.svg')"></md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-clean">
            <md-icon :md-src="require('../assets/youtube.svg')"></md-icon>
          </md-button>
        </md-speed-dial>
      </md-layout>
    </md-layout>
  </md-layout>
</md-theme>
</template>

<script>
import * as VueMaterial from 'vue-material'
import anime from 'animejs'
import Vue from 'vue'

Vue.use(VueMaterial);

export default {
  name: 'ap-intro',
  created() {
    this.initialized = this.$parent.loadedOnce;
  },
  mounted() {
    if (!self.initialized) {
      setTimeout(((self) => {
        return () => {
          anime({
            targets: '#intro-logo',
            scale: { value: 3, duration: 1200, easing: 'linear' },
            opacity: { value: 0, duration: 600, easing: 'easeInQuart' },
            complete(a) {
              self.initialized = true;
              anime({
                targets: '#intro-fork',
                opacity: 1,
                duration: 600,
                easing: 'easeOutCubic',
                complete() {
                  console.log('self.$parent', self.$parent);
                  self.$parent.$emit('loaded', self.initialized);
                }
              });
              console.log(a);
            }
          });
        }
      })(this), 3000);
    }
  },
  methods: {
    toggleForkElement($event) {
      const e = $event.target.dataset.toggle || '';
      if (this.showElement !== e) {
        this.showElement = e;
        ((self) => anime({
          targets: self.$refs[e],
          opacity: { value: 1, duration: 400, easing: 'easeInQuart' },
          complete(a) {
            console.log(self.$refs);
          }
        }))(this);
      } else {
        this.showElement = '';
      }
    }
  },
  data() {
    return {
      initialized: false,
      showElement: ''
    }
  }
}
</script>

<style>
.fork-button {
  min-width: 178px;
  width: 20%;
}

.raised {
  background-color: rgba(255, 255, 255, .4);
  -webkit-box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);
}
</style>
