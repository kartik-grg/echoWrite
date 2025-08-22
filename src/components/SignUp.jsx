import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input, Button, Logo } from './index'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'

function SignUp() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const create = async (data) => {
        setIsLoading(true);
        setError("");
        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                  dispatch(storeLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        } finally{
            setIsLoading(false)
        }
    }

    return (
      <div className="flex items-center justify-center w-full">
          <div className={`mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg bg-[#2D2D2D] rounded-xl p-6 sm:p-8 border border-gray-700 my-4 sm:my-8`}>
              <div className="mb-4 flex justify-center">
                  <span className="inline-block w-full max-w-[70px] sm:max-w-[100px]">
                      <Logo width="100%" label={false} />
                  </span>
              </div>
              <h2 className="text-center text-lg sm:text-2xl font-bold text-gray-100 leading-tight">Sign up to create account</h2>
              <p className="mt-2 text-center text-xs sm:text-base text-gray-400">
                  Already have an account?&nbsp;
                  <Link
                      to="/login"
                      className="font-medium text-violet-400 transition-all duration-200 hover:text-violet-300"
                  >
                      Sign In
                  </Link>
              </p>
              {error && <p className="text-red-400 mt-4 text-center text-xs sm:text-base">{error}</p>}
              <form onSubmit={handleSubmit(create)} className="mt-4 sm:mt-6">
                <div className='space-y-3 sm:space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    className="text-sm"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    className="text-sm"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    className="text-sm"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button 
                        type="submit" 
                        className="w-full mt-4 text-sm sm:text-base py-2"
                        isLoading={isLoading}
                        loadingText='Creating Account...'
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp