<template>
    <div class="rec-splash-screen"
         v-show="!$store.state.loaded && !hasSplashed">
        <md-layout md-align="center"
                    md-vertical-align="center"
                    style="overflow:hidden;">
            <md-layout md-flex="60"
                        md-align="center">
                <div id="intro-logo">
                    <md-image :md-src="require('../../static/img/logo/logo-recordari_white.svg')" />
                </div>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
import anime from 'animejs';

export default {
  name: "rec-component-splash",
  props: {
    show: Boolean
  },
  mounted() {
    if (!this.$store.state.loaded && !this.hasSplashed) {
      setTimeout(
        (self => {
          return () => {
            anime({
              targets: "#intro-logo",
              scale: { value: 3, duration: 1200, easing: "linear" },
              opacity: { value: 0, duration: 600, easing: "easeInQuart" },
              complete(a) {
                self.hasSplashed = true;
                // self.$store.commit("load");
                // anime({
                //     targets: '#intro-fork',
                //     opacity: 1,
                //     duration: 600,
                //     easing: 'easeOutCubic',
                //     complete() {
                //         console.log('self.$parent', self.$parent);
                //         self.$parent.$emit('loaded');
                //     }
                // });
                // console.log(a);
              }
            });
          };
        })(this),
        1000
      );
    }
  },
  data() {
    return {
      hasSplashed: false
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.rec-splash-screen {
  display: flex;
  position: fixed;
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  background-color: #27a2ed;
  z-index: 100;
}
</style>

