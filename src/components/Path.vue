<template>
<div>
  <div class="divider"></div>

  <div class="section">
    <div class="row center">

      <h3 class="light header">El conflicto armado en Colombia</h3>
      <p class="col s12 m8 offset-m2 caption">
        El conflicto armado interno en Colombia es una guerra asimétrica que se desarrolla en Colombia desde la década de 1960 hasta la actualidad.24​ Los principales actores involucrados han sido en un comienzo el Estado colombiano y las guerrillas de extrema
        izquierda, sumándose décadas después los grupos paramilitares de extrema derecha, los carteles del narcotráfico y las bandas criminales. Ha pasado por varias etapas de recrudecimiento, en especial desde los años ochenta cuando algunos de los actores
        se comenzaron a financiar con el narcotráfico.25​
      </p>
      <p class="col s12 m8 offset-m2 caption">
        <router-link to="mapa" class="btn-large waves-effect waves-light">Empezar recorido
          <i class="ion ion-chevron-right" data-pack="default" data-tags="arrow, right"></i>
        </router-link>
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Intro',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
