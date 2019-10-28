import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import SpeedIndex from '@/components/train/speed/index'
import SpeedCaption from '@/components/train/speed/caption'
import SpeedMathching from '@/components/train/speed/speedMatching'
import VisualIndex from '@/components/train/visual/index'
import VisualCaption from '@/components/train/visual/caption'
import VisualMemory from '@/components/train/visual/visualMemory'
import TrainIndex from '@/components/train/trainIndex'
import TextIndex from '@/components/train/text/index'
import TextCaption from '@/components/train/text/caption'
import TextSequence from '@/components/train/text/textSequence'

import DigitalIndex from '@/components/train/digital/index'
import DigitalCaption from '@/components/train/digital/caption'

import DigitalReasoning from '@/components/train/digital/digitalReasoning'
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
        title: '认知训练列表',
        isTitle: false,
      }
    },

    {
      path: '/train/speed',
      name: 'SpeedIndex',
      component: SpeedIndex,
      meta: {
        title: '01、速度速配',
        isTitle: true,
      },
    },
    {
      path: '/train/speed/caption',
      name: 'SpeedCaption',
      component: SpeedCaption,
      meta: {
        title: '速度速配-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/speed/speedMatching',
      name: 'SpeedMathching',
      component: SpeedMathching,
      meta: {
        title: '01、速度速配',
        isTitle: false,
      }
    },

    {
      path: '/train/visual',
      name: 'VisualIndex',
      component: VisualIndex,
      meta: {
        title: '02、双重视觉记忆',
        isTitle: true,
      },
    },
    {
      path: '/train/visual/caption',
      name: 'VisualCaption',
      component: VisualCaption,
      meta: {
        title: '双重视觉记忆-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/visual/visualMemory',
      name: 'VisualMemory',
      component: VisualMemory,
      meta: {
        title: '02、双重视觉记忆',
        isTitle: false,
      }
    },

    {
      path: '/train/text',
      name: 'TextIndex',
      component: TextIndex,
      meta: {
        title: '03、文字序列',
        isTitle: true,
      },
    },
    {
      path: '/train/text/caption',
      name: 'TextCaption',
      component: TextCaption,
      meta: {
        title: '文字序列-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/text/textSequence',
      name: 'TextSequence',
      component: TextSequence,
      meta: {
        title: '03、文字序列',
        isTitle: false,
      }
    },

    {
      path: '/train/digital',
      name: 'DigitalIndex',
      component: DigitalIndex,
      meta: {
        title: '04、数字推理',
        isTitle: true,
      },
    },
    {
      path: '/train/digital/caption',
      name: 'DigitalCaption',
      component: DigitalCaption,
      meta: {
        title: '数字推理-说明',
        isTitle: false,
      }
    },

    {
      path: '/train/digital/digitalReasoning',
      name: 'DigitalReasoning',
      component: DigitalReasoning,
      meta: {
        title: '04、数字推理',
        isTitle: false,
      }
    },
    {
      path: '/train/stroop',
      name: 'StroopIndex',
      component: StroopIndex,
      meta: {
        title: '18、颜色Stroop',
        isTitle: true,
      },
    },
    {
      path: '/train/stroop/caption',
      name: 'Caption',
      component: Caption,
      meta: {
        title: '颜色Stroop-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/stroop/colorStroop',
      name: 'ColorStroop',
      component: ColorStroop,
      meta: {
        title: '颜色Stroop',
        isTitle: false,
      }
    },
    {
      path: '/train/satellite',
      name: 'SatelliteIndex',
      component: SatelliteIndex,
      meta: {
        title: '25、卫星探索',
        isTitle: true,
      },
    },
    {
      path: '/train/satellite/caption',
      name: 'CatelliteCaption',
      component: CatelliteCaption,
      meta: {
        title: '卫星探索-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/satellite/satelliteExploration',
      name: 'SatelliteExploration',
      component: SatelliteExploration,
      meta: {
        title: '卫星探索',
        isTitle: false,
      }
    },
  ]
})
