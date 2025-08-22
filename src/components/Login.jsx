import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import {Input, Button, Logo} from './index.js'

function Login() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("");
    try {
      setIsLoading(true);
      const session = await authService.login(data);
      if(session){
        const userData = await authService.getCurrentUser()
        if(userData){
          dispatch(storeLogin(userData))
        }
        navigate('/')
      }
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg bg-[#2D2D2D] rounded-xl p-6 sm:p-8 border border-gray-700 my-4 sm:my-8`}>
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[70px] sm:max-w-[100px]">
            <Logo width="100%" label={false} />
          </span>
        </div>
        <h2 className="text-center text-lg sm:text-2xl font-bold text-gray-100 leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-xs sm:text-base text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-400 mt-4 text-center text-xs sm:text-base">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-4 sm:mt-6'>
          <div className='space-y-3 sm:space-y-5'>
            <Input 
              label= "Email: "
              type= "email"
              placeholder= "Enter email"
              className="text-sm"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Email address must be a valid address!!"
                }
              })}
            />
            <Input 
              label="Password: "
              placeholder="Enter Password"
              type="password"
              className="text-sm"
              {...register("password", {
                required: true
              })}
            />
            <Button 
              type='submit'
              className='w-full mt-4 text-sm sm:text-base py-2'
              loadingText='Signing In...'
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login