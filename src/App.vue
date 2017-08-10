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
    50: '#e0e8ff',
    100: '#b3c5ff',
    200: '#809eff',
    300: '#4d77ff',
    400: '#2659ff',
    500: '#003cff',
    600: '#0036ff',
    700: '#002eff',
    800: '#0027ff',
    900: '#001aff',
    A100: '#ffffff',
    A200: '#f2f3ff',
    A400: '#bfc3ff',
    A700: '#a6abff',
    darkText: [50,100,200,"A100","A200","A400","A700"]
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
  Vue.material.registerPalette('cusred2', {
    50: '#fae0e0',
    100: '#f3b3b3',
    200: '#eb8080',
    300: '#e24d4d',
    400: '#dc2626',
    500: '#d60000',
    600: '#d10000',
    700: '#cc0000',
    800: '#c60000',
    900: '#bc0000',
    A100: '#ffe5e5',
    A200: '#ffb2b2',
    A400: '#ff7f7f',
    A700: '#ff6565',
    darkText: [50, 100, 200, 300, 'A100']
  });
  Vue.material.registerPalette('cusorange', {
    50: '#fbe6e0',
    100: '#f5c0b3',
    200: '#ee9680',
    300: '#e76b4d',
    400: '#e24c26',
    500: '#dd2c00',
    600: '#d92700',
    700: '#d42100',
    800: '#cf1b00',
    900: '#c71000',
    A100: '#ffefef',
    A200: '#ffbebc',
    A400: '#ff8d89',
    A700: '#ff756f',
    darkText: [50, 100, 200, 300, 'A100']
  });

  Vue.material.registerTheme({
    recordari: {
      primary: 'cusblue',
      accent: 'cusred',
      background: 'white'
    }
  });

  export default {
    name: 'ap-app',
    created() {
      this.$on('loaded', function (id) {
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
    background-color: #0191EA;
  }
</style>
