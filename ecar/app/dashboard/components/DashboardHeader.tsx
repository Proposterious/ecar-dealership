"use client"
import Link from "next/link";
import Loader from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function DashboardHeader() {
    const router = useRouter();
    const path = usePathname();
    var pathname;
    console.log("path", path)
    if (path === "/dashboard") {
        pathname = 'Page';
    } else if (path === "/dashboard/settings") {
        pathname = "Settings"
    } else if (path === "/dashboard/saved-vehicles") {
        pathname = "Saved Vehicles"
    } else { pathname = "Undetermined" }

    // Get userData as 'session' from useSession()
    const { data: session, update } = useSession() as any;
    const { status } = useSession({ required: true })
    while (status != 'authenticated') {
      return ( <Loader /> )
    }
    
    // Assign placeholders variables with 'session' values
    const placeholderName = session.user?.name as string; // required for register/login

    return ( 
        <div className="mb-6 flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-orange-600 underline">
            { placeholderName } { pathname }
            </h2>

            <nav>
            <ol className="flex items-center gap-2">
                <li>
                    <button onClick={() => router.replace('/dashboard')} className="font-semibold text-orange-600 duration-200 hover:font-bold hover:text-orange-500">
                        Dashboard
                    </button>
                </li>
                <li>
                    <p className="-indent-1 font-semibold">
                        /
                    </p>
                </li>
                <li>
                    <Link href="path" className="-indent-1 font-semibold text-slate-700 duration-200 hover:font-bold hover:text-black">
                        { pathname }
                    </Link>
                </li>
            </ol>
            </nav>

        </div>
    );
}

export default DashboardHeader;