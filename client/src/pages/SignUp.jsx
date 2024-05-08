import React from 'react'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold py-7 text-center'>Sign Up</h1>  

      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />

        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />

        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' />
      </form>         
    </div>
  )
}

