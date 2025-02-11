import React, { useState } from 'react';
import { Container, Logo, LogoutBtn, CartBtn } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'NEW',
      slug: '/new',
      active: true,
    },
    {
      name: 'MEN',
      slug: '/men',
      active: true,
    },
    {
      name: 'WOMEN',
      slug: '/women',
      active: true,
    },
    {
      name: 'CONTACT-US',
      slug: '/contact',
      active: true,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='py-3 shadow bg-background_primary'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo children='TrendAura' textColor='text-text_primary' font='font-logo' textSize='text-4xl' />
            </Link>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className='block md:hidden'>
            <button onClick={toggleMenu} className='text-text_primary focus:outline-none'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <ul
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-6 absolute md:static bg-background_primary w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false); // Close menu after navigation
                    }}
                    className='block w-full text-left md:text-center px-4 py-2 duration-200 hover:bg-text_primary hover:text-white font-standard rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {authStatus && (
              <li>
                <CartBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;