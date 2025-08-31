import React from 'react'
import logoImg from '../assets/logo.jpeg'

function Logo({
  width = '48px',
  label = true
}) {
  return (
    <div className="flex items-center gap-2 rounded">
      <img src={logoImg} alt="echoWrite logo" className='rounded-full' style={{width}} />
      {label === true && 
        <span className="text-2xl font-bold text-primary-text select-none">
          echo<span className="text-accent">Write</span>
        </span>
      }
    </div>
  )
}

export default Logo