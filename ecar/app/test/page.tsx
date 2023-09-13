import Logo from "@/components/content/image/logo";
import Image from 'next/image'
import car from '../../public/car-logo.png'

function Test() {
    return ( 
        <div className='min-h-screen min-w-screen relative bg-transparent'>
            <div className="mx-auto my-auto w-96 h-24 bg-blue-600">
                <Logo w={null} h={null}/>
            </div>
            <div className="relative w-64 h-20 bg-blue-600">
                <Image src={car} objectFit="fill" alt='none' />
            </div>
        </div>
     );
}

export default Test;