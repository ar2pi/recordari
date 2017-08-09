<template>
<md-layout class="full-height">
  <md-layout md-vertical-align="stretch"
             style="overflow:hidden;">
    <md-layout id="intro-logo"
               v-show="!initialized"
               md-align="center">
      <md-layout md-flex="60"
                 md-align="center">
        <md-image :md-src="require('../assets/recordari-min.svg')"></md-image>
      </md-layout>
    </md-layout>
    <md-layout id="intro-fork"
               md-column
               v-show="initialized"
               :class="($parent.loadedOnce) ? '' : 'transparent'">
      <!-- <md-layout md-flex="5">
        <md-image :md-src="require('../assets/recordari-min.svg')"
                  height="24"></md-image>
        <router-link tag="md-button"
                     to="mapui"
                     class="md-raised md-primary md-dense">
          <i class="ion ion-map"
             data-pack="default"
             data-tags="gps, navigation, pin"></i> Docente
        </router-link>
    </md-layout> -->
      <md-layout md-column
                 md-align="center"
                 class="text-center">
        <div id="btn1"
             class="fork-element">
          <router-link tag="md-button"
                       to="mapa/conciencia"
                       class="md-raised md-primary">
            <i class="ion ion-map"
               data-pack="default"
               data-tags="gps, navigation, pin"></i> Conciencia
          </router-link>
          <p>La conciencia del conflicto es...</p>
        </div>
        <div id="btn2"
             class="fork-element">
          <router-link tag="md-button"
                       to="mapa/reparacion"
                       class="md-raised md-primary">
            <i class="ion ion-map"
               data-pack="default"
               data-tags="gps, navigation, pin"></i> Reparacion
          </router-link>
          <p>La reparacion es...</p>
        </div>
        <div id="btn3"
             class="fork-element">
          <router-link tag="md-button"
                       to="mapa/reconciliacion"
                       class="md-raised md-primary">
            <i class="ion ion-map"
               data-pack="default"
               data-tags="gps, navigation, pin"></i> Reconciliacion
          </router-link>
          <p>La reconciliacion es...</p>
        </div>
        <div id="btn4"
             class="fork-element">
          <router-link tag="md-button"
                       to="cronos"
                       class="md-raised md-primary">
            <i class="ion ion-map"
               data-pack="default"
               data-tags="gps, navigation, pin"></i> Timeline
          </router-link>
          <p>Los elementos cronologicos del conflicto que te toca conocer</p>
        </div>
      </md-layout>
      <div class="md-fab md-fab-bottom-right">
        <router-link tag="md-button"
                     to="docente"
                     class="md-raised md-primary md-dense">
          <i class="ion ion-map"
             data-pack="default"
             data-tags="gps, navigation, pin"></i> Docente
        </router-link>
      </div>
    </md-layout>
  </md-layout>
</md-layout>
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
  data() {
    return {
      initialized: false,
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
