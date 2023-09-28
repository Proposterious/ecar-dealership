'use server'
import Image from 'next/image';

import svg from '../styles/svg.module.scss';
import service from '@/public/img/stock-photos/seamless-customer-experience.webp';
import receptionist from '@/public/img/stock-photos/happy-receptionist.png';


function Contact() {
    const style = {
        h2: 'xs:text-lg sm:text-xl md:text-3xl',
        p: 'xs:text-sm sm:text-md md:text-lg',

    }
    return ( 
        <section id='contact' className='bg-orange-600/95'>
            {/* Introduction */}
            <article className='max-w-full | divide-y-2 divide-slate-100'>
                <div className='items-center justify-evenly | grid xs:grid-flow-row lg:grid-flow-col'>

                    <div className='text-center | transform bg-slate-100/70 | py-8 px-4'>
                        <h1 id='title' className='pb-3 xs:text-2xl md:text-3xl lg:text-5xl | text-orange-600 font-bold indent-2'>
                        Have More Questions?
                        </h1>
                        <p id='subtitle' className='text-slate-800 sm:text-lg lg:text-2xl font-semibold | underline underline-offset-2'>
                        eCar Dealership is Available 24/7 <br/> Talk With our Staff by Email, Call, and SMS
                        </p>
                    </div> 

                    <div className='mx-auto xs:w-full | xs:py-4 sm:p-0 md:min-w-fit'>
                        <Image src={receptionist} alt='' className='-scale-x-100' objectFit='fill' />
                    </div> 
                    <div className='mx-auto xs:w-full | xs:pb-4 sm:p-0 md:min-w-fit'>
                        <Image src={service} alt='' objectFit='fill' />   
                    </div>
                    
                </div>
            </article>
            {/* Contacts */}
            <article className='items-center justify-around relative | bg-slate-200 | flex flex-col xs:flex-col sm:flex-row'>
                <div id='mail' className='xs:w-full sm:w-1/4 | xs:py-2 xs:divide-y-reverse xs:divide-y-2 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600'>
                    <div className='font-semibold text-orange-600'>
                        <div className={`${svg.mail} w-fit p-8 bg-orange-600`}/>
                        <h2 className={`${style.h2}`}>By Mail</h2>
                    </div>
                    <p className={`${style.p} | text-slate-900`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis mollitia quia itaque veniam, ex provident! In repudiandae est eveniet iure.
                    </p>
                </div>
                <div id='call' className='xs:w-full sm:w-1/4 | xs:py-2 | xs:divide-y-reverse xs:divide-y-2 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600 '>
                    <div className='font-semibold text-orange-600'>
                        <div className={`${svg.mail} w-fit p-8 bg-orange-600`}/>
                        <h2 className={`${style.h2}`}>By Call</h2>
                    </div>
                    <p className={`${style.p} | text-slate-900`}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ea autem repellendus blanditiis. Exercitationem accusamus distinctio ullam quia voluptatibus necessitatibus?
                    </p>
                </div>
                <div id='number' className='xs:w-full sm:w-1/4 | xs:divide-y-reverse xs:divide-y-1 sm:divide-x-reverse sm:divide-x-2 sm:divide-y-0 divide-orange-600'>
                    <div className={`font-semibold text-orange-600`}>
                        <div className={`${svg.mail} w-fit p-8 bg-orange-600`}/>
                        <h2 className={`${style.h2}`}>By Text Message</h2>
                    </div>
                    <p className={`${style.p} | text-slate-900`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga maxime delectus distinctio quaerat sapiente beatae veniam corporis enim obcaecati!
                    </p>
                </div>
            </article>
        </section>
     );
}

export default Contact;