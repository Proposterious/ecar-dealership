import Image from 'next/image'

export default function Home() {
  return (
    <main className='overflow-auto divide-y-reverse divide-y-2 divide-orange-600'>
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
      <article className="h-96 w-full flex bg-inherit p-24">
        <section>
          <img src='' alt=''>

          </img>
        </section>
        <section className="w-1/2">
          <h1 className="font-bold text-3xl text-orange-600/80 mb-3 ">
            Title
          </h1>
          <p className="font-medium text-slate-500 line-clamp-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, rerum praesentium? Error molestias magnam itaque enim sit repudiandae voluptatum inventore sint qui aliquid repellat natus vitae facere aspernatur quisquam, expedita possimus hic magni amet provident. Suscipit tempore sint qui harum aperiam nihil quaerat facere nam vel nesciunt ducimus vitae, necessitatibus tenetur, accusantium, voluptatem consectetur iure. Vel fugit accusamus maiores, odit officiis numquam qui accusantium itaque asperiores consequatur fuga iusto error eaque vero nobis facere illum exercitationem. Corporis numquam at deleniti nobis officiis veniam voluptas modi minus fugiat? 
          </p>
        </section>
      </article>
      <article className="h-96 w-full flex bg-slate-100 p-24">
        <section className="w-1/2">
          <img src='' alt=''>

          </img>
        </section>
        <section className="w-1/2">
          <h1 className="font-bold text-3xl text-orange-600/80 mb-3">
            Hello
          </h1>
          <p className="font-medium text-slate-500 line-clamp-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, commodi aliquid mollitia laboriosam sint sapiente eum deserunt ex ea, consectetur aut repudiandae sit ullam, reprehenderit quibusdam corrupti tenetur quae enim similique? Ad sed consequuntur quibusdam tempore, eos rerum est nisi nostrum. Obcaecati rem incidunt quia, quaerat nam assumenda perferendis maxime quasi, dignissimos numquam inventore sint aut exercitationem culpa adipisci. Non maiores repellat dolor in dolorem omnis cumque vero asperiores? Provident dolorem alias perspiciatis a dolor consequatur consectetur nam labore voluptatem molestiae voluptates et accusantium, dolorum minima debitis earum commodi tempora ratione totam aliquid assumenda architecto aperiam? Voluptas molestias ad minus! Doloribus, quasi. Quas quae magnam necessitatibus facilis enim voluptate pariatur eaque itaque impedit minima illo doloribus quia nihil unde, molestiae maiores! Natus, quae perferendis soluta est asperiores consectetur possimus exercitationem delectus quo ea blanditiis tempora omnis rem nemo quidem ex voluptatibus totam libero nobis saepe unde. Saepe ipsam ipsum illum perferendis nostrum quisquam voluptates aliquid, in modi ducimus, itaque placeat eum esse. Quod esse reiciendis cupiditate consequuntur 
          </p>
        </section>
      </article>
      <section className='w-full'>
        <article className='h-96 px-32 justify-between items-center flex flex-row '>
          <div>
            <h1>Box 1</h1>
          </div>
          <div>
            <h1>Box 2</h1>
          </div>
          <div>
            <h1>Box 3</h1>
          </div>
          <div>
            <h1>Box 4</h1>
          </div>
        </article>
      </section>
    </main>
  )
}
