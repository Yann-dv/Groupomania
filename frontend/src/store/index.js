import { createStore } from "vuex";
import { auth } from "./auth.module";
//import { articles } from "./articles.module";

const store = createStore({
  modules: {
    auth,
    //articles,
  },
});

export default store;
