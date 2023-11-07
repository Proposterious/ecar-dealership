"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function SaveCaution() {
    const { status } = useSession();
    const router = useRouter()

    function removeAlert() {
        const alert = document.getElementById("check-cars-alert") as unknown as HTMLElement;
        console.log("Removing alert...", alert);
        alert.className = 'hidden';
    }

    if (status == "unauthenticated") {
        return (
            <div id="check-cars-alert" className="fixed w-1/3 h-fit bottom-0 text-center font-semibold text-red-500 text-sm bg-slate-200 rounded-sm p-3">
                User Not Found...<br/>Vehicle Not Saved
                <button onClick={() => router.push('login')} className='font-semibold transition duration-200 text-indigo-500 underline hover:decoration-double'>
                    Not Logged in? Click here!
                </button>
                <button onClick={removeAlert} className="my-auto px-6 closebtn">&times;</button>
            </div>
        )
    } else if (status == "authenticated") {
        return (
            <div id="check-cars-alert" className="fixed z-50 w-1/3 h-fit bottom-0 text-center text-sm text-slate-100 bg-orange-500 rounded-sm p-3">
                Saved Vehicle!<br/>
                <button onClick={() => router.push('/dashboard/saved-vehicles')} className='font-semibold transition duration-200 text-indigo-500 underline hover:decoration-double'>
                    Check it out in Dashboard
                </button>
                <button onClick={removeAlert} className="w-fit my-auto px-6 closebtn">&times;</button>
            </div>
        )
    }
}

export default SaveCaution;