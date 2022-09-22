import axios from "axios";

const baseURL = "http://localhost/api";
import toastNotif from "../toastNotif";

const axiosConfig = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toastNotif(
        "Impossible de se connecter au serveur, veuillez rafraichir la page ou réessayer ultérieurement",
        "error"
      );
    }
    return Promise.reject(error.response);
  }
);

export default axiosConfig;
