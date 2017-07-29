import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Path from '@/components/Path'
import Map from '@/components/Map'
// import Map2 from '@/components/Map2'
// import Timeline from '@/components/Timeline'
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
    // {
    //   path: '/cronos',
    //   name: 'Timeline',
    //   component: Timeline
    // },
    // {
    //   path: '/doc',
    //   name: 'Docu',
    //   component: Docu
    // }
  ]
})
