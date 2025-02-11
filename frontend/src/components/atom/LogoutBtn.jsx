import React from 'react'
import {useDispatch} from 'react-redux'
import {logoutService} from '../../services'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        logoutService().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='bg-text_primary inline px-6 py-2 my-2 duration-200 text-white rounded-full text-md font-bold  font-standard p-2'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn