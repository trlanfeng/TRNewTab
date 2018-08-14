import Vue from 'vue';
import App from './components/newtab/Newtab.vue';
import './assets/css/newtab.less'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');

if (module.hot) {
  module.hot.accept();
}