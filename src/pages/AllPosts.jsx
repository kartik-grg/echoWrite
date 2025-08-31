import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard, LoadingSpinner, Button } from '../components'
import { Query } from 'appwrite'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        service.getPosts([Query.equal("status", "active")])
            .then((fetchedPosts) => {
                if (fetchedPosts && fetchedPosts.documents) {
                    setPosts(fetchedPosts.documents)
                } else {
                    setPosts([])
                    setError("No posts data received")
                }
            })
            .catch((err) => {
                console.error("Error fetching posts:", err)
                setPosts([])
                setError("Failed to load posts. Please try again later.")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (error) {
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    <div className="p-4 w-full text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">
                            Error
                        </h1>
                        <p className="text-primary-text px-2">{error}</p>
                        <div className="flex justify-center mt-4">
                            <Button onClick={() => window.location.reload()}>
                                Reload
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    <div className="flex justify-center">
                        <LoadingSpinner />
                    </div>
                </Container>
            </div>
        )
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    <div className="p-2 w-full text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-primary-text">
                            No posts available
                        </h1>
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

export default AllPosts