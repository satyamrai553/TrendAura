import React from 'react'
import {Container, Logo, LogoutBtn} from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'NEW',
      slug: "/new",
      active: true
    }, 
    {
      name: 'MEN',
      slug: "/men",
      active: true
    }, 
    {
      name: 'WOMEN',
      slug: "/women",
      active: true
    }, 
    {
      name: "CONTACT-US",
      slug: "/contact",
      active: true,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-background_primary'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo children="TrendAura" textColor="text-text_primary"  font="font-logo" textSize='text-4xl'/>

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-text_primary hover:text-white font-standard rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header