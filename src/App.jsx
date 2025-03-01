import { Header, Footer, Container, LoadingSpinner } from './components'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=> {
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  }, [])
  
  return loading ? (
        <div className="w-full min-h-screen flex flex-col bg-[#1a1a1a] text-gray-200">
            <Container>
                <LoadingSpinner />
            </Container>
        </div>
    ):(
    <div className='min-h-screen flex flex-col bg-[#1a1a1a] text-gray-200'>
      <div className='w-full'>
        <Header />
      </div>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
