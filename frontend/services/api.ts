import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
});

// Attach token automatically if exists
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
