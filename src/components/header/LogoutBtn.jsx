import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom';
import { Button } from '../index'

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    authService.logout()
    .then(()=>{
      dispatch(logout())
      navigate('/')
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <Button 
      onClick={handleLogout}
      isLoading={isLoading}
      loadingText="Logging out..."
      bgColor="bg-transparent"
      className="px-6 py-2 text-gray-300 font-medium rounded-full
      hover:text-white hover:bg-[#3D3D3D] hover:scale-105
      active:scale-95 active:bg-[#2D2D2D]"
    >
      Logout
    </Button>
  );
}

export default LogoutBtn