<template>
<md-theme md-name="recordari">
  <div class="full-height doc-content-wrapper">

    <md-layout md-align="center">
      <md-layout md-flex="85"
                 md-flex-small="100">

        <div v-if="story">
          {{ story.title }}
        </div>

      </md-layout>
    </md-layout>

  </div>
</md-theme>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import items from '../resources/items.json'

export default {
  name: 'ap-stories',
  mounted() {
    if (this.$route.params.story) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].url === this.$route.params.story) {
          this.story = this.items[i];
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.story) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].url === to.params.story) {
          this.story = this.items[i];
        }
      }
    }
    console.log('to', to);
    console.log('from', from);
    next();
  },
  methods: {},
  data() {
    return {
      story: null,
      items
    }
  }
}
</script>

<style>
.doc-content-wrapper {
  background-color: #f9f9f9;
  padding: 36px 0;
}
</style>
