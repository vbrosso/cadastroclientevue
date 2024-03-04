import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false
Vue.use(VueTheMask)

new Vue({
  render: h => h(App),
}).$mount('#app')
