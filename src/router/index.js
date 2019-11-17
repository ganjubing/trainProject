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

import AdditionIndex from '@/components/train/addition/index'
import AdditionCaption from '@/components/train/addition/caption'
import AdditionStorm from '@/components/train/addition/additionStorm'

import MultiplicationIndex from '@/components/train/multiplication/index'
import MultiplicationCaption from '@/components/train/multiplication/caption'
import MultiplicationStorm from '@/components/train/multiplication/multiplicationStorm'

import SubtractionIndex from '@/components/train/subtraction/index'
import SubtractionCaption from '@/components/train/subtraction/caption'
import SubtractionStorm from '@/components/train/subtraction/subtractionStorm'

import MatchingIndex from '@/components/train/matching/index'
import MatchingCaption from '@/components/train/matching/caption'
import NameMatching from '@/components/train/matching/nameMatching'

import RuleIndex from '@/components/train/classification/index'
import RuleCaption from '@/components/train/classification/caption'
import RuleClassification from '@/components/train/classification/ruleClassifiction'

import routeerPart1 from './routerPart1'

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


    {
      path: '/train/addition',
      name: 'AdditionIndex',
      component: AdditionIndex,
      meta: {
        title: '5、加法风暴',
        isTitle: true,
      },
    },
    {
      path: '/train/addition/caption',
      name: 'AdditionCaption',
      component: AdditionCaption,
      meta: {
        title: '加法风暴-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/addition/additionStorm',
      name: 'AdditionStorm',
      component: AdditionStorm,
      meta: {
        title: '加法风暴',
        isTitle: false,
      }
    },


    {
      path: '/train/multiplication',
      name: 'MultiplicationIndex',
      component: MultiplicationIndex,
      meta: {
        title: '6、乘法风暴',
        isTitle: true,
      },
    },
    {
      path: '/train/multiplication/caption',
      name: 'MultiplicationCaption',
      component: MultiplicationCaption,
      meta: {
        title: '乘法风暴-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/multiplication/multiplicationStorm',
      name: 'MultiplicationStorm',
      component: MultiplicationStorm,
      meta: {
        title: '乘法风暴',
        isTitle: false,
      }
    },

    {
      path: '/train/subtraction',
      name: 'SubtractionIndex',
      component: SubtractionIndex,
      meta: {
        title: '7、减法风暴',
        isTitle: true,
      },
    },
    {
      path: '/train/subtraction/caption',
      name: 'SubtractionCaption',
      component: SubtractionCaption,
      meta: {
        title: '减法风暴-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/subtraction/subtractionStorm',
      name: 'SubtractionStorm',
      component: SubtractionStorm,
      meta: {
        title: '减法风暴',
        isTitle: false,
      }
    },

    {
      path: '/train/matching',
      name: 'MatchingIndex',
      component: MatchingIndex,
      meta: {
        title: '8、姓名配对',
        isTitle: true,
      },
    },
    {
      path: '/train/matching/caption',
      name: 'MatchingCaption',
      component: MatchingCaption,
      meta: {
        title: '姓名配对-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/matching/nameMatching',
      name: 'NameMatching',
      component: NameMatching,
      meta: {
        title: '姓名匹配',
        isTitle: false,
      }
    },

  {
    path: '/train/classification',
    name: 'RuleIndex',
    component: RuleIndex,
    meta: {
      title: '10、规则分类',
      isTitle: true,
    },
  },
  {
    path: '/train/classification/caption',
    name: 'RuleCaption',
    component: RuleCaption,
    meta: {
      title: '规则分类-说明',
      isTitle: false,
    }
  },
  {
    path: '/train/classification/ruleClassifiction',
    name: 'RuleClassification',
    component: RuleClassification,
    meta: {
      title: '规则分类',
      isTitle: false,
    }
  },
  ...routeerPart1
  ]
})
