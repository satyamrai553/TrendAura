import { apiCall } from "./api";
import { registerUserSchema, loginUserSchema } from "@trendaura/common";
import { z } from "zod";

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;

// Note: Login and register are now handled by Redux thunks (loginUserThunk, registerUserThunk)
// These functions are kept for reference or backward compatibility

export const loginUser = async (formData: LoginUserInput) => {
  try {
    const response = await apiCall.post("/users/login", formData);
    if (response.data?.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (formData: RegisterUserInput) => {
  try {
    const response = await apiCall.post("/users/register", formData);
    if (response.data?.data?.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
};
