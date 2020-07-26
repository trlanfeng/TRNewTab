import Vue from 'vue';
import store from './store';
import App from './pages/Newtab/Newtab.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/newtab.less'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');