import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import SpeedMathching from '@/components/train/speedMatching'
import VisualMemory from '@/components/train/visualMemory'
import TrainIndex from '@/components/train/trainIndex'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component:Index
    },
    {
      path:'/train',
      name:'TrainIndex',
      component:TrainIndex
    },
    {
        path:'/train/speedMatching',
        name:'SpeedMathching',
        component:SpeedMathching
      },
    {
      path:'/train/visualMemory',
      name:'VisualMemory',
      component:VisualMemory
    },
  ]
})
