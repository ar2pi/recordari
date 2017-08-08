<template>
  <div class="valign-wrapper full-height">

    <md-layout class="full-height sp-hinset" id="intro-logo">
      <md-layout md-vertical-align="stretch">
        <md-layout>
          <md-image :md-src="require('../assets/recordari-min.svg')"></md-image>
        </md-layout>
      </md-layout>
    </md-layout>

    <!--<md-layout id="intro-logo">-->
      <!--<md-layout md-align="center" md-column md-gutter md-vertical-align="stretch" class="sp-hinset">-->
        <!--<md-layout md-column md-flex="60">-->
          <!--<md-image :md-src="require('../assets/recordari-min.svg')"></md-image>-->
        <!--</md-layout>-->
      <!--</md-layout>-->
    <!--</md-layout>-->
    <md-layout id="intro-fork" v-show="initialized" style="opacity:0;">
      <p id="btn1" class="col s12 m8 offset-m2 caption">
        <router-link to="mapui" class="btn-large waves-effect waves-light">Conciencia
          <i class="ion ion-map" data-pack="default" data-tags="gps, navigation, pin"></i>
        </router-link>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut consectetur dolorem dolorum eos fugit maiores obcaecati odit quas temporibus! Error, expedita illo illum laborum natus velit voluptatem! Illum, praesentium?</span>
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="mapui" class="btn-large waves-effect waves-light">Reparacion
          <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
        </router-link>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis dolore, dolorem earum excepturi hic, incidunt neque rem reprehenderit, rerum totam voluptatibus? Illo in, magnam nobis reprehenderit repudiandae saepe tempore.
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="mapui" class="btn-large waves-effect waves-light">Reconciliacion
          <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
        </router-link>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="cronos" class="btn-large waves-effect waves-light">Cronologia
          <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
        </router-link>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
      </p>

      <md-image :md-src="require('../assets/chico.svg')" class="chico"></md-image>
    </md-layout>
  </div>
</template>

<script>
  import * as VueMaterial from 'vue-material'
  import anime from 'animejs'
  import Vue from 'vue'
  //  import MdLayout from "../../node_modules/vue-material/src/components/mdLayout/mdLayout.vue";
  //  import MdImage from "../../node_modules/vue-material/src/components/mdImage/mdImage.vue"

  Vue.use(VueMaterial);
  export default {
//    components: {MdLayout, MdImage},
    name: 'ap-intro',
//    components: {
//      'md-image': VueMaterial.MdImage
//    },
    mounted() {
      console.log(this.initialized);
      setTimeout(((self) => {
        return () => {
          anime({
            targets: '#intro-logo',
            scale: .4,
            translateX: '-50vw',
            translateY: '-50vh',
            duration: 1200,
            easing: 'linear',
            complete(a) {
//              self.initialized = true;
//              anime({
//                targets: '#intro-fork',
//                opacity: 1,
//                duration: 1200,
//                easing: 'easeInOutSine'
//              });
              console.log(a);
            }
          });
        }
      })(this), 3000);
//      setTimeout(() => {
//        this.initialized = true;
//      }, 1000);
    },
    data() {
      return {
        initialized: false,
        src: 'assets/recordari-min.svg'
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
  }
  .chico {
    max-height: 100px;
  }
</style>
