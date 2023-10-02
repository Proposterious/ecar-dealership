function Text({ style, svg }:any) {
    return (
        <div id='number' className='xs:w-full sm:w-1/4 | xs:divide-y-reverse xs:divide-y-1 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600'>
            <div className={`font-semibold text-orange-600`}>
                <div className={`${svg.mail} w-fit mb-2 p-8 bg-orange-600`} />
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