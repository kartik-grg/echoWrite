import React from 'react'
import { Login as LoginComp, Container } from '../components'

function Login() {
  return (
    <div className='min-h-screen py-4 sm:py-6 md:py-12 px-2 sm:px-4 flex items-center justify-center'> 
        <Container>
            <div className="w-full max-w-md mx-auto">
                <LoginComp />
            </div>
        </Container>
    </div>
  )
}

export default Login