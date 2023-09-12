'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { register } from 'module';

function RegisterForm() {
    // Handle 'useState' and 'onChange'
    const router = useRouter()
    const [data, setData] = useState({
        name: "",
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

    const registerUser = async (e: any) => {
        // const newName = data.name; const newEmail = data.email; const newPass = data.password;
        // const newData = {newName, newEmail, newPass}
        console.log({data})
        e.preventDefault()
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const userInfo = await response.json()
        console.log(userInfo)
        router.push('/auth/login')
    }

    return ( 
        <section className='h-full w-1/3 mx-auto py-12'>
            <div className="flex min-h-full flex-1 flex-col justify-center rounded-md ease-linear duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-700 shadow-amber-700 px-6 py-12 lg:px-8 bg-slate-200">
                {/* Card Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className={'mx-auto w-full bg-white'}
                        width={300} height={100}
                        src={"/car-dealership-logo.png"}
                        alt={"eCar Dealership"}
                    />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight decoration-dashed underline text-orange-500">
                        Create An Account
                    </h2>
                </div>
                
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* ENTER A USERNAME */}
                    <form className="space-y-6" action="#" method="POST" onSubmit={registerUser}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                value={data.name}
                                onChange={handleInputChange}
                                placeholder="Very Cool Original Username"
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
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
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* Additional Providers Section */}
                    {/* REPLACE THIS SECTION BELOW WITH PROVIDER BUTTON(S) */}
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default RegisterForm;
    
  