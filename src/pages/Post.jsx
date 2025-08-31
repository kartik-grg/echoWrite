import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container, LoadingSpinner } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true);
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/yourPosts");
            }
        });
    };

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <LoadingSpinner />
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex justify-end mb-4">
                    {isAuthor && (
                        <div className="flex gap-3">
                            <Link to={`/editPost/${post.$id}`}>
                                <Button bgColor="bg-accent-hover">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-8">
                    <h1 className={`text-3xl font-bold mb-2`}>
                        {post.title}
                    </h1>
                    <div className="flex items-center mb-4 text-secondary-text text-sm">
                        <span>By: {post.userName || "Unknown User"}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.$createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                    {post.status === "inactive" && (
                        <p className="text-red-400 mb-4">
                            This post is currently not visible to other users
                        </p>
                    )}
                </div>
                
                <div className="w-full flex justify-center mb-8 relative border rounded-xl p-2">
                    <div className="w-full max-w-3xl h-[400px] relative">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full h-full object-contain"
                        />

                        {post.status === "inactive" && (
                            <div className="absolute right-4 top-4">
                                <span className="px-4 py-2 bg-red-500/80 text-primary-text rounded-lg font-medium">
                                    Inactive Post
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`browser-css `}>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}