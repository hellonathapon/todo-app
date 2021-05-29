import router from "../router";
import AuthService from "./actionCreators/AuthService";

export default {
  namespaced: true,
  state: {
    user: {
      isAuth: window.localStorage.getItem("jwt") || false, // navbar use this info for initial display btn accordingly.
      data: [],
    },
  },
  getters: {},
  mutations: {
    SUBMIT_LOGIN_FORM: function(state, payload) {
      state.user.isAuth = payload;
    },
    VALIDATE_JWT: function(state, payload) {
      state.user.isAuth = payload.isAuth;
      state.user.data = payload.data;
    },
    LOGOUT: function(state, payload) {
      state.user = { isAuth: payload, data: [] };
    },
  },
  actions: {
    submitLoginForm: function({ commit }, payload) {
      return new Promise((resolve, reject) => {
        AuthService.login(payload)
          .then((res) => {
            const { jwt } = res.data;
            window.localStorage.setItem("jwt", jwt);
            commit("SUBMIT_LOGIN_FORM", true);
            resolve(res);
          })
          .catch((err) => {
            reject(err.response.data ? err.response.data.message : err.message);
          });
      });
    },
    submitRegisterForm: function(context, payload) {
      return new Promise((resolve, reject) => {
        AuthService.register(payload)
          .then((res) => resolve(res.data.message))
          .catch((err) =>
            reject(err.response.data ? err.response.data.message : err.message)
          );
      });
    },
    // setAuthUser: function(context, payload) {
    //   context.commit("SET_AUTH_USER", payload);
    // },
    verifyUser: function({ commit }) {
      if (window.localStorage.getItem("jwt")) {
        return new Promise((resolve, reject) => {
          AuthService.profile()
            .then((res) => {
              const user = res.data.user[0];
              console.log(res);
              /**
               * if JWT is valid then set auth user
               */
              commit("VALIDATE_JWT", { isAuth: true, data: user });
              resolve();
            })
            .catch((err) => {
              /**
               * else if stored JWT is either invalid or outdate
               * it need to be removed from localStorage so navbar and other components
               * that listen on this particular state boolean value need to act acordingly.
               */
              window.localStorage.removeItem("jwt");
              commit("VALIDATE_JWT", { isAuth: false, data: [] });
              reject(err);
            });
        });
      }
    },
    logout: function({ commit }) {
      window.localStorage.removeItem("jwt");
      commit("LOGOUT", false);
      router.push("/");
    },
  },
};
