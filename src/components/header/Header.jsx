import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { Container, Logo } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: 'All Posts',
      url: '/',
      active: true
    },
    {
      name: 'Your Posts',
      url: '/yourPosts',
      active: authStatus
    },
    {
      name: 'Login',
      url: '/login',
      active: !authStatus
    },
    {
      name: 'SignUp',
      url: '/signUp',
      active: !authStatus
    },
    {
      name: 'Add Post',
      url: '/addPost',
      active: authStatus
    },
  ]
  return (
    <header className='py-3 shadow bg-[#2D2D2D] border-b border-gray-700'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className="hover:opacity-90 transition-opacity">
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex items-center gap-x-4'>
            {
              navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button 
                    onClick={()=>navigate(item.url)}
                    className={`px-4 py-2 duration-200 rounded-full ${
                      location.pathname === item.url 
                      ? 'bg-violet-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-[#3D3D3D]'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ): null
            )}
            { authStatus && (<li><LogoutBtn /></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header