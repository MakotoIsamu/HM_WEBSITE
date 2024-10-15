import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <nav className='flex justify-between items-center w-full'>
            <p className='text-2xl font-bold'>HMCLONE</p>
            <Link to='/login' className='text-xl cursor-pointer'>Login</Link>
        </nav>
    </div>
  )
}

export default Navbar