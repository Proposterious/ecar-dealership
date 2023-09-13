'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

function LoginForm() {
    // Assign 'useRouter()'
    const router = useRouter()
    // Assign 'useSession
    const { update } = useSession()
    // Handle 'useState' and 'onChange'
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
      };

    const loginUser = async (e: any) => {
        // Handle 'signIn()' request
        e.preventDefault()
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        update()
        router.push('/dashboard');
    }

    return ( 
        <section className='h-full w-1/3 mx-auto py-12'>
            <div className="flex min-h-full flex-1 flex-col justify-center rounded-md ease-linear duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-700 shadow-amber-700 px-6 py-12 lg:px-8 bg-slate-100 hover:bg-white">
                {/* Card Header */}
                <div className="mx-auto max-w-sm">
                    <Image className={'w-full'}
                        width={300} height={30}
                        src={"/car-dealership-logo.png"}
                        alt={"eCar Dealership"}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight underline text-orange-500">
                        Login to Your Account
                    </h2>
                </div>
                
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* ENTER CREDENTIALS */}
                    <form className="space-y-4" action="#" method="POST" onSubmit={loginUser}>
                        {/* ENTER AN EMAIL */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={data.email}
                                onChange={handleInputChange}
                                placeholder="johndoe01@email.com"
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* ENTER A PASSWORD */}
                        <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="text-sm">
                            <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
                                Forgot password?
                            </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={data.password}
                            onChange={handleInputChange}
                            placeholder="***************"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    {/* Additional Providers Section */}
                    {/* REPLACE THIS SECTION BELOW WITH PROVIDER BUTTON(S) */}
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link href="/auth/register" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                        Sign Up for Free
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
    
  