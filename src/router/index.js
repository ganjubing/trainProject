import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import SpeedMathching from '@/components/train/speedMatching'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld
    },
    {
      path:'/index',
      name:'Index',
      component:Index
    },
    {
      path:'/train/speedMatching',
      name:'SpeedMathching',
      component:SpeedMathching
    },
  ]
})
