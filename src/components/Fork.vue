<template>
  <div>

    <p class="col s12 m8 offset-m2 caption">
      <router-link to="mapui" class="btn-large waves-effect waves-light">Conciencia
        <i class="ion ion-map" data-pack="default" data-tags="gps, navigation, pin"></i>
      </router-link>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut consectetur dolorem dolorum eos fugit maiores obcaecati odit quas temporibus! Error, expedita illo illum laborum natus velit voluptatem! Illum, praesentium?
    </p>
    <p class="col s12 m8 offset-m2 caption">
      <router-link to="mapui" class="btn-large waves-effect waves-light">Reparacion
        <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
      </router-link>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis dolore, dolorem earum excepturi hic, incidunt neque rem reprehenderit, rerum totam voluptatibus? Illo in, magnam nobis reprehenderit repudiandae saepe tempore.
    </p>
    <p class="col s12 m8 offset-m2 caption">
      <router-link to="mapui" class="btn-large waves-effect waves-light">Reconciliacion
        <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
      </router-link>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
    </p>
    <p class="col s12 m8 offset-m2 caption">
      <router-link to="cronos" class="btn-large waves-effect waves-light">Cronologia
        <i class="ion ion-calendar" data-pack="default" data-tags="date, time, month, year"></i>
      </router-link>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequuntur dolores enim et facere ipsum nostrum quaerat sit temporibus. Aspernatur cum, deleniti earum ipsa iste necessitatibus officiis perferendis velit.
    </p>

    <md-image :md-src="require('../assets/chico.svg')" class="chico"></md-image>
  </div>
</template>

<script>

  //import * as VueMaterial from 'vue-material';
  //import Vue from 'vue';

  export default {
    name: 'ap-path',
    data() {
      return {
      }
    }
  }
</script>
