import Link from 'next/link';
import Image from 'next/image';
// Main Logo Import
import Logo from '../../../public/shrunk-car-logo.png';
// Component Import
import AuthButton from './_AuthButton';
import NavButton from './_NavButton';

export default function Navbar() {
     return ( 
        <header>
            <nav className="n-md:flex list-none | overflow-auto overscroll-x-auto | h-28 border-b-2 border-amber-600 | items-center justify-center | n-xs:hidden n-sm:space-x-2 child:n-sm:text-xs child:n-md:text-base n-md:space-x-4 n-lg:space-x-6 n-xl:space-x-8 | text-black bg-slate-200">
                <li className="shrink-0 n-sm:mx-auto n-md:mx-0 n-sm:w-16 n-md:w-24 n-lg:w-32">
                    <Image 
                    src={Logo}
                    width={120}
                    alt=''
                    className="object-contain object-center" /> 
                </li>
                
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
