import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutService, checkAuthService, getUserCartService } from "../../services";
import { logout, login } from "../../store/authSlice";
import { saveCartToLocalStorage } from "../../helper/index.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Call backend to perform logout
      await logoutService();
      
      // Clear auth state in Redux
      dispatch(logout());
      
      // Clear cart data in local storage
      saveCartToLocalStorage([]);
      
      // Redirect to home page
      navigate("/");
      
      // Optionally, re-check authentication to update auth state if needed
      const updatedUser = await checkAuthService();
      if (updatedUser) {
        dispatch(login(updatedUser));
      }
      
      // Optionally, update cart from backend and save it in local storage
      const updatedCart = await getUserCartService();
      saveCartToLocalStorage(updatedCart?.data?.products || []);
      
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      className="bg-text_primary inline px-6 py-2 my-2 duration-200 text-white rounded-full text-md font-bold font-standard p-2"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
