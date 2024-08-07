import axios from "axios";
import { isArray } from "lodash";
import configuration from "../config";

// default
axios.defaults.baseURL = configuration.api.backend;
console.log('api.backend', configuration.api.backend)
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";


// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      localStorage.clear();
      const win: Window = window;
      win.location = '/home';
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let errorMsg = '';
    if (isArray(error.response.data.message)) {
      errorMsg = error.response.data.message.join(', ')
    }
    else errorMsg = error.response.data.message;
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error: " + errorMsg;
        break;
      case 401:
        message = "Invalid credentials: " + errorMsg;
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found: " + errorMsg;
        break;
      default:
        message = errorMsg;
    }
    return Promise.reject(message);
  }
);

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: string, params: any) => {
    let response;

    let paramKeys:any[] = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: string, data: any) => {
    const options = {}
    return axios.post(url, data, options);
  };
  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.patch(url, data);
  };
  /**
   * Delete
   */
  delete = (url: string, config: any) => {
    return axios.delete(url, { ...config });
  };
}

export { APIClient };