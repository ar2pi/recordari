import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Path from '@/components/Path'
import Map from '@/components/Map'
import Mapbasic from '@/components/Mapbasic'
import Mapmarkers from '@/components/Mapmarkers'
import Mapclusters from '@/components/Mapclusters'
import Mapregions from '@/components/Mapregions'
import Mapui from '@/components/Mapui'
// import Map2 from '@/components/Map2'
import Timeline from '@/components/Timeline'
// import Docu from '@/components/Docu'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/camino',
      name: 'Path',
      component: Path
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/mapbasic',
      name: 'Mapbasic',
      component: Mapbasic
    },
    {
      path: '/mapmarkers',
      name: 'Mapmarkers',
      component: Mapmarkers
    },
    {
      path: '/mapclusters',
      name: 'Mapclusters',
      component: Mapclusters
    },
    {
      path: '/mapregions',
      name: 'Mapregions',
      component: Mapregions
    },
    {
      path: '/mapui',
      name: 'Mapui',
      component: Mapui
    },
    // {
    //   path: '/mapa',
    //   name: 'Map',
    //   component: Map
    // },
    // {
    //   path: '/mapa2',
    //   name: 'Map2',
    //   component: Map2
    // },
    {
      path: '/cronos',
      name: 'Timeline',
      component: Timeline
    },
    // {
    //   path: '/doc',
    //   name: 'Docu',
    //   component: Docu
    // }
  ]
})
