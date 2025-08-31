import React from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/config'
import parse from 'html-react-parser'

function PostCard({$id, title, featuredImage, status, content, userName, $createdAt}) {

  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card relative h-full">
        {status === "inactive" && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-1 text-sm bg-red-500/80 text-primary-text rounded-full">
              Inactive
            </span>
          </div>
        )}
        <div className="w-full relative mb-4 h-48 md:h-56 lg:h-64 rounded-xl bg-secondary">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img 
              src={service.getFilePreview(featuredImage)} 
              alt={title}
              className={`w-full h-full object-cover ${status === "inactive" ? "opacity-60" : ""}`}
            />
          </div>
        </div>
        <h2 className={`text-xl font-semibold ${status === "inactive" ? "text-secondary-text" : "text-primary-text"}`}>
          {title}
        </h2>
        <div className="flex items-center mt-1 mb-2">
                  <p className={`mt-2 text-sm text-left ${status === "inactive" ? "text-secondary-text" : "text-secondary-text/90"}`}>
            By: {userName || "Unknown Author"} • {new Date($createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
