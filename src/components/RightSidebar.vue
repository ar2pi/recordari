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
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Conciencia</md-tooltip>
                    <md-ink-ripple />
                </div>
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Reparación</md-tooltip>
                    <md-ink-ripple />
                </div>
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Reconciliación</md-tooltip>
                    <md-ink-ripple />
                </div>
            </div>
            <div class="sep">
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Linea de tiempo</md-tooltip>
                    <md-ink-ripple />
                </div>
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Historias</md-tooltip>
                    <md-ink-ripple />
                </div>
            </div>
            <div class="sep">
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Parte docentes</md-tooltip>
                    <md-ink-ripple />
                </div>
            </div>
            <div class="sep">
                <div class="rec-right-sidebar__icon">
                    <md-icon :md-src="require('../assets/icons/icon-circle.svg')" class="md-size-2x"></md-icon>
                    <md-tooltip md-direction="left">Redes</md-tooltip>
                    <md-ink-ripple />
                </div>
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
  data() {
    return {
      slideLeft: false,
      slideRight: false,
      isShown: false,
    };
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
    }
  }
};
</script>

<style lang="scss" scoped>
.rec-right-wrapper {
    position: fixed;
    right: -4.4em;
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
    background-color: #fff;
    z-index: 0;
}
.rec-right-sidebar__icon {
    display: block;
    position: relative;
    margin: 2vh .5em;
    cursor: pointer;
    & > .md-ink-ripple {
        border-radius: 50%;
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
        right: -4.4em;
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
        right: -4.4em;
    }
    100% { 
        right: 0;
    }
}
</style>
