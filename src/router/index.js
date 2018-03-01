import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
// import Fork from '@/components/Fork'
import Map from '@/components/Map'
// import Mapbasic from '@/components/Mapbasic'
// import Mapmarkers from '@/components/Mapmarkers'
// import Mapclusters from '@/components/Mapclusters'
// import Mapregions from '@/components/Mapregions'
// import Mapui from '@/components/Mapui'
// import Map2 from '@/components/Map2'
import Timeline from '@/components/Timeline'
import Activities from '@/components/Activities'
import Stories from '@/components/Stories'
import Story from '@/components/Story'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    // {
    //   path: '/inicio',
    //   name: 'Fork',
    //   component: Fork
    // },
    // {
    //   path: '/mapbasic',
    //   name: 'Mapbasic',
    //   component: Mapbasic
    // },
    // {
    //   path: '/mapmarkers',
    //   name: 'Mapmarkers',
    //   component: Mapmarkers
    // },
    // {
    //   path: '/mapclusters',
    //   name: 'Mapclusters',
    //   component: Mapclusters
    // },
    // {
    //   path: '/mapregions',
    //   name: 'Mapregions',
    //   component: Mapregions
    // },
    {
      path: '/mapa/:theme',
      name: 'Map',
      component: Map
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
    {
      path: '/docente',
      name: 'Activities',
      component: Activities
    },
    {
      path: '/historias',
      name: 'Historias',
      component: Stories
    },
    {
      path: '/historias/:story',
      name: 'Historia',
      component: Story
    }
  ]
})
