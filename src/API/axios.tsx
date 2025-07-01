import axios from "axios";
import authStore from "@/store/loginStore";
import { useNavigate } from 'react-router-dom';
const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

// Interceptor Request
Axios.interceptors.request.use(
  (config) => {
    if (axios.isCancel(config)) {
      console.log("Request canceled:", config);
      return config;
    }

    // Ambil token secara dinamis dari Zustand
    const { token } = authStore.getState(); // Access state correctly
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('err login: ', error)
    const navigate = useNavigate();
    const { reset } = authStore();
    if (error.response && error.response.status === 403) {
      reset();
      navigate("/login");
    }
    else if (error.response && Number(error.response.data.status) === 403) {
      reset();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default Axios;
