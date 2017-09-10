<template>
  <md-theme md-name="recordari" class="full-height">
    <router-link tag="md-button"
                 to="/"
                 class="md-raised md-primary md-fab md-fab-top-right">
      <md-icon>home</md-icon>
    </router-link>
    <div class="full-height doc-content-wrapper">

      <md-layout md-align="center">
        <md-layout md-flex="60"
                   md-flex-small="100">

          <div v-if="story"
               class="story-content full-width">
            <h1 class="md-display-1 text-center">{{ story.title }}</h1>
            <div v-if="!!story.img"
                 class="md-16-9 sp-stack--big">
              <md-image :md-src="require('../assets/stories/' + story.img)"
                        :alt="story.title"
                        class="center-block"></md-image>
            </div>
            <md-spinner v-show="!storyContent"
                        md-indeterminate
                        class="center-block"></md-spinner>
            <div v-show="!!storyContent"
                 v-html="storyContent"></div>

            <social-sharing :url="location.href"
                            :title="story.title"
                            :description="story.description"
                            :quote="story.description"
                            hashtags="testhashtag"
                            twitter-user="recordariapp"
                            inline-template>
              <div class="social-shares">
                <network network="twitter">
                  <md-button class="md-fab md-mini md-clean">
                    <md-icon :md-src="require('../assets/twitter.svg')"></md-icon>
                  </md-button>
                </network>
                <network network="facebook">
                  <md-button class="md-fab md-mini md-clean">
                    <md-icon :md-src="require('../assets/facebook.svg')"></md-icon>
                  </md-button>
                </network>
                <network network="email">
                  <md-button class="md-fab md-mini md-clean">
                    <md-icon>email</md-icon>
                  </md-button>
                </network>
              </div>
            </social-sharing>

          </div>

          <div v-else="!story">
            Woups, no encontramos nada por aqui ¯\_(ツ)_/¯
          </div>

        </md-layout>
      </md-layout>

    </div>
  </md-theme>
</template>

<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import SocialSharing from 'vue-social-sharing'
  import axios from 'axios'
  import items from '../resources/items.json'

  Vue.use(SocialSharing);

  const stories = axios.create({
    baseURL: '/static/pages/stories/',
    timeout: 999999
  });

  export default {
    name: 'ap-stories',
    created() {
      if (this.$route.params.story) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].url === this.$route.params.story) {
            this.story = this.items[i];
          }
        }
      }
    },
    mounted() {
      this.loadContent(this.story.id);
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
    methods: {
      loadContent(id) {
        stories.get(`entry${id}.html`, {responseType: 'text'}).then((response) => {
          this.storyContent = response.data;
        }).catch((err) => {
          console.error('error loading story content!', err);
        });
      }
    },
    data() {
      return {
        location: window.location,
        story: null,
        storyContent: null,
        items
      }
    }
  }
</script>

<style scoped>
  .doc-content-wrapper {
    background-color: #f9f9f9;
    padding: 36px;
  }
  @media (max-width: 960px) {
    .doc-content-wrapper {
      padding-right: 36px;
      padding-left: 36px;
    }
  }

  .story-content .md-16-9 {
    overflow: hidden;
    position: relative;
  }

  .story-content .md-16-9:before {
    width: 100%;
    padding-top: 33.33%;
    display: block;
    content: " ";
  }

  .story-content .md-16-9 img {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 90%;
    transform: translateY(-50%);
  }

  .social-shares {
    position: fixed;
    bottom: 1em;
    right: 1em;
  }

  @media (min-width: 960px) {
    .social-shares {
      bottom: unset;
      top: 1em;
      right: 2em;
    }
  }
</style>
