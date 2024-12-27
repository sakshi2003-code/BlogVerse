// common-button
import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
    // or jo b properties aa ri h prop m use spread kr diya 
}) {
  return (
   <button className={`px-4 py-2 rounded-lg ${bgColor} ${className}
   ${textColor} `}{...props}>
    {children}
   </button>
  )
}

export default Button
