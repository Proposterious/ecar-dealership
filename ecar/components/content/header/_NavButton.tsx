'use client'
// Next imports
import Image from 'next/image';
import Link from 'next/link';
// Custom imports
import menu from './nav-icon.module.css'; // style
import Logo from '../../../public/shrunk-car-logo.png'; // logo
import Session from './_Session';

function NavButton() {
    
    function animate() {
        // Get HTMLElements from Document
        const container = document.getElementById('container') as HTMLElement;
        const icon = document.getElementById(menu.navIcon) as HTMLElement;
        const block = document.getElementById('block') as HTMLElement;
        const content = document.getElementById('content') as HTMLElement;

        // Close navigation
        if (icon.classList.contains(menu.open)) { // checks if already open
            icon?.classList.remove(menu.open) // if open, close
            container?.classList.remove('min-h-screen'); // remove styles
            container?.classList.remove('w-screen'); // remove styles
            container?.classList.remove('bg-orange-600'); // remove
            block?.classList.remove('bg-slate-100'); // remove
            content?.classList.add('hidden') // hide list
            return
        } 
        // Open navigation
        else {
            icon?.classList.add(menu.open)  // if closed, open
            container?.classList.add('min-h-screen'); // add styles
            container?.classList.add('w-screen'); // add styles
            container?.classList.add('bg-orange-600'); // add
            block?.classList.add('bg-slate-100'); // add
            content?.classList.remove('hidden') // show list
            return 
        }
    }

    return (
        <nav id="smallNav" className='min-w-full fixed inline-block z-50'>
            <article className='float-left z-10 | n-md:hidden'>
                <div id='container'>
                {/* Icon Top-Right */}
                    <div id='block' className='flex -m-2 min-w-fit p-5 pr-3 bg-slate-100/60'>
                        <div id={menu.navIcon} onClick={() => animate()}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                {/* Children onClick */}
                    <div id='content' className='hidden resize min-h-screen h-full | flex flex-col items-center justify-evenly pb-12 | text-xl text-white font-semibold cursor-pointer'>
                        <div className='text-white'>
                            <Link onClick={() => animate()} href='/' className="border-2 border-black rounded-2xl px-6 py-3 bg-orange-600">
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link onClick={() => animate()} href='/about'>
                                About
                            </Link>
                        </div>
                        <div>
                            <Link onClick={() => animate()} href='/service'>
                                Service
                            </Link>
                        </div>   
                        <div>
                            <Link onClick={() => animate()} href='/employment'>
                                Employment
                            </Link>
                        </div>
                        <div>
                            <Link onClick={() => animate()} href='/support'>
                                Support
                            </Link>
                        </div>
                        <Session />
                    </div> 
        
                </div>
            </article>
            <article id="permLogo" className='n-md:hidden | absolute right-0 pt-2 pr-1 z-50'>
                <Image 
                src={Logo}
                style={{maxWidth: '100px'}}
                objectFit='fit'
                alt='' /> 
            </article>
        </nav>
    )
}

export default NavButton;
   