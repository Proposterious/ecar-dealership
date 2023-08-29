// MODEL THIS OFF OF: https://www.enterprise.com/en/car-rental-locations/us/tx/austin.html
// Imports
import Link from 'next/link'
import Image from 'next/image'

function Information() {
    return (  
        /* Profile Links */
        <nav className="flex flex-wrap fixed bottom-1 p-5 w-full">
            <div className="divide-y-2 divide-green-400">
                <ul id='footer_social' className="list-none flex flex-wrap space-x-2 inline-block bg-gray-200 text-orange-400 w-full">
                    <li>
                        <Image src='' alt='Github Profile' />
                    </li>
                    <li>
                        <Image src='' alt='Instagram Profile' />
                    </li>
                    <li>
                        <Image src='' alt='LinkedIn Profile' />
                    </li>
                    <li>
                        <Image src='' alt='Youtube Profile' />
                    </li>
                </ul>
                <ul id='footer_notices' className="list-none flex flex-wrap w-full space-x-5 bg-gray-300 text-orange-400">
                    <li><Link href='/'>Terms of Use</Link></li>
                    <li><Link href='/'>Privacy Policy</Link></li>
                    <li><Link href='/'>Cookie Policy</Link></li>
                    <li><Link href='/'>Privacy Choices</Link></li>
                    <li>Copyright Trademark...</li>
                </ul>
            </div>
        </nav>
    );
}

export default Information;