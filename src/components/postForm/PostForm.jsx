import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { Input, Button, RTE, Select } from '../index'

function PostForm({post}) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(post?.featuredImage ? service.getFilePreview(post.featuredImage) : null)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
            featuredImage: post?.featuredImage || '',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) =>{
        setIsLoading(true)
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            if(file){
                post.featuredImage ? service.deleteFile(post.featuredImage) : null
            }

            const dbPost = await service.updatePost( post.$id, {
                ...data,
                featuredImage : file ? file.$id : post.featuredImage,
                                userName: post.userName || userData.name || 'Unknown User'
            })

            if(dbPost){
                setIsLoading(false)
                navigate(`/post/${post.$id}`)
            }

        } 
        else{
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if(file){
                data.featuredImage = file.$id
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                    userName: userData.name || 'Unknown User',
                })
                if (dbPost) {
                    setIsLoading(false)
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-') // Replace any non-alphanumeric with hyphen
                .replace(/^-+|-+$/g, ''); // Remove hyphens from start and end
            
            // Limit slug to 36 characters
            // If longer than 36, take first 18 and last 17 chars with a hyphen in middle
            if (slug.length > 36) {
                return `${slug.slice(0, 18)}-${slug.slice(-17)}`;
            }
            return slug;
        }
        return "";
    }, [])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })

        //optimisation  
        return ()=>{
            subscription.unsubscribe();
        }
    }, [ watch, slugTransform, setValue, post])

    useEffect(() => {
        if (post && post.title) {
            setValue('slug', slugTransform(post.title), { shouldValidate: true });
        }
    }, [post, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col">
        <div className="flex flex-wrap mb-6">
            {/* Right Column - Title, Slug, and Status */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { 
                        required: "Slug is required",
                        maxLength: {
                            value: 36,
                            message: "Slug cannot exceed 36 characters"
                        },
                        pattern: {
                            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                            message: "Invalid slug format"
                        }
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
            </div>

            {/* Left Column - Featured Image only */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 file:bg-secondary-bg file:border file:border-border-color file:text-primary-text file:px-2 file:py-1 file:rounded-md file:cursor-pointer hover:file:bg-secondary hover:file:border-accent file:transition-all text-secondary-text"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { 
                        required: !post,
                        onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setSelectedImage(URL.createObjectURL(file));
                            }
                        }
                    })}
                />
                {selectedImage && (
                    <div className="mb-4 h-48 md:h-56 lg:h-64 flex justify-center mb-8 relative border border-border-color rounded-xl p-2">
                        <img
                            src={selectedImage}
                            alt={post ? post.title : "Selected preview"}
                            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300 rounded-lg"
                        />
                    </div>
                )}
            </div>
        </div>

        {/* Full Width RTE */}
        <div className="px-2 w-full mb-6">
            <RTE 
                label="Content :" 
                name="content" 
                control={control} 
                defaultValue={getValues("content")} 
            />
        </div>

        {/* Submit Button */}
        <div className="px-2">
            <Button 
                type="submit" 
                bgColor={post ? "bg-accent-hover" : "bg-button-primary"} 
                className="w-full max-w-xs m-auto"
                isLoading={isLoading}
                loadingText={post ? "Updating..." : "Submitting..."}
            >
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm