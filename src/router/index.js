import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import SpeedMathching from '@/components/train/speedMatching'
import VisualMemory from '@/components/train/visualMemory'
import TrainIndex from '@/components/train/trainIndex'
import TextSequence from '@/components/train/textSequence'
import DigitalReasoning from '@/components/train/digitalReasoning'
import StroopIndex from '@/components/train/stroop/index'
import Caption from '@/components/train/stroop/caption'
import ColorStroop from '@/components/train/stroop/colorStroop'

import SatelliteIndex from '@/components/train/satellite/index'
import CatelliteCaption from '@/components/train/satellite/caption'
import SatelliteExploration from '@/components/train/satellite/satelliteExploration'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path:'/',
      name:'Index',
      component:Index,
      meta:{
        title:'首页'
      }
    }, */
    {
      path: '/',
      name: 'TrainIndex',
      component: TrainIndex,
      meta: {
        title: '认知训练列表'
      }
    },
    {
      path: '/train/speedMatching',
      name: 'SpeedMathching',
      component: SpeedMathching,
      meta: {
        title: '01、速度速配'
      }
    },
    {
      path: '/train/visualMemory',
      name: 'VisualMemory',
      component: VisualMemory,
      meta: {
        title: '02、双重视觉记忆'
      }
    },
    {
      path: '/train/textSequence',
      name: 'TextSequence',
      component: TextSequence,
      meta: {
        title: '03、文字序列'
      }
    },
    {
      path: '/train/digitalReasoning',
      name: 'DigitalReasoning',
      component: DigitalReasoning,
      meta: {
        title: '04、数字推理'
      }
    },
    {
      path: '/train/stroop',
      name: 'StroopIndex',
      component: StroopIndex,
      meta: {
        title: '18、颜色Stroop'
      },
    },
   {
      path: '/train/stroop/caption',
      name: 'Caption',
      component: Caption,
      meta: {
        title: '颜色Stroop-说明'
      }
    },
    {
      path: '/train/stroop/colorStroop',
      name: 'ColorStroop',
      component: ColorStroop,
      meta: {
        title: '颜色Stroop'
      }
    },
    {
       path: '/train/satellite',
       name: 'SatelliteIndex',
       component: SatelliteIndex,
       meta: {
         title: '25、卫星探索'
       },
     },
    {
       path: '/train/satellite/caption',
       name: 'CatelliteCaption',
       component: CatelliteCaption,
       meta: {
         title: '卫星探索-说明'
       }
     },
     {
       path: '/train/satellite/satelliteExploration',
       name: 'SatelliteExploration',
       component:SatelliteExploration,
       meta: {
         title: '卫星探索'
       }
     },
  ]
})
