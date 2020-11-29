import Vue from 'vue';
import App from './pages/Popup/Popup.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/popup.less';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
