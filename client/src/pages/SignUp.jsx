import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,//dynamically handles the ids
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    const data = await res.json()
    console.log(data);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold py-7 text-center'>Sign Up</h1>  

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' onChange={handleChange}/>

        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleChange}/>

        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity: 80'>Sign Up</button>
      </form>         
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'} className='text-blue-600'>
          Sign in
        </Link>
      </div>
    </div>
  )
}

