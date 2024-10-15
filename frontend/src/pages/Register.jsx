import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const apiUrl = 'https://hm-website-backend.vercel.app/auth/register'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(apiUrl, {
            fullName,
            email,
            password,
        } , {
            withCredentials: true
        })
        const data = await response.data()
        alert(data.message)
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Full Name' className='p-2 rounded-md' value={fullName} onChange={(e) => setFullName(e.target.value)} /> 
            <input type="text" placeholder='Email' className='p-2 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className='p-2 rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Sign Up</button>
        </form>
    </div>
  )
}

export default Register