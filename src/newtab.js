import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/newtab/Newtab.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/newtab.less'

import store from './store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');