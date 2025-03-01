import React, { forwardRef, useId } from 'react'

const Select = ({ 
    label, 
    className="", 
    options = [], 
    ...props
}, ref) => {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-gray-700 text-gray-100 outline-none focus:bg-gray-600 duration-200 border border-gray-600 w-full ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option 
            value={option} 
            key={option}
            className="bg-gray-700"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);