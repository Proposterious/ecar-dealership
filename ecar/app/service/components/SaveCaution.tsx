"use client"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function SaveCaution() {
    const { status } = useSession()
    const router = useRouter()

    function removeAlert() {
        const alert = document.getElementById("check-cars-alert") as unknown as HTMLElement;
        console.log("Removing alert...", alert);
        alert.classList.add("hidden")
    }

    if (status == "unauthenticated") {
        return (
            <div id="check-cars-alert" data-te-animation-init="" data-te-animation-data-te-animation-reset="false" data-te-animation="[slide-in-down_1s_ease-in-out]" className="fixed z-50 n-xs:w-1/2 md:w-1/4 h-fit left-1/2 transform -translate-x-1/2 duration-500 bg-slate-500 rounded-sm py-2">
                <p className="w-fit text-center text-xl font-semibold text-orange-500 mx-auto my-1">
                    User Not Found. <span className="font-normal text-slate-100">Vehicle Not Saved.</span>
                </p>
            <div className="w-fit mx-auto mt-2">
                <button onClick={() => router.push('/auth/login')} className='inline-flex text-center bg-slate-200 hover:bg-sky-200 hover:ring-2 hover:ring-white rounded-lg p-3 | font-semibold transition duration-200 text-orange-500 hover:decoration-double'>
                    Click here to Login
                </button>
                <button onClick={removeAlert} className="w-fit mt-3 closebtn">&times;</button>
            </div>
        </div>
        )
    } else if (status == "authenticated") {
        return (
            <div id="check-cars-alert" className="fixed z-50 n-xs:w-1/2 md:w-1/4 h-fit left-1/2 transform -translate-x-1/2 origin-top top-20 transition-all bg-orange-500 rounded-sm py-2">
                <p className="w-fit mx-auto my-2 text-center text-xl font-semibold text-slate-100 select-none">Saved Vehicle!</p>
                <div className="w-fit h-fit mx-auto mb-2 text-center">
                    <button onClick={() => router.push('/dashboard/saved-vehicles')} className='text-center bg-slate-100 hover:bg-slate-500 rounded-lg p-3 | font-semibold transition duration-200 text-indigo-500  hover:text-indigo-200 hover:decoration-double'>
                    Check it out in Dashboard
                    </button>
                    <button onClick={removeAlert} className="mt-3 closebtn">&times;</button>
                </div>
            </div>
        )
    }
}

export default SaveCaution;