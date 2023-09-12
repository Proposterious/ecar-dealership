'use client'

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import logo from '../../../public/img/google-signin.png'

function GoogleSignInBtn() {
    return ( 
        <button onClick={() => signIn("Google")}>
            <Image 
            src={logo}
            alt='Google Login'
            width={390} height={120}/>
        </button>
     );
}

export default GoogleSignInBtn;