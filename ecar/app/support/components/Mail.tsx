'use client'
export default function Mail({ style, svg }:any) {
    function copyText(entryText: string) {
        navigator.clipboard.writeText(entryText);
    }
    return ( 
        <div id='mail' className='xs:w-full xs:text-center xs:mx-auto md:text-left md:mx-0 md:w-1/4 | xs:py-2 xs:divide-y-reverse xs:divide-y-2 md:divide-x-reverse md:divide-x-2 md:divide-y-0 divide-orange-600'>
            <div className='font-semibold text-orange-600 mb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
                <h2 className={`${style.h2}`}>By Mail</h2>
            </div>
            <div className={`${style.p} | pr-4 | text-slate-900`}>
                For questions about a specific location: <p className='font-semibold underline hover:cursor-pointer' onClick={() => copyText("examplemail@domain.com")}>examplemail@domain.com</p>
                If you have a complaint about our staff: <p className='font-semibold underline hover:cursor-pointer' onClick={() => copyText("examplemail@domain.com")}>examplemail@domain.com</p>
                If you have a complaint about our staff: <p className='font-semibold underline hover:cursor-pointer' onClick={() => copyText("examplemail@domain.com")}>examplemail@domain.com</p>
            </div>
        </div>
     );
}
