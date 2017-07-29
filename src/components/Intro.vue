<template>
  <div class="valign-wrapper full-height">
    <md-layout>
      <md-layout md-align="center" md-column md-gutter class="sp-hinset">
        <md-layout md-column md-flex="60">
          <md-image :md-src="require('../assets/recordari-min.svg')"></md-image>
        </md-layout>
        <md-layout md-column>
          <router-link to="camino" class="btn-large waves-effect waves-light">Empezar recorido
            <i class="ion ion-chevron-right" data-pack="default" data-tags="arrow, right"></i>
          </router-link>
        </md-layout>
        <md-layout md-column>
          <md-image :md-src="require('../assets/chico.svg')" class="chico"></md-image>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  import * as VueMaterial from 'vue-material'
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
    data() {
      return {
        src: 'assets/recordari-min.svg'
      }
    }
  }
</script>

<style>
  .chico {
    max-height: 100px;
  }
</style>
