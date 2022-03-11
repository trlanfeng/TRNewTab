import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './pages/Newtab/Newtab.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/newtab.less';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
