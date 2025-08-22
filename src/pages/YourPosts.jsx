import React, {useEffect, useState} from 'react'
import service from "../appwrite/config"
import {Container, PostCard, LoadingSpinner} from '../components'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function YourPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const loggedIn = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        setLoading(true)
        if (userData) {
            const queries = [
                Query.equal("userId", userData.$id)
            ]
            service.getPosts(queries)
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents || [])
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error)
                    setPosts([])
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
            setPosts([])
        }
    }, [userData])
  
    if (loading) {
        return (
            <div className="w-full mt-8">
                <Container>
                    <LoadingSpinner />
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                { loggedIn ? 'You haven\'t posted something yet' : 'Login to read posts'}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 pb-6 mb-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default YourPosts