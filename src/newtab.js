import Vue from 'vue';
import store from './libs/store';
import App from './views/Newtab.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/newtab.less'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');