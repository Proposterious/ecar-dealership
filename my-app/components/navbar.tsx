// Nextjs Imports
import Link from 'next/link'
import Image from 'next/image'
// Main Logo Import
import Logo from '../public/car-dealership-logo.png'

function Navbar() {
    return ( 
        <nav className="list-none flex flex-wrap items-center justify-center space-x-6  text-black h-20 bg-slate-100">
            <Image 
            src={Logo}
            height={50}
            width={120}
            alt='' />
            <li className="border-2 ring-2 ring-gray-600 rounded-full px-6 py-2 bg-orange-400 font-bold hover:text-orange-600">
                <Link href='/'>Home</Link>
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
            <li className="font-semibold hover:text-orange-600">
                <Link href='/support'>Support</Link>
            </li> 
        </nav>
    );
}

export default Navbar;