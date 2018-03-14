<template>
    <div>
        <gmap-map :center="map.center"
                :zoom="map.zoom"
                :options="map.options"
                style="width: 100%; height: 100%; position: absolute;">
        </gmap-map>
    </div>
</template>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import styles from '../datasets/styles.json';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe1S3oeq7wJ5AeA9wnyiNCyHr1N2vbcm4'
  }
});

export default {
    name: 'rec-component-map',
    data() {
        return {
            map: {
                zoom: 5,
                center: { lat: 4.624335, lng: -74.063644 },
                options: {
                    disableDefaultUI: true,
                    zoomControl: true,
                    minZoom: 3,
                    maxZoom: 15,
                    styles,
                    gestureHandling: 'greedy'
                }
            }
        };
    }
}
</script>

<style>

</style>