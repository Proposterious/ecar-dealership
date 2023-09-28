'use client'
// Next imports
import Link from 'next/link';
// Custom imports
import menu from './nav-icon.module.css';

function NavButton() {
    function animate() {
        var styles = ['min-h-screen', 'pb-2', 'border-b-2', 'border-slate-200']

        const container = document.getElementById('container') as HTMLElement;
        const icon = document.getElementById(menu.navIcon) as HTMLElement;
        const content = document.getElementById('content') as HTMLElement;

        

        if (icon.classList.contains(menu.open)) { // checks if already open
            icon?.classList.remove(menu.open) // if open, close
            styles.forEach((style) => container?.classList.remove(style)); // remove styles
            content?.classList.add('hidden') // hide list
            return
        } 

        else {
            icon?.classList.add(menu.open)  // if closed, open
            styles.forEach((style) => container?.classList.add(style)); // add styles
            content?.classList.remove('hidden') // show list
            return 
        }
    }

    return (
        <article className='fixed | n-sm:hidden | py-4 w-full bg-orange-400'>
            <div id='container'>
                <div id={menu.navIcon} className='ml-6' onClick={() => animate()}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul id='content' className='hidden absolute min-h-fit | list-none flex-col | pl-4 text-left child:py-12 child:my-auto | text-2xl text-white font-semibold cursor-pointer'>
                    <li className='font-bold text-white hover:text-black'>
                        <Link href='/' className="border-2 border-black rounded-2xl -ml-4 px-6 py-3 bg-orange-600">
                            Home
                        </Link>
                    </li>
                    <li className="hover:text-black">
                        <Link href='/about'>About</Link>
                    </li>
                    <li className="hover:text-black">
                        <Link href='/service'>Service</Link>
                    </li>   
                    <li className="hover:text-black">
                        <Link href='/employment'>Employment</Link>
                    </li>
                    <li className="hover:text-black">
                        <Link href='/contact'>Contact</Link>
                    </li>
                    <li className="font-semibold hover:text-black ">
                        <Link href='/support'>Support</Link>
                    </li>
                </ul> 
    
            </div>
        </article>
    )
}

export default NavButton;
   