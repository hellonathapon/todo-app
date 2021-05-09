import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: window.localStorage.getItem("jwt") || false,
    user: [],
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
    REGISTERED_AUTH: function(state, payload) {
      state.authUser = payload;
    },
    LOGIN_AUTH: function(state, payload) {
      state.authUser = payload;
      // set todo user info
    },
    TERMINATE_AUTH: function(state, payload) {
      state.authUser = payload;
    },
  },

  actions: {
    fetchTodos: function() {
      //auto triggering when app component is mounted.
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:5000/todo`, {
            withCredentials: true,
          })
          .then((data) => {
            // context.commit("FETCH_TODOS", data.data);
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
            //context.commit("SET_SNACKBAR", err.message); // display err message for UX :)
            reject(err);
          });
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
        // NOTICE: don't misplace params order :) `axios.post(url, payload, config)`
        axios
          .post(
            `${process.env.VUE_APP_SERVER_ENDPOINT}/auth/register`,
            payload,
            { withCredentials: true }
          )
          .then((res) => {
            // set auth state
            context.commit("REGISTERED_AUTH", true);
            resolve(res.data.message);
            router.push("/profile");
          })
          .catch((err) => {
            // server tasks error comes with `response` object but if client unable to react server then just use built-in error message typically connection lost.
            reject(err.response ? err.response.data.message : err.message);
          });
      });
    },
    submitLoginForm: function(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_SERVER_ENDPOINT}/auth/login`, payload, {
            withCredentials: true,
          })
          .then((res) => {
            // save token in localStorage
            console.log(res);
            window.localStorage.setItem("jwt", res.data.jwt);
            context.commit("LOGIN_AUTH", res.data.jwt);
            resolve(res);
            router.push("/profile");
          })
          .catch((err) => {
            reject(err.response ? err.response.data.message : err.message);
          });
      });
    },
    terminateAuth: function(context, payload) {
      context.commit("TERMINATE_AUTH", payload);
    },
  },
});
