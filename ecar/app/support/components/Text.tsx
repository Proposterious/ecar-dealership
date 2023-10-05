function Text({ style, svg }:any) {
    return (
        <div id='number' className='xs:w-full xs:text-center xs:mx-auto md:text-left md:mx-0 md:w-1/4 | xs:divide-y-reverse xs:divide-y-1 md:divide-x-reverse md:divide-x-2 md:divide-y-0 divide-orange-600'>
            <div className={`font-semibold text-orange-600`}>
                <div className={`${svg.message} xs:mx-auto md:mx-0 w-fit mb-2 p-8 bg-orange-600`} />
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