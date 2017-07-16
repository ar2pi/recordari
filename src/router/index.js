import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Path from '@/components/Path'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'
import Docu from '@/components/Docu'


Vue.use(Router)

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
      path: '/mapa',
      name: 'Map',
      component: Map
    },
    {
      path: '/cronos',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/doc',
      name: 'Docu',
      component: Docu
    }
  ]
})
