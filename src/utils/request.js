import axios from "axios";
// import { store } from "config/redux/persistConfig";
// import { getLoginData } from "config/redux/rootAction";
// import { getCookie, removeCookie } from "tiny-cookie";
// import config from "@config";
// import { store } from "@config/store";
// import { logoutRequest } from 'actions/app';

const API_URL = "https://wisnuadiwardhana.my.id";

const request = axios.create({
  baseURL: `${API_URL}/psr`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // 'Access-Control-Allow-Headers': '*',
    // 'Access-Control-Allow-Credentials': 'true',
  },
});

const requestHandler = (request) => {
  // let token = getCookie("token");

  // if (token != undefined) {
  //   request.headers.Authorization = `Bearer ${token}`;
  // }

  return request;
};

const responseHandler = (response) => {
  return response;
};

// const errorHandler = (error) => {
//   if (error.response.data.code === 401) {
//     store.dispatch(getLoginData({}));
//     removeCookie("token");
//     window.location.replace("/");
//   }
//   return error;
// };

request.interceptors.request.use(
  (request) => requestHandler(request)
  // (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response)
  // (error) => errorHandler(error)
);

export default {
  get: (url, params, headers = {}) =>
    request({ method: "get", url, params, headers }),
  options: (url, params, headers = {}) =>
    request({ method: "options", url, params, headers }),
  post: (url, data, headers = {}) =>
    request({ method: "post", url, data, headers }),
  put: (url, data, headers) => request({ method: "put", url, data, headers }),
  delete: (url, data) => request({ method: "delete", url, data }),
  setToken: (token) => {
    request.defaults.h.common["X-CSRF-TOKEN"] = token;
    // if (token) {
    //   request.defaults.headers.common.Authorization = `Bearer ${token}`;
    // } else {
    //   delete request.defaults.headers.common.Authorization;
    // }
  },
};
