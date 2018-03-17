<template>
    <div class="rec-right-wrapper"
         :class="{ 'slide-right': slideRight, 'slide-left': slideLeft }">
        <md-button class="rec-right-menu md-raised md-primary"
                   @click="toggleBar">
            <md-icon>menu</md-icon>
        </md-button>
        <md-whiteframe md-elevation="3" 
                       md-tag="nav" 
                       class="rec-right-sidebar text-center">
            <!-- <div class="sep">
                <div class="rec-right-sidebar__icon"
                     @click="toggleBar">
                    <md-icon class="md-size-2x">keyboard_arrow_right</md-icon>
                    <md-ink-ripple />
                </div>
            </div> -->
            <div class="sep">
                <!-- <router-link
                       to="/mapa/conciencia"
                       class="rec-right-sidebar__icon"
                       :class="$route.params.theme === 'conciencia' ? 'active-element' : ''">
                    <md-icon :md-src="require('../../static/img/icons/symbol-conciencia.svg')"></md-icon>
                    <md-tooltip md-direction="left">Conciencia</md-tooltip>
                    <md-ink-ripple />
                </router-link> -->
                <md-button class="rec-right-sidebar__icon"
                           @click="changeMap('conciencia')">
                    <md-icon :md-src="require('../../static/img/icons/symbol-conciencia.svg')"></md-icon>
                    <md-tooltip md-direction="left">Conciencia</md-tooltip>
                    <md-ink-ripple />
                </md-button>
                <!-- <router-link tag="md-button"
                       to="/mapa/reparacion"
                       class="rec-right-sidebar__icon"
                       :class="$route.params.theme === 'reparacion' ? 'active-element' : ''">
                    <md-icon :md-src="require('../../static/img/icons/symbol-reparacion.svg')"></md-icon>
                    <md-tooltip md-direction="left">Reparación</md-tooltip>
                    <md-ink-ripple />
                </router-link> -->
                <md-button class="rec-right-sidebar__icon"
                           @click="changeMap('reparacion')">
                    <md-icon :md-src="require('../../static/img/icons/symbol-reparacion.svg')"></md-icon>
                    <md-tooltip md-direction="left">Reparación</md-tooltip>
                    <md-ink-ripple />
                </md-button>
                <!-- <router-link tag="md-button"
                       to="/mapa/reconciliacion"
                       class="rec-right-sidebar__icon"
                       :class="$route.params.theme === 'reconciliacion' ? 'active-element' : ''">
                    <md-icon :md-src="require('../../static/img/icons/symbol-reconciliacion.svg')"></md-icon>
                    <md-tooltip md-direction="left">Reparación</md-tooltip>
                    <md-ink-ripple />
                </router-link> -->
                <md-button class="rec-right-sidebar__icon"
                           @click="changeMap('reconciliacion')">
                    <md-icon :md-src="require('../../static/img/icons/symbol-reconciliacion.svg')"></md-icon>
                    <md-tooltip md-direction="left">Reconciliación</md-tooltip>
                    <md-ink-ripple />
                </md-button>
            </div>
            <div class="sep">
                <router-link tag="md-button"
                       to="/linea-de-tiempo"
                       class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../../static/img/icons/symbol-timeline.svg')"></md-icon>
                    <md-tooltip md-direction="left">Linea de tiempo</md-tooltip>
                    <md-ink-ripple />
                </router-link>
                <router-link tag="md-button"
                       to="/historias"
                       class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../../static/img/icons/symbol-historias.svg')"></md-icon>
                    <md-tooltip md-direction="left">Historias</md-tooltip>
                    <md-ink-ripple />
                </router-link>
            </div>
            <div class="sep">
                <router-link tag="md-button"
                       to="/docente"
                       class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../../static/img/icons/symbol-docente.svg')"></md-icon>
                    <md-tooltip md-direction="left">Parte docentes</md-tooltip>
                    <md-ink-ripple />
                </router-link>
            </div>
            <div class="sep">
                <!-- <md-speed-dial md-direction="left">
                    <md-button class="md-fab"
                            md-fab-trigger>
                        <md-icon md-icon-morph>close</md-icon>
                        <md-icon>share</md-icon>
                    </md-button>
                    <md-button class="md-fab md-mini md-clean"
                            href="https://twitter.com/recordariapp"
                            target="_blank">
                    <md-icon :md-src="require('../assets/twitter.svg')"></md-icon>
                    </md-button>
                    <md-button class="md-fab md-mini md-clean"
                            href="https://www.facebook.com/recordariapp"
                            target="_blank">
                    <md-icon :md-src="require('../assets/facebook.svg')"></md-icon>
                    </md-button>
                    <md-button class="md-fab md-mini md-clean"
                            href="https://www.instagram.com/recordariapp"
                            target="_blank">
                    <md-icon :md-src="require('../assets/instagram.svg')"></md-icon>
                    </md-button>
                    <md-button class="md-fab md-mini md-clean"
                            href="https://www.youtube.com/channel/UCJXT3tpzILWwHGg_8mtIGWg"
                            target="_blank">
                    <md-icon :md-src="require('../assets/youtube.svg')"></md-icon>
                    </md-button>
                </md-speed-dial> -->
                <md-button class="rec-right-sidebar__icon">
                    <md-icon>share</md-icon>
                    <md-tooltip md-direction="left">Redes</md-tooltip>
                    <md-ink-ripple />
                </md-button>
            </div>
        </md-whiteframe>
    </div>
