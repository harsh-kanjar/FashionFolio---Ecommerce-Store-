import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Error404(props) {
  const { error,navigate='/' } = props

  return (
    <Link to={navigate}>
      <div className='h-screen flex items-center justify-center'>
        <h1 className='text-xl font-bold text-red-500 hover:text-black cursor-pointer'>{error}</h1>
      </div>
    </Link>
  )
}

export default Error404
