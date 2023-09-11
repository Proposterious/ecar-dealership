'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { redirect } from 'next/navigation'
import { useState } from "react"

export const RegisterForm = () => {
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
                redirect('../api/signin')
            }
        } catch (error) {
            console.log(error)
        }
        console.log('Register!')
    }
    return (
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
                <Button className='text-md w-full' variant="secondary">Register</Button>
            </div>
        </form>
    )
}