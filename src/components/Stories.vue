<template>
  <md-theme md-name="recordari" class="full-height">
    <router-link tag="md-button"
                 to="/"
                 class="md-raised md-primary md-fab md-fab-top-right">
      <md-icon>home</md-icon>
    </router-link>
    <div class="full-height doc-content-wrapper">

      <md-layout md-align="center">
        <md-layout md-flex="85"
                   md-flex-small="100">

          <div v-masonry
               transition-duration="0.3s"
               item-selector=".item"
               class="full-width">
            <div v-masonry-tile
                 class="item"
                 v-for="(item, index) in items">
              <div class="clearfix sp-stack sp-hinset">
                <md-card class="card-item">
                  <md-card-media v-if="item.img"
                                 md-ratio="16:9">
                    <md-image :md-src="require('../assets/stories/' + item.img)"
                              :alt="item.title"></md-image>
                  </md-card-media>

                  <md-card-header>
                    <h2 class="md-title">{{ item.title }}</h2>
                    <div v-if="item.location"
                         class="md-subhead">
                      <md-icon>location_on</md-icon>
                      <span>{{ item.location }}</span>
                    </div>
                  </md-card-header>

                  <md-card-content v-if="item.description">
                    <span>{{ item.description }}</span>
                  </md-card-content>

                  <md-card-actions>
                    <router-link tag="md-button"
                                 :to="'/historias/' + item.url"
                                 class="md-primary">Ver más
                      <md-icon>keyboard_arrow_right</md-icon>
                    </router-link>
                  </md-card-actions>
                </md-card>
              </div>
            </div>
          </div>

        </md-layout>
      </md-layout>

    </div>
  </md-theme>
</template>

<script>
  import Vue from 'vue'
  import {VueMasonryPlugin} from 'vue-masonry'
  import items from '../resources/items.json'

  Vue.use(VueMasonryPlugin);

  export default {
    name: 'ap-stories',
    data() {
      return {
        items
      }
    }
  }
</script>

<style scoped>
  .doc-content-wrapper {
    background-color: #f9f9f9;
    padding: 2em 0;
  }

  .item {
    width: 100%;
  }

  @media (min-width: 960px) {
    .item {
      width: 50%;
    }
  }

  @media (min-width: 1280px) {
    .item {
      width: 33.3330%;
    }
  }

  @media (min-width: 1920px) {
    .item {
      width: 25%;
      max-width: 400px;
    }
  }
</style>
