'use client'
// Function Imports
import { signIn } from 'next-auth/react';
import { useState } from 'react';
// Component Imports
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LoginForm() {
    // Handle 'useState' and 'onChange'
    const router = useRouter();
    const [error, setError] = useState("");
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
    };
    // Login user
    const loginUser = async (e: any) => {
        // Handle 'signIn()' request
        e.preventDefault()
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        })

        if (result?.error) {
            setError(result.error);
        } else { router.replace('/dashboard'); }
    }
   

    return (
        <section className='mx-auto n-xs:h-screen n-xs:w-full n-md:py-12 n-md:h-full n-md:w-2/3 n-lg:w-3/4 n-xl:w-1/2'>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center rounded-md ease-linear duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-700 shadow-amber-700 px-6 py-12 lg:px-8 bg-slate-100 hover:bg-white">
                {/* Card Header */}
                <div className="max-w-sm">
                    <Image width={400} height={60}
                        className='-my-12'
                        src={"/car-logo.png"}
                        alt={"eCar Dealership"}
                    />
                    <h2 className="n-xs:mt-4 n-md:mt-10 text-center n-xs:text-2xl n-lg:text-4xl font-bold leading-9 tracking-tight underline text-orange-500">
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
                                className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
                            className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
    
  