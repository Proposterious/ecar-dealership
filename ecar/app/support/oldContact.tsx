'use client'
import Image from 'next/image';
import svg from '../styles/svg.module.scss';
import service from '@/public/img/stock-photos/seamless-customer-experience.webp';
import receptionist from '@/public/img/stock-photos/happy-receptionist.png';

export function Contact() {
    const style = {
        h2: 'xs:text-lg sm:text-xl md:text-3xl pb-2.5',
        p: 'n-xs:text-sm n-xs:pb-6 n-md:text-md n-xl:text-lg mb-4',
        img: 'mx-auto | sm:w-3/4 xs:py-4 md:p-0 lg:min-w-fit'
    };

    function copyText(entryText: string) {
        navigator.clipboard.writeText(entryText);
    }
    
    return (
        <section id='contact' className='overscroll-auto overflow-x-scroll | bg-orange-600/95'>
            {/* Introduction */}
            <article className='max-w-full | divide-y-2 divide-slate-100'>
                <div className='items-center justify-evenly | grid xs:grid-flow-row lg:grid-flow-col'>

                    <div className='text-center | transform bg-slate-100/70 | py-8 px-4'>
                        <h1 id='title' className='pb-3 xs:text-2xl md:text-3xl lg:text-5xl | text-orange-600 font-bold indent-2'>
                            Have More Questions?
                        </h1>
                        <p id='subtitle' className='text-slate-800 sm:text-lg lg:text-2xl font-semibold | underline underline-offset-2'>
                            eCar Dealership is Available 24/7 <br /> Talk With our Staff by Email, Call, and SMS
                        </p>
                    </div>

                    <div className='mx-auto | sm:w-3/4 xs:py-4 sm:p-0 lg:min-w-fit'>
                        <Image src={receptionist} alt='' className='-scale-x-100' objectFit='contain' />
                    </div>
                    <div className='mx-auto | sm:w-3/4 xs:pb-4 sm:p-0 lg:min-w-fit'>
                        <Image src={service} alt='' objectFit='contain' />
                    </div>

                </div>
            </article>
            {/* Contacts */}
            <article className='py-4 xs:px-4 sm:px-2 justify-around relative | bg-slate-200 | flex flex-col xs:flex-col sm:flex-row'>
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
                <div id='call' className='xs:w-full sm:w-1/4 | xs:py-2 | xs:divide-y-reverse xs:divide-y-2 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600 '>
                    <div className='font-semibold text-orange-600'>
                        <div className={`${svg.mail} w-fit mb-2 p-8 bg-orange-600`} />
                        <h2 className={`${style.h2}`}>By Call</h2>
                    </div>
                    <div className={`${style.p} | pr-4 | text-slate-900`}>
                        For questions about a specific location: <p className='font-semibold underline'>Call (720-1234-567)</p>
                        If you have a complaint about our staff: <p className='font-semibold underline'>Call (346-1234-567)</p>
                        Any suggestions or compliments about a location: <p className='font-semibold underline'>Call (832-1234-567)</p>
                    </div>
                </div>
                <div id='number' className='xs:w-full sm:w-1/4 | xs:divide-y-reverse xs:divide-y-1 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600'>
                    <div className={`font-semibold text-orange-600`}>
                        <div className={`${svg.mail} w-fit mb-2 p-8 bg-orange-600`} />
                        <h2 className={`${style.h2}`}>By Text Message</h2>
                    </div>
                    <div className={`${style.p} | pr-4 | text-slate-900`}>
                        For questions about a specific location: <p className='font-semibold underline'>Text at (40083)</p>
                        If you have a complaint about our staff: <p className='font-semibold underline'>Text at (11786)</p>
                        Any suggestions or compliments about a location: <p className='font-semibold underline indent-1'>Text at (13463)</p>
                    </div>
                </div>
            </article>
        </section>
    );
}
