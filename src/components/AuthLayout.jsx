import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, LoadingSpinner } from './index'

function AuthLayout({children, authentication = true}) {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(()=>{
        if(authentication && !authStatus){
            navigate('/login')
        } 
        else if(!authentication && authStatus){
            navigate('/')
        }
    }, [authStatus, authentication, navigate])
  
    // During the initial check, show loading spinner
    if(authentication && !authStatus || !authentication && authStatus) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
                <Container>
                    <LoadingSpinner />
                </Container>
            </div>
        )
    }

    return <>{children}</>
}

export default AuthLayout