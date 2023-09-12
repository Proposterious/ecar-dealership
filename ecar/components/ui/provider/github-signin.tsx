'use client'

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import logo from '../../../public/img/github-signin.png'

function GithubSignInBtn() {
    return ( 
        <button onClick={() => signIn("github")}>
            <Image 
            src={logo}
            alt='Github Login'
            width={390} height={100}/>
        </button>
     );
}

export default GithubSignInBtn;