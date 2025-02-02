import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './components/index.js'
import { useDispatch } from 'react-redux'
import {checkAuthService} from "./services/index.js"
import {login, logout} from "./store/authSlice.js"





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
