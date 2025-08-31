import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className="inline-block mb-1 pl-1 text-secondary-text">{label}</label>}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-primary border-2 border-border-color focus:border-accent outline-none w-full text-primary-text appearance-none ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option} className="bg-primary text-primary-text">
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default forwardRef(Select);