import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const api = axios.create({ baseURL: `${API_URL}api` });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (status === 403) {
      window.location.href = "/forbidden";
    }
    return Promise.reject(err);
  }
);
