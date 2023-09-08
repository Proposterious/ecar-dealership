// Nextjs Imports
import Link from 'next/link'
import Image from 'next/image'
// Main Logo Import
import Logo from '../public/car-dealership-logo.png'
// Component Import
import AuthButton from './AuthButton'

function Navbar() {
    return ( 
        <nav className="list-none flex flex-wrap h-28 items-center justify-center space-x-8 text-black bg-slate-100">
            <Image 
            src={Logo}
            height={50}
            width={120}
            alt='' /> 
            <li className='font-bold text-white hover:text-black'>
                <Link href='/' className="border-2 border-black rounded-2xl px-6 py-3 bg-orange-600">
                    Home
                </Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/about'>About</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/service'>Service</Link>
            </li>   
            <li className="hover:text-orange-600">
                <Link href='/employment'>Employment</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/contact'>Contact</Link>
            </li>
            <li className="font-semibold hover:text-orange-600 ">
                <Link href='/support'>Support</Link>
            </li>
            <li className="text-center border-2 rounded-3xl border-black bg-orange-600 px-6 py-3 font-medium text-white">
                <AuthButton />
            </li>
        </nav>
    );
}

export default Navbar;