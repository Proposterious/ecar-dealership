import Image from 'next/image'; // next image
// Import images
import svg from '../styles/svg.module.css';
import service from '@/public/img/stock-photos/seamless-customer-experience.webp';
import receptionist from '@/public/img/stock-photos/happy-receptionist.png';
// Custom components
import Mail from './components/Mail';
import Call from './components/Call';
import Text from './components/Text';

export function Contact() {
    const style = {
        h2: 'xs:text-lg sm:text-xl md:text-3xl pb-2.5',
        p: 'n-xs:pb-6 n-md:text-md n-xl:text-lg mb-4',
        img: 'mx-auto | sm:w-3/4 xs:py-4 md:p-0 lg:min-w-fit'
    };

    return (
        <section id='contact' className='overscroll-auto overflow-x-scroll | bg-orange-600/95'>
            {/* Introduction */}
            <article className='max-w-full | divide-y-2 divide-slate-100'>
                <div className='xs:my-2.5 md:my-0 items-center justify-evenly | grid xs:grid-flow-row md:grid-flow-col'>

                    <div className='text-center | transform bg-slate-100/70 | py-8 px-4'>
                        <h1 id='title' className='pb-3 xs:text-2xl md:text-3xl lg:text-5xl | text-orange-600 font-bold indent-2'>
                            Have More Questions?
                        </h1>
                        <p id='subtitle' className='text-slate-800 sm:text-lg lg:text-2xl font-semibold | underline underline-offset-2'>
                            eCar Dealership is Available 24/7 <br /> Talk With our Staff by Email, Call, and SMS
                        </p>
                    </div>

                    <div className='mx-auto | sm:w-full xs:pb-4 sm:pb-0 lg:min-w-fit'>
                        <Image src={receptionist} alt='' className='-scale-x-100' placeholder="blur" objectFit='contain' />
                    </div>
                    <div className='mx-auto | sm:w-full xs:pb-4 sm:pb-0 lg:min-w-fit'>
                        <Image src={service} alt='' placeholder="blur" objectFit='contain' />
                    </div>

                </div>
            </article>
            {/* Contacts */}
            <article id="contacts" className='justify-evenly | py-5 my-auto xs:px-4 sm:px-2 md:px-0 | bg-slate-200 | flex flex-col xs:flex-col md:flex-row'>
                <Mail style={style} svg={svg}/>
                <Call style={style} svg={svg}/>
                <Text style={style} svg={svg}/>
            </article>
        </section>
    );
}
