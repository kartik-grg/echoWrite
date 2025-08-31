import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 text-secondary-text' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-primary border-2 border-border-color focus:border-accent outline-none w-full text-primary-text appearance-none ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input