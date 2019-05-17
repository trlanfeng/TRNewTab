import Vue from 'vue';
import store from './libs/store';
import App from './views/Popup.vue';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
