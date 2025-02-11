import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutService, checkAuthService, getUserCartService } from "../../services";
import { logout, login } from "../../store/authSlice";
import { fetchCart } from "../../store/cartSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutService(); // Logout API call
      dispatch(logout()); // Clear auth state
      dispatch(fetchCart({ cartData: [] })); // Clear cart data
      navigate("/"); // Redirect to home page

      // Fetch latest data to ensure page updates
      const updatedUser = await checkAuthService();
      if (updatedUser) {
        dispatch(login(updatedUser)); // Update Redux state with new user data
      }

      const updatedCart = await getUserCartService();
      dispatch(fetchCart({ cartData: updatedCart?.data?.products || [] }));

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
