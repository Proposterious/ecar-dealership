'use client'
// Next imports
import Link from 'next/link';
// Custom imports
import menu from './nav-icon.module.css';
import AuthButton from './_AuthButton';

function NavButton() {
    function animate() {
        // Get HTMLElements from Document
        const container = document.getElementById('container') as HTMLElement;
        const icon = document.getElementById(menu.navIcon) as HTMLElement;
        const content = document.getElementById('content') as HTMLElement;

        
        if (icon.classList.contains(menu.open)) { // checks if already open
            icon?.classList.remove(menu.open) // if open, close
            container?.classList.remove('min-h-screen'); // remove styles
            content?.classList.add('hidden') // hide list
            return
        } 

        else {
            icon?.classList.add(menu.open)  // if closed, open
            container?.classList.add('min-h-screen'); // add styles
            content?.classList.remove('hidden') // show list
            return 
        }
    }

    return (
        <article className='fixed float-left z-10 overscroll-none | n-md:hidden | bg-white pt-1'>
            <div id='container'>
                <div id='block' className='flex pb-1 border-b-4 border-white'>
                    <div id={menu.navIcon} className='m-6' onClick={() => animate()}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className ='list-none py-2'></ul>
                </div>

                <div id='content' className='hidden resize | flex flex-col flex-shrink gap-y-10 | bg-black mt-16 pl-8 text-left | text-2xl text-white font-semibold cursor-pointer'>
                    <span className='font-bold text-white hover:text-black'>
                        <Link href='/' className="border-2 border-black rounded-2xl -ml-4 px-6 py-3 bg-orange-600">
                            Home
                        </Link>
                    </span>
                    <span className="hover:text-black">
                        <Link href='/about'>About</Link>
                    </span>
                    <span className="hover:text-black">
                        <Link href='/service'>Service</Link>
                    </span>   
                    <span className="hover:text-black">
                        <Link href='/employment'>Employment</Link>
                    </span>
                    <span className="hover:text-black">
                        <Link href='/contact'>Contact</Link>
                    </span>
                    <span className="font-semibold hover:text-black ">
                        <Link href='/support'>Support</Link>
                    </span>
                    <span className="font-semibold hover:text-black">
                    <Link href='/dashboard'>Dashboard</Link>
                    </span>
                </div> 
    
            </div>
        </article>
    )
}

export default NavButton;
   