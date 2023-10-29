"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function EmploymentAlert() {
    const { status } = useSession()

    const router = useRouter()
    function removeAlert() {
        const alert = document.getElementById("employment-alert") as unknown as HTMLElement;
        console.log("Removing alert...", alert);
        alert.className = 'hidden';
    }

    if (status != "authenticated") {
        return ( 
        <section id="employment-alert" className="w-full h-full absolute z-50 bg-orange-600/80 block">
            <div className="w-full h-full flex flex-col justify-center items-center text-xl font-semibold text-white text-center">
                <div className="inline-flex">
                    <p className='w-fit h-fit hover:cursor-default'>
                        This is an alert that pops up every time you enter this page. You may not interact with this page unless you are signed in. This page is also coincidentally under maintenance.
                    </p>
                    <button onClick={removeAlert} className="my-auto px-6 closebtn">&times;</button>
                </div>
                <button className="rounded-lg mt-4 p-3 bg-sky-400 duration-500 hover:text-black" onClick={() => router.replace('/')}>
                    Go back to Home
                </button>
            </div>
            
        </section>
     );
    } else { return null; }
}

export default EmploymentAlert;