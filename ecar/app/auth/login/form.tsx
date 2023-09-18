'use client'
// Function Imports
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { redirect } from 'next/navigation';
// Component Imports
import Image from 'next/image';
import Link from 'next/link';

function LoginForm() {
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
    // Login User
    const loginUser = async (e: any) => {
        awaitLogin();
        // Handle 'signIn()' request
        e.preventDefault()
        signIn('credentials', {
            ...data
        })
    }
    // Provide loading screen
    const awaitLogin = () => {
        return (
            <div className='flex absolute justify-center items-center min-h-screen bg-black w-full'> 
                <div className='loader'></div> 
            </div> 
        )
    }

    // Assign 'useSession'
    const { status } = useSession()

    if (status === "authenticated") {redirect('/dashboard')} // redirect user to dashboard when authenticated
    else if (status === 'loading') { // display loading animation while waiting for status
        return (
            <div className='flex justify-center items-center min-h-screen bg-black w-full'> 
                <div className='loader'></div> 
            </div> 
        )
    }
    
    return (
        <section className='h-full w-1/3 mx-auto py-12'>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center rounded-md ease-linear duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-700 shadow-amber-700 px-6 py-12 lg:px-8 bg-slate-100 hover:bg-white">
                {/* Card Header */}
                <div className="max-w-sm">
                    <Image width={400} height={60}
                        className='-my-12'
                        src={"/car-logo.png"}
                        alt={"eCar Dealership"}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight underline text-orange-500">
                        Login to Your Account
                    </h2>
                </div>
                
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* ENTER CREDENTIALS */}
                    <form className="space-y-4" action="#" onSubmit={loginUser}>
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
                        {/* CLICK TO SIGN IN */}
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
                    <div> {/* Change to include providers please for the love of god fix this... CHECK 'Providers.tsx' */}
                        {null}
                    </div>
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
    
  