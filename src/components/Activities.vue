<template>
  <div class="valign-wrapper full-height">

    <md-layout class="full-height sp-hinset" id="doc-login" v-show="!initialized">
      <md-layout md-vertical-align="center" md-align="center">
        <form style="width:100%;max-width:600px;" novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Codigo de ingreso</label>
            <md-input v-model="loginCode"></md-input>
          </md-input-container>
          <md-button class="md-primary" @click.prevent="submit">Ingresar</md-button>
        </form>
      </md-layout>
    </md-layout>

    <md-layout id="doc-content" v-show="initialized" style="opacity:0;margin:18px;">
      <span class="md-display-1">Actividad 1</span>
      <p id="btn1" class="col s12 m8 offset-m2 caption">
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut consectetur dolorem dolorum eos fugit maiores obcaecati odit quas temporibus! Error, expedita illo illum laborum natus velit voluptatem! Illum, praesentium?</span>
      </p>
      <md-button class="md-primary"><md-icon class="md-primary">picture_as_pdf</md-icon> Descargar pdf</md-button>
      <p class="col s12 m8 offset-m2 caption">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis dolore, dolorem earum excepturi hic, incidunt neque rem reprehenderit, rerum totam voluptatibus? Illo in, magnam nobis reprehenderit repudiandae saepe tempore.
      </p>
      <p class="col s12 m8 offset-m2 caption">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
      </p>
      <p class="col s12 m8 offset-m2 caption">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
      </p>
      <md-image :md-src="require('../assets/chico.svg')" class="chico"></md-image>
    </md-layout>

  </div>
</template>

<script>
  import * as VueMaterial from 'vue-material'
  import anime from 'animejs'
  import Vue from 'vue'

  export default {
    name: 'ap-activities',
    methods: {
      submit() {
        if (this.loginCode === this.secretCode) {
          let self = this;
          anime({
            targets: '#doc-login',
            opacity: 0,
            duration: 600,
            easing: 'easeOutCubic',
            complete() {
              self.initialized = true;
              anime({
                targets: '#doc-content',
                opacity: 1,
                duration: 600,
                easing: 'easeOutCubic'
              });
            }
          });
        }
      }
    },
    mounted() {
      console.log(this.initialized);
    },
    data() {
      return {
        loginCode: '',
        secretCode: '1234',
        initialized: false
      }
    }
  }
</script>
