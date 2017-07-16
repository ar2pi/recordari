import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Path from '@/components/Path'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'


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
      path: '/cronologia',
      name: 'Timeline',
      component: Timeline
    }
  ]
})
