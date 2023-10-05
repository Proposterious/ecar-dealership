'use client'
export default function Mail({ style, svg }:any) {
    function copyText(entryText: string) {
        navigator.clipboard.writeText(entryText);
    }
    return ( 
        <div id='mail' className='xs:w-full xs:text-center xs:mx-auto md:text-left md:mx-0 md:w-1/4 | xs:py-2 xs:divide-y-reverse xs:divide-y-2 md:divide-x-reverse md:divide-x-2 md:divide-y-0 divide-orange-600'>
            <div className='font-semibold text-orange-600'>
                <div className={`${svg.mail} xs:mx-auto md:mx-0 w-fit mb-2 p-8 bg-orange-600`} />
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
