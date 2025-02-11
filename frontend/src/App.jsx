import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";
import { useDispatch } from "react-redux";
import { checkAuthService } from "./services/index.js";
import { login, logout } from "./store/authSlice.js";
import { getUserCartService } from "./services/index.js";
import { fetchCart } from "./store/cartSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Authenticate user and update state
        const userData = await checkAuthService();
        if (userData) {
          dispatch(login(userData));
          
          // Fetch user cart only if authenticated
          const cartData = await getUserCartService();
          if (cartData?.data?.products) {
            dispatch(fetchCart({ cartData: cartData.data.products }));
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
