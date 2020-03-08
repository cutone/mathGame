// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/css/doudong.css';
import '../static/css/common.css';

Vue.config.productionTip = false

//引入手势插件
import AlloyFinger from '../static/js/alloy-finger/alloy_finger' // 手势库
import AlloyFingerVue from '../static/js/alloy-finger/alloy_finger.vue'
import AgreeSDK from '../static/js/AgreeSDK.js'

//引入swiper插件
import '../static/js/swiper/swiper.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper)

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

Vue.use(AgreeSDK, {
  debug: true
});

Vue.use(AlloyFingerVue, {
  AlloyFinger
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
