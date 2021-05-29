import axios from "axios";
/**
 * Axios params order: `axios.post(url, payload, config)`
 */

class AuthService {
  login(user) {
    return axios.post(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/auth/login`,
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    );
  }
  register(user) {
    return axios.post(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/auth/register`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    );
  }
  profile() {
    // check token
    const claimToken = window.localStorage.getItem("jwt");
    const config = {
      headers: { Authorization: `Bearer ${claimToken}` },
    };
    return axios.post(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/auth/profile`,
      null,
      config
    );
  }
  addTodo(payload) {
    return axios.post(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/todo/add`,
      payload,
      {
        withCredentials: true,
      }
    );
  }
}

export default new AuthService();
