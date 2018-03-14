<template>
  <div>
    <div id="logo-top-left" class="md-fab md-fab-top-left"
         @click="openDialog('info')">
      <md-image :md-src="require('../assets/recordari_white.svg')"
                v-show="$store.state.loaded"
                @click="openDialog('info')"
                width="135"></md-image>
    </div>

    <router-view />

    <md-dialog class="dialog-large"
                md-open-from="#logo-top-left"
                md-close-to="#logo-top-left"
                @close="closedInit()"
                ref="info">
      <md-dialog-title>
        <div class="text-center">Recordari</div>
      </md-dialog-title>
      <md-dialog-content>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, unde ratione, praesentium vitae magni eveniet pariatur, accusamus libero accusantium odit placeat omnis molestiae doloribus totam odio ipsam ullam quae nostrum?</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog('info')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>

    <right-sidebar />
  </div>
</template>

<script>
import Vue from 'vue';

import RightSidebar from '../components/RightSidebar';

Vue.component('right-sidebar', RightSidebar);

export default {
  name: 'rec-page-home',
  created() {
    if (this.$cookie.get('loadedOnce')) {
      this.$store.commit('load');
      if (this.$route.name === 'home') {
        this.$router.push({ name: 'map', params: { theme: 'conciencia' }});
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$route.name === 'home') {
      this.name = to.params.name;
      next();
    }
  },
  mounted() {
    setTimeout(() => {
      this.postMount();
    }, 0);
  },
  events: {},
  methods: {
    postMount() {
      if (!this.$store.state.loaded) {
        this.openDialog('info');
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    closedInit() {
      this.$store.commit('load');
      this.$cookie.set('loadedOnce', true, { expires: '7D' });
      if (this.$route.name === 'home') {
        this.$router.push({ name: 'map', params: { theme: 'conciencia' }});
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style>

</style>
