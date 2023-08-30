// Nextjs Imports
import Link from 'next/link'
import Image from 'next/image'
// Main Logo Import
import Logo from '../public/car-dealership-logo.png'
function Navbar() {
    return ( 
        <nav className="list-none flex flex-wrap items-center justify-center space-x-6 text-black h-20 bg-slate-100">
            <li className="border-2">
                <Image src={Logo}
                height={100}
                width={200}
                alt='' />
            </li>
            <li className="semi-bold hover:text-orange-600">
                <Link href='/'>Home</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/about'>About</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/blog'>Blog</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/contact'>Contact</Link>
            </li>
            <li className="hover:text-orange-600">
                <Link href='/support'>Support</Link>
            </li>     
        </nav>
    );
}

export default Navbar;