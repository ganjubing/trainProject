// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Crrect from './assets/audio/Correct.wav'
import Incorrect from './assets/audio/Incorrect.wav'

Vue.config.productionTip = false

Vue.prototype.playAudio = (flag) => {
  let audioSrc=flag?Crrect:Incorrect;
  let buttonAudio = document.getElementById('eventAudio');
  buttonAudio.setAttribute('src',audioSrc)
  buttonAudio.play()
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
