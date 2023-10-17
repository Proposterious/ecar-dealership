import Image from "next/image";
import Link from "next/link";

import manOutside from '@/public/img/stock-photos/man-happy-buy-car.jpg';
import manInside from '@/public/img/stock-photos/happy-man-in-car-thumbs-up.jpg';
import womanInside from '@/public/img/stock-photos/girl-in-car.jpg';

function Audience() {
    return (
        <article id="audience" className="min-h-fit max-h-fit w-full n-xs:flex n-xs:flex-col n-md:flex-row | n-xs:min-w-full n-md:min-w-0 | n-xs:gap-6 n-md:gap-0 | bg-slate-200 n-xs:py-6 n-md:py-6 n-md:px-12 border-collapse">
            <section className="n-xs:mt-4 n-md:my-auto n-xs:text-center child:n-xs:mx-auto child:n-xs:px-6 | n-md:text-left child:n-md:pl-0 child:n-md:pr-4 | n-xs:w-full n-md:w-1/2 n-xl:pr-32">
                <h1 className="font-extrabold n-xs:text-2xl n-md:text-3xl n-lg:text-4xl text-orange-600 mb-3">
                    Designed for People Like You!
                </h1>
                <p className="border-b-2 border-orange-600 n-lg:text-lg text-slate-800 pb-4 mt-4 mb-8">
                    Hard workers should not have to worry about whether or not they <i>can</i> pay for a car. Nor should anybody have to make sacrifices just to make owning one affordable, and that is where [insert company name] comes in. We make owning a car affordable and enjoyable for <span className='font-semibold'>everybody</span>.
                </p>
                <div>
                    <Link href="/service" className='n-md:text-lg font-semibold text-slate-100 rounded-2xl w-fit h-fit px-5 py-3 bg-orange-500 hover:bg-orange-700/90'>
                        View Vehicles
                    </Link>
                </div>
            </section>
            <section className="customerImages | child:child:rounded-lg | n-xs:my-12 n-xs:mx-auto n-md:mt-8 n-xl:-ml-12 child:n-md:mx-0 | child:-my-8 | max-h-full max-w-xl">
                <div className="customerImage1">
                    <Image className='n-xs:max-w-1/4 n-md:max-w-xs n-lg:max-w-md rounded-lg shadow-md shadow-orange-400' src={manOutside} objectFit='contain' 
                    placeholder="blur" alt='' />
                </div>
                <div className="customerImage2">
                    <Image className='n-xs:max-w-1/4 n-md:max-w-xs n-lg:max-w-2xl | -scale-x-100 | rounded-lg shadow-md shadow-orange-400' src={womanInside} objectFit='contain' alt='' 
                    placeholder="blur"/>
                </div>
                <div className="customerImage3">
                    <Image className='n-xs:max-w-1/4 n-md:max-w-xs n-lg:max-w-md rounded-lg shadow-md shadow-orange-400' src={manInside} objectFit='contain'
                    placeholder="blur" alt='' />
                </div>
            </section>
            
      </article>
      );
}

export default Audience;