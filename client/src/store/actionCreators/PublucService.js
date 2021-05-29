import axios from "axios";

class PublicService {
  retrieveTodos() {
    return axios.get(`${process.env.VUE_APP_SERVER_ENDPOINT}/todo`);
  }
}

export default new PublicService();
