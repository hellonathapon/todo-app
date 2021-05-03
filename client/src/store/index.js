import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: false,
    todos: [],
    snackbar: {
      status: false,
      message: "test",
    },
  },

  mutations: {
    FETCH_TODOS: function(state, payload) {
      state.todos = payload;
    },

    ADD_TODO: function(state, payload) {
      state.todos = [...state.todos, payload];
    },

    MARK_AS_DONE: function(state, payload) {
      state.todos.map((k) =>
        k.id === payload.id ? (k.isDone = !k.isDone) : k
      );
    },

    DELETE_TODO: function(state, payload) {
      state.todos = state.todos.filter((k) => k.id !== payload.id);
    },

    SET_SNACKBAR: function(state, payload) {
      state.snackbar = {
        status: true,
        message: payload,
      };
    },
  },

  actions: {
    fetchTodos: function(context) {
      //auto triggering when app component is mounted.
      axios
        .get(`${process.env.VUE_APP_SERVER_ENDPOINT}/todo`)
        .then((data) => {
          context.commit("FETCH_TODOS", data.data);
        })
        .catch((err) => {
          context.commit("SET_SNACKBAR", err.message); // display err message for UX :)
        });
    },

    addTodo: function(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.VUE_APP_SERVER_ENDPOINT}/todo/add`,
            { credential: payload },
            { withCredentials: true }
          )
          .then((res) => {
            const newTodo = Object.assign({}, res.data, payload); // create new object contain an id reponse back from server
            context.commit("ADD_TODO", newTodo); // add todo in local Vuex.
            resolve(res);
          })
          .catch((err) => {
            context.commit("SET_SNACKBAR", err.message);
            reject(err);
          });
      });
    },

    markAsDone: function(context, payload) {
      context.commit("MARK_AS_DONE", payload);
    },

    deleteTodo: function(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_SERVER_ENDPOINT}/todo/delete`, {
            params: { credential: payload.id },
            headers: { Authorization: "authorizationToken" },
          })
          .then((res) => {
            context.commit("DELETE_TODO", payload);
            resolve(res);
          })
          .catch((err) => {
            context.commit("SET_SNACKBAR", err.message);
            reject(err);
          });
      });
    },
    submitRegisterForm: function(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_SERVER_ENDPOINT}/user/register`, payload)
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
  },
});
