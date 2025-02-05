import Vue from 'vue'
import App from './App.vue'
// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
