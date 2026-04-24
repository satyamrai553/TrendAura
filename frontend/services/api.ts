import axios from "axios";

export const apiCall = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
});

// Attach token automatically if exists
apiCall.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default export for backward compatibility
export default apiCall;
