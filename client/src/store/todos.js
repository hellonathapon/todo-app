// import Vue from "vue";
import AuthService from "./actionCreators/AuthService";
import PublicService from "./actionCreators/PublucService";

const todos = {
  namespaced: true,
  state: {
    todos: [],
  },
  getters: {
    getTodos: (state) => state.todos,
  },
  mutations: {
    RETREIVE_TODOS: function(state, payload) {
      state.todos = payload;
    },
    ADD_TODO: function(state, payload) {
      console.log(payload);
      state.todos = [...state.todos, payload];
    },
  },
  actions: {
    retreiveTodos: function({ commit }) {
      return new Promise((resolve, reject) => {
        PublicService.retrieveTodos()
          .then(({ data }) => {
            console.log(data);
            const { todos } = data;
            commit("RETREIVE_TODOS", todos);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addTodo: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        AuthService.addTodo(payload)
          .then((res) => {
            let {
              data: { insertId },
            } = res; // destructure nested data
            const newTodo = Object.assign({}, { id: insertId }, payload); // create new object contain an id reponse back from server
            commit("ADD_TODO", newTodo); // add todo in local Vuex.
            resolve();
          })
          .catch((err) => {
            reject(err.response.data ? err.response.data.message : err.message);
          });
      });
    },
  },
};

export default todos;
