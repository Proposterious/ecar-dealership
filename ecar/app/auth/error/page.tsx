import Link from 'next/link'

function Error() {
    return ( 
        <section className='h-full w-full py-12 bg-orange-300'>
            <div className='flex min-h-full flex-1 flex-col w-1/3 mx-auto justify-center rounded-md ease-linear duration-300 shadow-xl shadow-amber-600 py-8 bg-slate-200'>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight underline underline-offset-2 text-orange-500">
                    Error 404 | Page Not Found
                </h2>
                <div className="justify-center text-center mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className='text-orange-600 mb-5'>
                       - Contact Us if the Error Persists {' '}
                        <Link href='/support' className='underline font-semibold duration-75 hover:text-indigo-500'>
                            [ Support ]
                        </Link> - 
                        <br /><br /> Otherwise, the Site is Undergoing Maintenance<br />
                        <Link href='/support' className='underline font-bold duration-75 hover:text-indigo-500'>
                            [ insert email name ]
                        </Link>
                     </p>
                     <Link href='/'>
                        <button className='rounded-md px-3 py-1 bg-orange-600 text-white font-bold hover:text-slate-200/80' >
                            Return to Home
                        </button>
                    </Link>
                </div>
            </div>
        </section>
     );
}

export default Error;