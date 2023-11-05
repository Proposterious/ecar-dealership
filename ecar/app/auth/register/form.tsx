'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/app/loading';

function RegisterForm() {
    // Assign 'useRouter()
    const router = useRouter()
    // Handle 'useState' and 'onChange'
    const [passwordType, setPasswordType] = useState("password")
    const [disableButton, setDisableButton] = useState(false)
    const [error, setError] = useState("")
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
        e.preventDefault()
        // setDisableButton(true)
        async function getRegExp() {
            setDisableButton(true);
            const regStrArray = [["[A-Z]", "Password must contain at least one uppercase letter"], 
            ["[a-z]", "Password must contain at least one lowercase letter"],
            ["[0-9]", "Password must contain at least one digit (0-9)"]
            , ["[#?!@$%^*]", "Password must contain at least one symbol"],
            [`$${data.name.toLowerCase()}`, "Password must not contain your password"]]
            regStrArray.every((str) => {
                let pattern = new RegExp(`(?=.*?${str[0]})`)
                console.log("current pattern: ", pattern)
                if (pattern.test(String(data.password)) != true) { 
                    setError(str[1])
                    setDisableButton(false); return false;
                } else ( console.log(`Passed check: ${str[1]}`))
            });
            
            return true;
        }

        const checkStr = await getRegExp();
        if (checkStr != true ) { return; }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if (res?.error) {
            setError(res.error);
            setDisableButton(false);
        } else { 
            await signIn('credentials', {
            ...data,
            callbackUrl: '/dashboard',
            })
        }
    }

    return ( 
        <section className='mx-auto n-xs:h-screen n-xs:w-full onetime:mb-24 n-md:h-full n-md:w-2/3 n-lg:w-3/4 n-xl:w-1/2'>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center rounded-md ease-linear duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-700 shadow-amber-700 px-6 py-12 lg:px-8 bg-slate-100 hover:bg-white">
                {/* Card Header */}
                <div className="mx-auto max-w-sm">
                <Image width={400} height={60}
                        className='-my-12 md:-my-6 sm:-my-3'
                        src={"/car-logo.png"}
                        alt={"eCar Dealership"}
                    />
                    <h2 className="n-xs:mt-4 n-md:mt-10 text-center n-xs:text-2xl n-lg:text-4xl font-bold leading-9 tracking-tight underline text-orange-500">
                        Create An Account
                    </h2>
                    <h3 className="w-fit h-fit mx-auto my-2 text-center font-semibold text-red-500">
                        {error}
                    </h3>
                </div>
                
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* ENTER A USERNAME */}
                    <form className="n-xs:space-y-6 n-md:space-y-4" action="#" method="POST" onSubmit={registerUser}>
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
                                className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
                                required
                                value={data.email}
                                onChange={handleInputChange}
                                placeholder="johndoe01@email.com"
                                className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* ENTER A PASSWORD */}
                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                                </label>
                                <div className="text-sm">       
                                    <button className="text-slate-600 hover:text-slate-800 hover:font-semibold"
                                    type="button" onClick={() => {
                                        if (passwordType === "password") {
                                            setPasswordType("text")
                                        } else { setPasswordType("password") }
                                    }}>
                                        Show Password
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="new-password"
                                name="password"
                                type={passwordType}
                                minLength={8} maxLength={24}
                                required
                                value={data.password}
                                onChange={handleInputChange}
                                placeholder="***************"
                                className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <a href="#" className="m-auto | text-sm  font-semibold text-orange-600 hover:text-orange-500">
                                Forgot password?
                            </a>
                        </div>

                        <div className=''>
                            <button
                            type="submit" disabled={disableButton}
                            className="peer flex w-full justify-center -mt-4 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm disabled:hidden hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Sign Up 
                            </button>
                            <div className="hidden peer-disabled:block loader mx-auto" />
                        </div>
                    </form>
                    {/* Additional Providers Section */}
                    {/* REPLACE THIS SECTION BELOW WITH PROVIDER BUTTON(S) */}
                    <p className="n-xs:mt-2 mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link href="/auth/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                        Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default RegisterForm;
    
  