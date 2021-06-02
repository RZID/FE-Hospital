import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Importing bootstrap-vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Using css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Using vuex
Vue.use(Vuex);

// Using bootstrap-vue plugins & icons
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
