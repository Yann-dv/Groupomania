import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import setupInterceptors from './services/setupInterceptors';
import vClickOutside from "click-outside-vue3";


setupInterceptors(store);

createApp(App)
  .use(router)
  .use(store)
  .use(vClickOutside)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
  