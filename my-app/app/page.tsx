// Imports
import Link from 'next/link'
import Image from 'next/image'
// Defining Vars
const support = './support/'

export default function Home() {
  return (
    <main className='overflow-hidden divide-y-reverse divide-y-2 divide-orange-600'>
      <article className=" w-full flex bg-cover bg-center bg-[url('../public/img/red-luxury-sedan-road.jpg')] py-64">
        <section className='mx-auto w-full py-16 bg-black bg-opacity-70'>
          <h1 className='text-6xl text-center font-semibold text-orange-500 mb-6'>
            Low on Cash, But Need A Ride? 
            <br></br>
            Rely On Us @ eCar Dealer
          </h1>
          <p className="font-semibold text-center text-2xl text-white">
            Receive A Sparkling New Car
            <br></br>
            At A Low Price With No Hidden Fees!
          </p>
        </section>
      </article>
      <article className='w-full bg-slate-100'>
        <section className="px-24 pt-12 pb-20 flex flex-row">
          <div className='w-1/3'>
            <h1 className='text-4xl leading-tight font-bold text-orange-500 mb-6'>
              Your Job <br /> is Your Credit
            </h1>
            <p className='w-3/4 text-slate-600'>
            At [Insert Dealer] we feel every [Insert City] car buyer deserves a <em>second chance</em>, so we offer <b>in-house financing</b> (second-chance financing) to ensure hard working people like you can get approved for a better car today, and at a lower price than other car dealers!
            </p>
          </div>
          <div className='w-1/3'>
          <h1 className='text-4xl leading-tight font-bold text-orange-500 mb-6'>
              No Model<br /> Left Behind
            </h1>
          <p className='w-3/4 text-slate-600'>
          Most of our auto inventory spans between [0] and [2023], and all of them are available for sale. That means you can drive away in <i>your</i> style, whether it be <b>new and simple</b> or <b><em>historic and flashy</em></b>. No other dealership in [Insert City] offers the level of quality vehicles as we do. 
          </p>
          </div>
          <div className='w-1/3'>
          <h1 className='text-4xl leading-tight font-bold text-orange-500 mb-6'>
              Our Services <br/> are Open 24/7
            </h1>
          <p className='w-3/4 text-slate-600'>
            This business depends on you, the consumer. As such we also understand the importance of being able to find a car during all times of the day. This is why our dealership stays open <b>24/7</b>, so don't hesitate to stop by at <b>your own pace</b>. Our goal is to make buying easy.
          </p>
          </div>
        </section>
      </article>
      <article className="h-96 w-full flex bg-orange-500 px-24 py-12">
        <section className="w-1/2">
          <h1 className="font-extrabold text-3xl text-slate-100 mb-3">
            Our Storage is <span className='tracking-wider px-2 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent'>EXPANSIVE</span>
          </h1>
          <p className="w-4/5 text-slate-100">
            We work with over <i>[insert number]</i> car manufacturers worldwide and closely with the <i>[hypothetically government]</i> to make sure you can drive in any of our cars without having to worry about conflicts with the city's jurisdiction. No matter what state drivers' license you possess or which car you choose to take home, we guarantee your safety!
          </p>
          <div className='cursor-default divide-x-2 divide-black'>
            ________________________
          </div>
          <Link href={support}
          className='font-semibold text-black border-none border-2 rounded-2xl px-5 py-3 bg-sky-300'>
            View Vehicles
          </Link>
        </section>
        <section className="w-1/2">
          insert image element
        </section>
      </article>
      <article className="h-96 w-full flex bg-slate-100 p-24">
        <section className="w-1/2">
          <h1 className="font-extrabold text-3xl text-orange-500 mb-3">
            Hello
          </h1>
          <p className="w-3/4 text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, commodi aliquid mollitia laboriosam sint sapiente eum deserunt ex ea, consectetur aut repudiandae sit ullam, reprehenderit quibusdam corrupti tenetur quae enim similique? Ad sed consequuntur quibusdam tempore, eos rerum est nisi nostrum. Obcaecati rem incidunt quia, quaerat nam assumenda perferendis maxime quasi, dignissimos numquam inventore sint aut exercitationem culpa adipisci. Non maiores repellat dolor in dolorem omnis cumque vero asperiores?
          </p>
        </section>
        <section className="w-1/2">
          insert image element
        </section>
      </article>
    </main>
  )
}
