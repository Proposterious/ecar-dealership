'use client';

//Next-Auth Imports
import { signIn, signOut, useSession } from 'next-auth/react'

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return ( 
            <div className='inline-block'>
                <p className='inline-block'>Greetings:</p>
                <p className='indent-1 inline-block underline decoration-inherit hover:text-black'>{session?.user?.name}</p>!
                <br />
                <button className='font-bold hover:text-black' onClick={() => signOut()}>
                    Sign Out
                </button>
            </div>
        );
    } else {
        return(
            <div>
                <button className='font-bold hover:text-slate-200/80' 
                onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }
}

export default AuthButton;