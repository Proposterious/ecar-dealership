'use client'
import GoogleSignInBtn from "@/components/ui/provider/google-signin";
import GithubSignInBtn from "@/components/ui/provider/github-signin";
import MetaSignInBtn from "@/components/ui/provider/meta-signin";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { redirect } from 'next/navigation'
import { useState } from "react"

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email, password 
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                redirect('./signin')
            }
        } catch (error) {
            console.log(error)
        }
        console.log('Register!')
    }
    return (
      <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
        <section className='shadow-xl p-4 bg-white rounded-md'>
          <h1 className='font-semi-bold text-2xl mb-6 p-4'>Create Your eCar-Dealership Account!</h1>
          <div className='w-2/3 items-center flex flex-col'>
            <GoogleSignInBtn />
            <MetaSignInBtn />
            <GithubSignInBtn />
          </div>
        <form onSubmit={onSubmit} className='space-y-12 tracking-wide'>
            <div className='grid-w-full max-w-lg items-center gap-2'>
                <Label className='text-md mb-2' htmlFor="email">Email</Label>
                <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                />
            </div>
            <div className='grid-w-full max-w-lg items-center gap-2'>
                <Label className='text-md mb-2' htmlFor="password">Password</Label>
                <Input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    type="password" 
                    placeholder="********"
                />
            </div>
            <div className='flex items-center space-x-2'>
                <Button className='text-md w-full' variant="secondary">Sign In</Button>
            </div>
          </form>
        </section>
      </div>
    )
}