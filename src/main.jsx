import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login, SignUp } from './components'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPosts from './pages/EditPosts.jsx'
import Post from './pages/Post.jsx'
import YourPosts from './pages/YourPosts.jsx'
import { ThemeProvider } from './context/ThemeContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AllPosts />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/yourPosts',
        element: (
          <AuthLayout authentication={true}>
            <YourPosts />
          </AuthLayout>
        )
      },
      {
        path: '/addPost',
        element: (
          <AuthLayout authentication={true}>
            {" "} <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/editPost/:slug',
        element: (
          <AuthLayout authentication>
            {" "} <EditPosts />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store} >
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  // </StrictMode>,
)
