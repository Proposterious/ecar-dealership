'use client'
export default function Mail({ style, svg }:any) {
    function copyText(entryText: string) {
        navigator.clipboard.writeText(entryText);
    }
    return ( 
        <div id='mail' className='xs:w-full sm:w-1/4 | xs:py-2 xs:divide-y-reverse xs:divide-y-2 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600'>
            <div className='font-semibold text-orange-600'>
                <div className={`${svg.mail} w-fit mb-2 p-8 bg-orange-600`} />
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
