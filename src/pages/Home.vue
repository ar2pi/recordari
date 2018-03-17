<template>
  <div class="app-home">

    <splash />

    <router-view />

    <md-dialog class="dialog-large"
               md-open-from="#logo-top-left"
               md-close-to="#logo-top-left"
               @close="closeIntro()"
               ref="intro">
      <md-dialog-title>
        <div class="text-center">Recordari</div>
      </md-dialog-title>
      <md-dialog-content>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, unde ratione, praesentium vitae magni eveniet pariatur, accusamus libero accusantium odit placeat omnis molestiae doloribus totam odio ipsam ullam quae nostrum?</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog('intro')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>

    <div id="logo-top-left" class="md-fab md-fab-top-left"
         v-show="$store.state.loaded"
         @click="openDialog('intro')">
      <md-image :md-src="require('../assets/recordari_white.svg')"
                width="135" />
    </div>

    <right-sidebar />

  </div>
</template>

<script>
import Vue from "vue";

// import Map from "../components/Map";
import Splash from "../components/Splash";
import RightSidebar from "../components/RightSidebar";

// Vue.component("map-frame", Map);
Vue.component("splash", Splash);
Vue.component("right-sidebar", RightSidebar);

export default {
  name: "rec-page-home",
  created() {
    if (this.$cookie.get("loadedOnce")) {
      this.$store.commit("load");
      if (this.$route.name === "home") {
        this.$router.push({ name: "map", params: { theme: "conciencia" } });
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("to", to);
    console.log("from", from);
    next();
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
        this.openDialog("intro");
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    closeIntro() {
      this.$store.commit("load");
      this.$cookie.set("loadedOnce", true, { expires: "7D" });
      if (this.$route.name === "home") {
        this.$router.push({ name: "map", params: { theme: "conciencia" } });
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
