import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { Container, Logo, ThemeToggle } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    <header className='py-3 shadow bg-secondary border-b border-border-color'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className="hover:opacity-90 transition-opacity">
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-secondary-text hover:text-primary-text focus:outline-none'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-x-4'>
            {
              navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button 
                    onClick={()=>navigate(item.url)}
                    className={`px-4 py-2 duration-200 rounded-full ${
                      location.pathname === item.url 
                      ? 'bg-accent text-primary-text' 
                      : 'text-secondary-text hover:text-primary-text hover:bg-secondary-bg'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ): null
            )}
            { authStatus && (<li><LogoutBtn /></li>)}
            <li><ThemeToggle /></li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-2 border-t border-gray-700">
            <ul className='flex flex-col gap-y-2'>
              {
                navItems.map((item)=>
                item.active ? (
                  <li key={item.name} className="w-full">
                    <button 
                      onClick={()=>navigate(item.url)}
                      className={`w-full text-left px-4 py-2 duration-200 rounded-lg ${
                        location.pathname === item.url 
                        ? 'bg-accent text-primary-text' 
                        : 'text-secondary-text hover:text-primary-text hover:bg-secondary-bg'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ): null
              )}
              { authStatus && (
                <li className="w-full px-4 py-2">
                  <LogoutBtn className="w-full flex justify-start" />
                </li>
              )}
              <li className="w-full px-4 py-2 flex">
                <ThemeToggle />
                <span className="ml-2 text-secondary-text">Toggle Theme</span>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header