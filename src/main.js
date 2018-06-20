// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
// import axios from 'axios';
import 'babel-polyfill';
import VideoPlayer from 'vue-video-player'
import video from 'videojs-contrib-hls'


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// require('videojs-contrib-hls/dist/videojs-contrib-hls');
// require('videojs-contrib-hls/dist/videojs-contrib-hls');

Vue.use(VideoPlayer);
Vue.use(ElementUI);
Vue.use(video)
// Vue.use(axios);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
