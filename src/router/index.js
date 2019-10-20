import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import SpeedMathching from '@/components/train/speedMatching'
import VisualMemory from '@/components/train/visualMemory'
import TrainIndex from '@/components/train/trainIndex'
import TextSequence from '@/components/train/textSequence'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component:Index,
      meta:{
        title:'aa'
      }
    },
    {
      path:'/train',
      name:'TrainIndex',
      component:TrainIndex,
      meta:{
        title:'认知训练列表'
      }
    },
    {
        path:'/train/speedMatching',
        name:'SpeedMathching',
        component:SpeedMathching,
        meta:{
          title:'01、速度速配'
        }
      },
    {
      path:'/train/visualMemory',
      name:'VisualMemory',
      component:VisualMemory,
      meta:{
        title:'02、双重视觉记忆'
      }
    },
    {
      path:'/train/textSequence',
      name:'TextSequence',
      component:TextSequence,
      meta:{
        title:'03、文字序列'
      }
    },
  ]
})
