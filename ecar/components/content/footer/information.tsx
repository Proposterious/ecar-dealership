// Nextjs Imports
import Image from 'next/image'
// Hero Icon Imports
import Popout from '../../../public/svg/popout.svg'
import Check from '../../../public/svg/check.svg'
// Image Imports
import GithubCircle from '../../../public/img/github-mark.png'
import GithubWritten from '../../../public/img/github-written.png'
import Youtube from '../../../public/img/youtube-mark.png'
import LinkedIn from '../../../public/img/linkedin-written.png'
// Link Variables
const yt_link = 'https://www.youtube.com/channel/UCImWneNIF1tbuownEPODS4g';
const github_link = 'https://github.com/Proposterious';
const li_link = 'https://www.linkedin.com/';


function Information() {
    return (  
        /* Profile as */
        <nav className="border-t-2 border-amber-600 bottom-full w-full  divide-y-2 divide-gray-400/60">
            <ul id='footer_social' className="list-none flex flex-wrap justify-center items-center space-x-16 p-3 h-30 bg-slate-100 text-orange-400">
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={yt_link}>
                        <Image src={Youtube}
                        height={70}
                        width={150}
                        alt='Youtube Profile' />
                    </a>
                </li>
                <li className='ml-6'>
                    <a target="_blank" rel="noopener noreferrer" href={github_link}>
                        <Image src={GithubCircle} 
                        height={70}
                        width={70}
                        alt='Github Profile' />
                        <Image src={GithubWritten}
                        height={70}
                        width={70}
                        alt='Github Profile' />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={li_link}>
                        <Image src={LinkedIn}
                        height={70}
                        width={150}
                        alt='aedIn Profile' />
                    </a>
                </li>
            </ul>
            <ul id='footer_notices' className="h-14 list-none flex flex-wrap justify-center items-center space-x-10 bg-gray-300">
                <li className="inline-flex text-orange-600">
                    <a href='/'>Terms of Use</a>
                    <a href='/'><Image src={Popout} alt='' /></a> 
                </li>    
                <li className="inline-flex text-orange-600">
                    <a href='/'>Privacy Policy</a>
                    <a href='/'><Image src={Popout} alt='' /></a> 
                </li>
                <li className="inline-flex text-amber-900">
                    <a href='/'>Cookie Policy</a>
                    <a href='/'><Image src={Popout} alt='' /></a> 
                </li>
                <li className="inline-flex text-blue-600/90">
                    <a href='/'>Privacy Choices</a>
                    <a href='/'><Image src={Check} alt='' /></a> 
                </li>
                <li className="text-gray-400">&copy;2023 Proposterious</li>
            </ul>
        </nav>
    );
}

export default Information;