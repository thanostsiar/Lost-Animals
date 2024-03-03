import axios from "axios";
import { getToken } from "./AuthService";

const base_url = 'http://localhost:8080/api/animal-alerts';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    console.error(error);
    return Promise.reject(error);
  });
  
export const getAllAlerts = () => axios.get(base_url + '/search');

export const saveAlert = (alert) => axios.post(base_url + '/createAlert', alert, {
  headers: {
    'Content-Type': 'multipart/form-data'
}
});

export const getAlert = (id) => axios.get(base_url + '/' + id);

export const updateAlert = (id, alert) => axios.put(base_url + '/' + id, alert);

export const deleteAlert = (id) => axios.delete(base_url + '/' + id);