</template>

<script>
export default {
  name: "rec-component-rightSidebar",
  props: {
    show: Boolean
  },
  beforeRouteLeave(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // if (to.params.theme) {
    //   this.datasets = datasets[`${to.params.theme}`];
    //   this.resetMap();
    // }
    console.log("to", to);
    console.log("from", from);
    next();
  },
  data() {
    return {
      slideLeft: false,
      slideRight: false,
      isShown: false
    };
  },
  watch: {
    '$route': (to, from) => {
      // Whatever you need to change route
      console.log(to, from);
    }
  },
  methods: {
    toggleBar() {
      if (this.isShown) {
        this.slideLeft = false;
        this.slideRight = true;
      } else {
        this.slideRight = false;
        this.slideLeft = true;
      }
      setTimeout(() => {
        this.isShown = !this.isShown;
      }, 301);
    },
    changeMap(theme) {
      console.log(theme);
      console.log(this.$route.params);
      console.log(this.$parent);
      this.$router.push(
        { path: `/mapa/${theme}` },
        function() {
          console.log(arguments);
        },
        function() {
          console.log("abort");
          console.log(arguments);
        }
      );
      // this.$route.params.theme = theme;
    }
  }
};
</script>

<style lang="scss" scoped>
$sliderWidth: 4.9em;

.rec-right-wrapper {
  position: fixed;
  right: -$sliderWidth;
  height: 100%;
}
.rec-right-menu {
  position: absolute;
  left: -48px;
  min-width: 48px;
  min-height: 48px;
  padding: 0;
  margin: 2vh 0;
  z-index: 10;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.rec-right-sidebar {
  float: right;
  height: 100%;
  overflow-y: auto;
  overflow-x: visible;
  background-color: #fff;
  z-index: 0;
}
.rec-right-sidebar__icon {
  display: block;
  position: relative;
  min-width: initial;
  margin: 2vh 0.5em;
  cursor: pointer;
  overflow: hidden;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom-width: 2px;
  padding: 0.6em;
  & > .md-icon {
    width: 36px;
    min-width: 36px;
    height: 36px;
    min-height: 36px;
    align-content: center;
    justify-content: center;
  }
}
.sep {
  margin-bottom: 6vh;
  &:nth-child(1) {
    margin-top: 6vh;
  }
}
.slide-right {
  animation: slide-right;
  animation-duration: 300ms;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
}
@keyframes slide-right {
  0% {
    right: 0;
  }
  100% {
    right: -$sliderWidth;
  }
}
.slide-left {
  animation: slide-left;
  animation-duration: 300ms;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
}
@keyframes slide-left {
  0% {
    right: -$sliderWidth;
  }
  100% {
    right: 0;
  }
}
</style>
