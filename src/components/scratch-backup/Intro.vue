<template>
<div>
  <div class="divider"></div>

  <div class="section">
    <div class="row center">
      <h3 class="light header">¿Por qué es importante que conozcas la historia del conflicto armado en nuestro país?</h3>
      <p class="col s12 m8 offset-m2 caption">
        Estamos atravesando uno de los momentos históricos más importante en nuestro país, ¡por fin! después de medio siglo de guerra nuestro discurso y nuestro accionar ha empezado a cambiar, ya le apuntamos a la paz, una nueva etapa para todos los colombianos. Tú haces parte de la generación que vive el tránsito de la guerra a la paz, por eso tu misión es construir nuevos discursos enfocados en la reconciliación, conciencia y reparación, con el fin de  lograr que la grandiosa etapa sin guerra se mantenga de generación en generación.</p>
<p class="col s12 m8 offset-m2 caption">
¿Cómo crees que puedes empezar aportar a la construcción de paz? :  tal vez nunca tuviste que vivir directamente un hecho violento,  pero muchos niños, niñas y adolescentes de tu edad si han tenido que sufrir los flagelos de la guerra y todos queremos que se construya una nueva sociedad en la que ningún colombiano como tú  tenga que sufrir la pérdida de su hogar o un familiar muy querido.
</p>
<p class="col s12 m8 offset-m2 caption">
Para apropiarte de esta nueva construcción de paz debes empezar por conocer y construir nuestra memoria histórica, aprender las causas y consecuencias del conflicto armado es fundamental. Recuerda, conocer nuestra historia es entender  el presente y evitar al máximo que los momentos de dolor y rencor se vuelvan a repetir.  Recorre esta app y conoce parte de nuestra historia.
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="camino" class="btn-large waves-effect waves-light">Empezar recorido
          <i class="ion ion-chevron-right" data-pack="default" data-tags="arrow, right"></i>
        </router-link>
      </p>
    </div>
  </div>
</div>
</template>

<script>

import * as VueMaterial from 'vue-material';
import Vue from 'vue';

export default {
  name: 'Intro'
}
</script>
