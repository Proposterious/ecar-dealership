"use client"
import Link from 'next/link';
import Image from 'next/image';
import Popout from '@/public/svg/popout.svg';
import Loader from '../loading';
import { useSession } from 'next-auth/react';

function redirectDashboard() {
    const { data: session, status } = useSession();

    if (status == "loading") {
        return <Loader />
    }
    const placeholderName = session?.user?.name != undefined ? session.user?.name : "No Username Set";

    const placeholderFullName = session?.user?.fullName != undefined ? session.user?.fullName : "Not Currently Set";

    const placeholderNumber = session?.user?.phoneNumber != undefined ? session.user?.phoneNumber : "Not Currently Set";

    const placeholderEmail = session?.user?.email != undefined ? session.user?.email : "Not Currently Set";

    return ( 
        <div className=''>
            <h2 className='underline decoration-wavy | font-semibold text-lg text-orange-600'>
                Welcome to Your Dashboard, {' '}
                <span className="decoration-inherit underline-offset-1 ">
                { session?.user?.fullName && placeholderFullName}
                { !session?.user?.fullName && placeholderEmail }!
                </span>
            </h2>

            <div id="dashboard-differ" className="child:mx-auto grid grid-flow-row grid-cols-2 space-x-8">
                <section className="bg-slate-100 m-8 mt-3 p-6">
                    <h3 className="underline text-lg text-slate-800 font-semibold">
                        Dashboard
                    </h3>

                    <div className="p-2 mt-6 bg-orange-300 | font-semibold text-sky-800">
                        This page allows you to view or change your account's settings which includes but is not limited to &hellip;

                        <ul className="list-inside font-medium mb-2">
                            <ol>- Your Username | { placeholderName }</ol>
                            <ol>- Your Full Name | { placeholderFullName }</ol>
                            <ol>- Your Email | { placeholderEmail }</ol>
                            <ol>- Your Phone # | { placeholderNumber  }</ol>
                        </ul>
                        The only people who can view your account settings is yourself and our staff at your direct request. {' '}
                        
                        <Link href="/dashboard">
                            <span className="text-slate-700 font-normal inline-flex"> 
                                &#40;View permissions
                                <Image src={Popout} alt='' />&#41;
                            </span>
                        </Link>
                    </div>
                    
                    <Link href='/dashboard/settings'>
                        <button className="py-2 px-3 mt-8 text-white bg-orange-600 rounded-lg font-extrabold">
                            View Settings
                        </button>
                    </Link>
                </section>

                <section className="w-full bg-slate-100 m-8 mt-3 p-6">
                    <h3 className="underline text-lg text-slate-800 font-semibold">
                        Saved Vehicles
                    </h3>

                    <div className="p-2 mt-6 bg-orange-300 | font-semibold text-sky-800">
                    This page allows you to view your 'loved' &#40;saved&#41; vehicles from our 'Service' page. You may delete, add notes to, or acquire more information about a specific vehicle&hellip;
                    
                        <ul className="list-inside font-medium mb-2">
                                <ol>- Vehicles 'Saved' | to be replaced</ol>
                                <ol>- Vehicles 'Noted' | to be replaced</ol>
                                <ol>- Vehicles 'Removed' | to be replaced</ol>
                        </ul>

                    The only people who can view your saved vehicles list are you and people you share it with. {' '}
                    <Link href="/dashboard">
                        <span className="text-slate-700 font-normal inline-flex"> 
                            &#40;View permissions
                            <Image src={Popout} alt='' />&#41;
                        </span>
                    </Link>
                    </div>
                    <Link href='/dashboard/saved-vehicles'>
                        <button className="py-2 px-3 mt-8 text-white bg-orange-600 rounded-lg font-extrabold">
                            View Your Vehicles
                        </button>
                    </Link>
                </section>  
            </div>
        </div>
    );
}

export default redirectDashboard;