function Text({ style, svg }:any) {
    return (
        <div id='number' className='xs:w-full xs:text-center xs:mx-auto md:text-left md:mx-0 md:w-1/4 | xs:divide-y-reverse xs:divide-y-1 md:divide-x-reverse md:divide-x-2 md:divide-y-0 divide-orange-600'>
            <div className={`font-semibold text-orange-600 mb-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>

                <h2 className={`${style.h2}`}>By Text Message</h2>
            </div>
            <div className={`${style.p} | pr-4 | text-slate-900`}>
                For questions about a specific location: <p className='font-semibold underline'>Text at (40083)</p>
                If you have a complaint about our staff: <p className='font-semibold underline'>Text at (11786)</p>
                Any suggestions to improve our website: <p className='font-semibold underline indent-1'>Text at (13463)</p>
            </div>
        </div>
      );
}

export default Text;