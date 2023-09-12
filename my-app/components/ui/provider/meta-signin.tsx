'use client'

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import logo from '../../../public/img/facebook-signin.png'

function MetaSignInBtn() {
    return ( 
        <button onClick={() => signIn("facebook")}>
            <Image 
            src={logo}
            alt='Facebook Login'
            width={390} height={90}/>
        </button>
     );
}

export default MetaSignInBtn;