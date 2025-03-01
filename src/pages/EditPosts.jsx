import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Container, PostForm, LoadingSpinner } from '../components'

function EditPosts() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    if(slug) {
      service.getPost(slug)
        .then((post) => {
          if(post) {
            setPost(post)
          } else {
            navigate('/')
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error)
          navigate('/')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      navigate('/')
    }
  }, [slug, navigate])
  
  if (loading) {
    return (
      <div className='py-8'>
        <Container>
          <LoadingSpinner />
        </Container>
      </div>
    )
  }

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPosts