import Vue from 'vue'
import Router from 'vue-router'
import MaxFive from '@/components/maxFive/maxFive'
import Home from '@/components/home'
import bottomClassMenu from '@/components/bottomClassMenu'
import middleClassMenu from '@/components/middleClassMenu'
import topClassMenu from '@/components/topClassMenu'
import trapezoid from '@/components/trapezoid/trapezoid'
//小班
import compareSize from '@/components/compareSize/compareSize'
//中班
import sequenceFive from '@/components/sequenceFive/sequenceFive'
import sequenceTen from '@/components/sequenceTen/sequenceTen'
import regular from '@/components/regular/regular'
import ringCounting from '@/components/ringCounting/ringCounting'
import splitFive from '@/components/splitFive/splitFive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bottomClassMenu',
      name: 'bottomClassMenu',
      component: bottomClassMenu
    },
    {
      path: '/middleClassMenu',
      name: 'middleClassMenu',
      component: middleClassMenu,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/topClassMenu',
      name: 'topClassMenu',
      component: topClassMenu
    },
    {
      path: '/maxFive',
      name: 'MaxFive',
      component: MaxFive
    },
    {
      path: '/trapezoid',
      name: 'trapezoid',
      component: trapezoid,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/sequenceFive',
      name: 'sequenceFive',
      component: sequenceFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/regular',
      name: 'regular',
      component: regular,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/sequenceTen',
      name: 'sequenceTen',
      component: sequenceTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/ringCounting',
      name: 'ringCounting',
      component: ringCounting,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/splitFive',
      name: 'splitFive',
      component: splitFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/compareSize',
      name: 'compareSize',
      component: compareSize,
      meta: {
        keepAlive: false
      }
    },
  ]
})
