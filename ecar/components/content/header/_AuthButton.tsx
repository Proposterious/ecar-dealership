'use client'

//Next-Auth Imports
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'

function AuthButton() {
    const { data: token } = useSession()
    if (token) {
        return ( 
            <>
                <li className="font-semibold hover:text-orange-600 | border-l pl-6 border-black">
                    <Link href='/dashboard'>Dashboard</Link>
                </li>
                <li className="flex-none | text-center border-2 rounded-3xl border-black bg-orange-600 px-3 n-md:px-6 py-3 font-medium text-white">
                    <p className='inline-block'>Greetings:</p>
                    <Link href='/dashboard' className='indent-1 inline-block underline decoration-inherit hover:text-indigo-600'>
                        {token.user?.name}
                    </Link> !
                    <br />
                    <button className='font-bold hover:text-black' onClick={() => signOut({callbackUrl: '/' })}>
                        Logout
                    </button>
                </li>
            </>
        );
    } else {
        return(
            <li className = 'border-l pl-6 border-black'>
                <Link href='/auth/login'>
                    <button className='text-white font-bold hover:text-slate-200/80 | border-2 rounded-3xl border-black bg-orange-600 px-6 py-3' >
                        Login
                    </button>
                </Link>
            </li>
        );
    }
}

export default AuthButton;