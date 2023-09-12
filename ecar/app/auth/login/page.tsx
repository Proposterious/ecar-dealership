'use client'

import { redirect } from 'next/navigation'
import { useState } from "react"

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const data = { email, password }
        try {
          const res = await fetch(
              `http://localhost/api/login`,
              {
                  method: 'GET',
                  headers: {
                    
                  },
              }
          );
          const data = await res.json();
          console.log(data);
      } catch (err) {
          console.log(err);
      }
        console.log('Logged in.')
    }
    return (
      <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
        <section className='shadow-xl p-4 bg-white rounded-md'>
          <h1 className='font-semibold text-2xl bg-orange-600 text-white rounded-sm mb-6 p-4'>Login to your eCar-Dealership Account</h1>
          <div className='mb-2 w-auto h-auto space-y-3 items-center flex flex-col rounded-lg p-4 bg-zinc-300'>
            {/* INSERT PROVIDER BUTTONS HERE */}
          </div>
        <form onSubmit={onSubmit} className='space-y-6 tracking-wide'>
            <div className='grid-w-full max-w-lg items-center gap-2'>
                <label className='text-md mb-2' htmlFor="email">Email</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                />
            </div>
            <div className='grid-w-full max-w-lg items-center gap-2'>
                <label className='text-md mb-2' htmlFor="password">Password</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    type="password" 
                    placeholder="********"
                />
            </div>
            <div className='flex items-center space-x-2'>
                <button className='text-md w-full'>Sign In</button>
            </div>
          </form>
        </section>
      </div>
    )
}