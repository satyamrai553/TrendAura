import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import { useDispatch } from "react-redux";
import { checkAuthService, getUserCartService } from "./services/index.js";
import { login, logout } from "./store/authSlice.js";
import { saveCartToLocalStorage } from "./helper/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Authenticate user and update state in Redux
        const userData = await checkAuthService();
        if (userData) {
          dispatch(login(userData));

          // Fetch user cart only if authenticated
          const cartData = await getUserCartService();
          if (cartData?.data?.products) {
            // Store cart data in local storage instead of Redux
            saveCartToLocalStorage(cartData.data.products);
          } else {
            // If no products, clear the cart in local storage
            saveCartToLocalStorage([]);
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return !loading ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : null;
}

export default App;
