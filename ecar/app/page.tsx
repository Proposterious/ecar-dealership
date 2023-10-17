import Link from 'next/link'
import Image from 'next/image'

import royce from '../public/img/car-models/2024-rolls-royce-phantom.jpg'
import porsche from '../public/img/car-models/2017-porsche-911-turbo-s.jpg'
import Audience from './_home/Audience'

export default function Home() {
  return (
    <main className='overflow-hidden divide-y-reverse divide-y-2 divide-orange-600'>
      <article id="opener" className="w-full flex bg-cover bg-center bg-[url('../public/img/red-luxury-sedan-road.jpg')] | n-xs:py-24 lg:py-60">
        <section className='mx-auto w-full py-16 bg-black bg-opacity-70'>
          <h1 className='n-xs:text-4xl n-md:text-6xl text-center font-semibold text-orange-500 mb-6'>
            Low on Cash, But Need A Ride? 
            <br></br>
            Rely On Us @ eCar Dealer
          </h1>
          <p className="font-semibold text-center n-xs:text-xl md:text-2xl text-white">
            Receive A Sparkling New Car
            <br></br>
            At A Low Price With No Hidden Fees!
          </p>
        </section>
      </article>
      <article id="points" className='min-h-fit max-h-fit w-full | bg-slate-100'>
        <section className="p-16 | child:pb-6 child:n-xs:border-b-2 child:n-xs:border-orange-600 child:n-md:border-b-0 child:n-md:border-r-2 child:n-md:pl-8 | n-xs:space-y-4 n-md:space-y-0 | flex n-xs:flex-col n-md:flex-row">
          <div className='n-md:w-1/3'>
            <h1 className='n-xs:text-2xl n-md:text-3xl n-lg:text-4xl leading-tight font-bold text-orange-500 mb-4'>
              Your Job <br /> is Your Credit
            </h1>
            <p className='n-md:w-3/4 n-lg:text-lg text-slate-600'>
              At [Insert Dealer] we feel every [Insert City] car buyer deserves a <em>second chance</em>, so we offer <b>in-house financing</b> (second-chance financing) to ensure hard working people like you can get approved for a better car today, and at a lower price than other car dealers!
            </p>
          </div>
          <div className='n-md:w-1/3'>
            <h1 className='n-xs:text-2xl n-md:text-3xl n-lg:text-4xl leading-tight font-bold text-orange-500 mb-4'>
                No Model<br /> Left Behind
              </h1>
            <p className='n-md:w-3/4 n-lg:text-lg text-slate-600'>
              Most of our auto inventory spans between [0] and [2023], and all of them are available for sale. That means you can drive away in <i>your</i> style, whether it be <b>new and simple</b> or <b><em>historic and flashy</em></b>. No other dealership in [Insert City] offers the level of quality vehicles as we do. 
            </p>
          </div>
          <div className='n-md:w-1/3'>
            <h1 className='n-xs:text-2xl n-md:text-3xl n-lg:text-4xl leading-tight font-bold text-orange-500 mb-4'>
                Our Services <br/> are Open 24/7
              </h1>
            <p className='n-md:w-3/4 n-lg:text-lg text-slate-600'>
              This business depends on you, the consumer. As such we also understand the importance of being able to find a car during all times of the day. This is why our dealership stays open <b>24/7</b>, so don&#39;t hesitate to stop by at <b>your own pace</b>. Our goal is to make buying easy.
            </p>
          </div>
        </section>
      </article>
      <article id="storage" className="min-h-fit max-h-fit w-full n-xs:flex n-xs:flex-col n-md:flex-row | n-xs:min-w-full n-md:min-w-0 | n-xs:gap-12 n-md:gap-0 | bg-orange-500 py-12 n-md:px-12 border-collapse">
        <section className="n-xs:text-center n-md:text-left | n-xs:w-full n-md:w-1/2">
          <h1 className="n-xs:mt-4 n-md:mt-12 font-extrabold n-xs:text-2xl n-md:text-3xl n-lg:text-4xl text-slate-100 mb-3">
            Our Storage is <span className='tracking-wider bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent'>EXPANSIVE</span>
          </h1>
            <p className="n-xs:mx-auto n-md:mx-0 n-lg:text-lg w-4/5 border-b-2 border-white text-slate-100 pb-4 mb-8">
                We work with over <i>[insert number]</i> car manufacturers worldwide and closely with the <i>[hypothetically government]</i> to make sure you can drive in any of our cars without having to worry about conflicts with the city&#39;s jurisdiction. No matter what state drivers&#39; license you possess or which car you choose to take home, we guarantee your safety!
              </p>
            <div>
              <Link href="/service" className='n-md:text-lg font-semibold text-black rounded-2xl w-fit h-fit px-5 py-3 bg-sky-300 hover:bg-sky-400/80'>
                View Vehicles
              </Link>
            </div>
        </section>
        {/* Responsive Images */}
        <section className="carImages | n-xs:mx-auto child:n-md:mx-0 | child:n-xs:py-4 child:n-md:py-0 | max-h-full max-w-xl">
          <div className='carImage1'><Image className='n-xs:max-w-1/4 n-md:max-w-sm rounded-lg shadow-lg shadow-slate-300' src={royce} objectFit='contain' alt='' /></div>
          <div className='carImage2'><Image className='n-xs:max-w-1/2 n-md:max-w-sm rounded-lg shadow-lg shadow-slate-800' src={porsche} objectFit='contain' alt='' /></div>  
        </section>
      </article>
      <Audience />
      
    </main>
  )
}
