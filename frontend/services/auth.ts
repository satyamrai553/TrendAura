import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      // Save JWT to localStorage
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
