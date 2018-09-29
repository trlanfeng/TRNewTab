import Vue from 'vue';
import App from './views/Newtab.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/newtab.less'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');