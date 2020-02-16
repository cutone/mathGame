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
import oneAndMany from '@/components/oneAndMany/oneAndMany'
import compareNumber from '@/components/compareNumber/compareNumber'
import beforeAndAfter from '@/components/beforeAndAfter/beforeAndAfter'

//中班
import sequenceFive from '@/components/sequenceFive/sequenceFive'
import sequenceTen from '@/components/sequenceTen/sequenceTen'
import regular from '@/components/regular/regular'
import ringCounting from '@/components/ringCounting/ringCounting'
import splitFive from '@/components/splitFive/splitFive'
import rectangle from '@/components/rectangle/rectangle'
import oval from '@/components/oval/oval'
import compareNeighborsFive from '@/components/compareNeighborsFive/compareNeighborsFive'
import sixToTen from '@/components/sixToTen/sixToTen'



//大班
import cylinder from '@/components/cylinder/cylinder'
import oddEvenNumber from '@/components/oddEvenNumber/oddEvenNumber'
import levelClassify from '@/components/levelClassify/levelClassify'
import adjoinNumber from '@/components/adjoinNumber/adjoinNumber'
import twoDimensionClassify from '@/components/twoDimensionClassify/twoDimensionClassify'
import regular4 from '@/components/regular/regular4'
import numberInLife from '@/components/numberInLife/numberInLife'
import numberWithinTen from '@/components/numberWithinTen/numberWithinTen'

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
      component: bottomClassMenu,
      meta: {
        keepAlive: true
      }
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
      component: topClassMenu,
      meta: {
        keepAlive: true
      }
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
    {
      path: '/cylinder',
      name: 'cylinder',
      component: cylinder,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/oddEvenNumber',
      name: 'oddEvenNumber',
      component: oddEvenNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/levelClassify',
      name: 'levelClassify',
      component: levelClassify,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/adjoinNumber',
      name: 'adjoinNumber',
      component: adjoinNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/twoDimensionClassify',
      name: 'twoDimensionClassify',
      component: twoDimensionClassify,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/rectangle',
      name: 'rectangle',
      component: rectangle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/oval',
      name: 'oval',
      component: oval,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/compareNeighborsFive',
      name: 'compareNeighborsFive',
      component: compareNeighborsFive,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/oneAndMany',
      name: 'oneAndMany',
      component: oneAndMany,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/sixToTen',
      name: 'sixToTen',
      component: sixToTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/regular4',
      name: 'regular4',
      component: regular4,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/numberInLife',
      name: 'numberInLife',
      component: numberInLife,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/numberWithinTen',
      name: 'numberWithinTen',
      component: numberWithinTen,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/compareNumber',
      name: 'compareNumber',
      component: compareNumber,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/beforeAndAfter',
      name: 'beforeAndAfter',
      component: beforeAndAfter,
      meta: {
        keepAlive: false
      }
    }
  ]
})
