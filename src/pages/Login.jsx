import React from 'react'
import { Login as LoginComp, Container } from '../components'

function Login() {
  return (
    <div className='min-h-screen py-12 flex items-center justify-center'> 
        <Container>
            <LoginComp />
        </Container>
    </div>
  )
}

export default Login