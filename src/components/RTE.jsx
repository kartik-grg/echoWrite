import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, defaultValue="", label }) {
  const [isEditorLoading, setIsEditorLoading] = useState(true)

  return (
    <div className='w-full'> 
        { label && <label className='inline-block mb-1 pl-1'> {label} </label>} 
        
        {isEditorLoading && (
          <div className="w-full h-[500px] flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400">Loading editor...</p>
          </div>
        )}
    
        <Controller 
            name={name || "content"}
            control={control}
            render = { ({field: {onChange} }) => (
                <Editor
                apiKey='86myfq0nrqf6hrj1lsvj1i7hhi24ra64025nezurjsr03wcj'
                initialValue={defaultValue}
                init={{
                  min_height: 500,
                  max_height: 1000,
                  menubar: true,
                  plugins: [
                    'autoresize',
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
            
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #1F2937; color: #E5E7EB; } body.mce-content-body[data-mce-placeholder]:not([contenteditable="false"]):before { color: #9CA3AF; }',
                }}
                onInit={() => setIsEditorLoading(false)}
                onEditorChange={onChange}
                className={isEditorLoading ? 'hidden' : 'block'}
              />
            ) }
        />
    </div>
  )
}

export default RTE