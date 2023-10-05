// Nextjs Imports
import Link from 'next/link';
import Image from 'next/image';
// Main Logo Import
import Logo from '../../../public/shrunk-car-logo.png';
// Component Import
import AuthButton from './_AuthButton';
import NavButton from './_NavButton';
function Navbar() {
    // Toggle Icon onClick

    // lg:space-x-8 md:space-x-4 sm:list-style
     return ( 
        <header>
            <nav className="n-md:flex list-none | overflow-auto overscroll-x-auto | h-28 border-b-2 border-amber-600 | items-center justify-center | n-xs:hidden n-sm:space-x-3 child:n-sm:text-md n-md:space-x-4 n-lg:space-x-6 n-xl:space-x-8 | text-black bg-slate-200">
                <Image 
                src={Logo}
                height={50}
                width={120}
                alt='' /> 
                <li className='font-bold text-white duration-500 hover:text-black'>
                    <Link href='/' className="border-2 border-black rounded-2xl px-6 py-3 bg-orange-600">
                        Home
                    </Link>
                </li>
                <li className="duration-300 hover:text-orange-600">
                    <Link href='/about'>About</Link>
                </li>
                <li className="duration-300 hover:text-orange-600">
                    <Link href='/service'>Service</Link>
                </li>   
                <li className="duration-300 hover:text-orange-600">
                    <Link href='/employment'>Employment</Link>
                </li>
                <li className="font-semibold duration-300 hover:text-orange-600 ">
                    <Link href='/support'>Support</Link>
                </li>
                    <AuthButton />
            </nav>
            <NavButton /> {/* hidden until screen-size 'n-xs' */}
        </header>
    )
}

export default Navbar;