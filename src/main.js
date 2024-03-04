import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
}).$mount('#app')
