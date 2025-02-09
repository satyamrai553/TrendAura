import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './components/index.js'
import { useDispatch } from 'react-redux'
import {checkAuthService} from "./services/index.js"
import {login, logout} from "./store/authSlice.js"
import { getUserCartService } from './services/index.js'
import { fetchCart } from './store/cartSlice.js'




function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    checkAuthService()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))

    getUserCartService()
    .then((cartData) => {
      console.log("📥 Raw cart data from API:", cartData);

      if (cartData && cartData.data && Array.isArray(cartData.data.products)) {
        console.log("🚀 Dispatching fetchCart with data:", cartData.data.products);
        dispatch(fetchCart({ cartData: cartData.data.products })); 
      } else {
        console.error("❌ Unexpected API response structure:", cartData);
      }
    })
    .catch((error) => {
      console.error("❌ Failed to fetch cart data:", error);
    });

  }, [])

  return !loading? (
   <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  ):null
}

export default App
