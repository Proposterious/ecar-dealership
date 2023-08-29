import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
    return ( 
        <nav className="list-none flex items-center justify-between flex-wrap p-4 text-white">
            <li>
                <Image 
                src=''
                alt=''/>
            </li>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/about'>About</Link>
            </li>
            <li>
                <Link href='/blog'>Blog</Link>
            </li>
            <li>
                <Link href='/contact'>Contact</Link>
            </li>
            <li>
                <Link href='/support'>Support</Link>
            </li>     
        </nav>
    );
}

export default Navbar;