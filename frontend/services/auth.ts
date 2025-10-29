import api from "./api";
import {registerUserSchema, loginUserSchema} from "@trendaura/common"
import {z} from "zod";
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;


export const loginUser = async (formData: LoginUserInput) => {
    try {
      const {email, password} = formData;
      const response = await api.post("/users/login", { email, password});
      if (response.data?.data?.accessToken) {
        // Save JWT to localStorage
        localStorage.setItem("token", response.data.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


export const registerUser = async (formData: RegisterUserInput)=>{
  try {
    const {password, email, phoneNumber, fullname, role} = formData;
    const response = await api.post("/users/register", formData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data
  } catch (error) {
     console.error(error);
    throw error;
  }
}