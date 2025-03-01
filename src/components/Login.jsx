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
      <div className={`mx-auto w-full max-w-lg bg-[#2D2D2D] rounded-xl p-10 border border-gray-700 my-12`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" label={false} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-100 leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-400 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input 
              label= "Email: "
              type= "email"
              placeholder= "Enter email"
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
              {...register("password", {
                required: true
              })}
            />
            <Button 
              type='submit'
              className='w-full'
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