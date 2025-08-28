import React from 'react'
import image404 from './../../images/404.webp'
const NotFound = () => {
  return (
    <div className='not-found d-flex justify-content-center align-items-center w-100'>
    <img className='w-100' src={image404} alt='404' />
    </div>
  )
}

export default NotFound
