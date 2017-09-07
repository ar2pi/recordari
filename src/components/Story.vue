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

export default {
  name: 'ap-stories',
  mounted() {
    console.log('mounted', this.$route.params);
    if (this.$route.params.story) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].url === this.$route.params.story) {
          this.story = this.items[i];
          console.log('ok');
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.story) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].url === to.params.story) {
          this.story = this.items[i];
          console.log('ok');
        }
      }
    }
    console.log('to', to);
    console.log('from', from);
    next();
  },
  methods: {
    showStory(index, url) {
      console.log(index, url);
      this.$router.push({ path: `/historia/${url}` })
    }
  },
  data() {
    return {
      story: null,
      items: [
        {
          url: 'cuentanos-tu-historia',
          title: '¡ Cuentanos tu historia !',
          description: 'Contactanos en las redes o por correo y miremos juntos como compartir tu historia!'
        },
        {
          url: 'sobreviviente-victima-de',
          title: 'Sobreviviente victima de ...',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.',
          location: 'Vichada',
          img: 'vichada.jpg'
        },
        {
          url: 'escolares-le-envian-carta-a',
          title: 'Escolares le envian carta a...',
          description: 'Lorem ipsum machin truc',
          location: 'Bogotá, D.C.',
          img: 'entry2.jpg'
        }
      ]
    }
  }
}
</script>

<style>
.doc-content-wrapper {
  background-color: #f9f9f9;
  padding: 36px 0;
}


/*.item-move {
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
  -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
}

.item-container {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  overflow: auto;
}*/
</style>
