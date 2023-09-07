'use client';

//Next-Auth Imports
import { signIn, signOut, useSession } from 'next-auth/react'

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return ( 
            <div className='inline-block'>
                Greetings: <p className='inline-block text-cyan-400'>{session?.user?.name}</p>!
                <br />
                <button className='font-bold' 
                onClick={() => signOut()}>Sign Out</button>
            </div>
        );
    } else {
        return(
            <div>
                <button className='font-bold' 
                onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }
}

export default AuthButton;