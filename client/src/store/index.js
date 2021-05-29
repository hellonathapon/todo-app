import Vue from "vue";
import Vuex from "vuex";
import todos from "./todos";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    user,
  },
});
