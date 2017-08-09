<template>
<main id="app">
  <router-view></router-view>
</main>
</template>

<script>
export default {
  name: 'ap-app',
  created() {
    this.$on('loaded', function(id) {
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
