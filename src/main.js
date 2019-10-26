// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import router from './router'
import Crrect from './assets/audio/Correct.wav'
import Incorrect from './assets/audio/Incorrect.wav'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

Vue.prototype.playAudio = (flag) => {
  let audioSrc=flag?Crrect:Incorrect;
  let buttonAudio = document.getElementById('eventAudio');
  buttonAudio.setAttribute('src',audioSrc)
  buttonAudio.play()
}
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    //meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
