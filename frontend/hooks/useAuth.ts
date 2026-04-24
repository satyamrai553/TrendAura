import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { logout as logoutAction } from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user: auth.user,
    token: auth.token,
    isLoggedIn: auth.isLoggedIn,
    loading: auth.loading,
    error: auth.error,
    logout,
  };
};
