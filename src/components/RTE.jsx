import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, defaultValue="", label }) {
  const [isEditorLoading, setIsEditorLoading] = useState(true)
  const [key, setKey] = useState(Date.now()) // Add key for forcing re-render
  const editorRef = useRef(null)
  const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

  // Check for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
          if (newTheme !== theme) {
            setTheme(newTheme)
            // Force re-render of the editor on theme change
            setKey(Date.now())
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [theme]);

  return (
    <div className='w-full'> 
        { label && <label className='inline-block mb-1 pl-1 text-secondary-text'> {label} </label>} 
        
        {isEditorLoading && (
          <div className="w-full h-[500px] flex items-center justify-center bg-secondary rounded-lg border border-border-color">
            <p className="text-secondary-text">Loading editor...</p>
          </div>
        )}
    
        <Controller 
            name={name || "content"}
            control={control}
            render = { ({field: {onChange} }) => (
                <Editor
                key={key} // Add key for re-rendering on theme change
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
                  skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                  content_css: theme === 'dark' ? 'dark' : 'default',
                  content_style: `body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; 
                    font-size: 16px; 
                    background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}; 
                    color: ${theme === 'dark' ? '#f3f4f6' : '#1a1a1a'}; 
                  } 
                  body.mce-content-body[data-mce-placeholder]:not([contenteditable="false"]):before { 
                    color: ${theme === 'dark' ? '#9ca3af' : '#4b5563'}; 
                  }`,
                }}
                onInit={(evt, editor) => {
                  setIsEditorLoading(false);
                  editorRef.current = editor;
                }}
                onEditorChange={onChange}
                className={isEditorLoading ? 'hidden' : 'block'}
              />
            ) }
        />
    </div>
  )
}

export default RTE