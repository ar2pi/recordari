<template>
  <main id="app">
    <router-view></router-view>
  </main>
</template>

<script>
  import Vue from 'vue'
  import * as VueMaterial from 'vue-material'

  Vue.use(VueMaterial);

  Vue.material.registerPalette('cusblue', {
    50: '#e1eefb',
    100: '#b3d5f6',
    200: '#80baf0',
    300: '#4d9eea',
    400: '#2789e6',
    500: '#0174e1',
    600: '#016cdd',
    700: '#0161d9',
    800: '#0157d5',
    900: '#0044cd',
    A100: '#f5f7ff',
    A200: '#c2d2ff',
    A400: '#8facff',
    A700: '#7599ff',
    darkText: [50, 100, 200, 300, "A100", "A200", "A400", "A700"]
  });
  Vue.material.registerPalette('cusred', {
    50: '#fde4e6',
    100: '#f9bcbf',
    200: '#f68f95',
    300: '#f2626b',
    400: '#ef404b',
    500: '#ec1e2b',
    600: '#ea1a26',
    700: '#e71620',
    800: '#e4121a',
    900: '#df0a10',
    A100: '#ffffff',
    A200: '#ffd5d6',
    A400: '#ffa2a4',
    A700: '#ff898b',
    darkText: [50, 100, 200, 300, 'A100']
  });

  Vue.material.registerTheme({
    recordari: {
      primary: 'cusblue',
      accent: 'cusred',
      warn: 'yellow',
      background: 'white'
    }
  });

  export default {
    name: 'ap-app',
    created() {
      this.$on('loaded', function () {
        console.log('loaded');
        this.loadedOnce = (this.loadedOnce) ? this.loadedOnce : true;
      })
    },
    data() {
      return {
        loadedOnce: false
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
    background-color: #27A2ED;
  }
</style>
