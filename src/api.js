import axios from "axios";

const TIMEOUT_MS = 5000;

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: TIMEOUT_MS,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onReject = (err) => {
    if (err.response.status === 403) {
      dispatch();
    }
  };

  api.interceptors.response.use(onSuccess, onReject);

  return api;
};

export default createAPI;
