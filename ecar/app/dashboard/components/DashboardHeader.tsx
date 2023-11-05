"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function DashboardHeader() {
    const router = useRouter();
    
    const path = usePathname();
    var placeholderName; var pathname;
    console.log("path", path)
    if (path === "/dashboard") {
        pathname = '';
    } else if (path === "/dashboard/settings") {
        pathname = "Settings"
    } else if (path === "/dashboard/saved-vehicles") {
        pathname = "Saved Vehicles"
    } else { pathname = "Undetermined" }
    
    // Get userData as 'session' from useSession()
    const { data: session, status } = useSession({ required: true });
    if (status == "loading") { placeholderName = "User" 
    } else if (status == "authenticated") { placeholderName = session?.user?.name as string; 
    } else { router.replace("/auth/login") }

    return ( 
        <div className="mb-6 flex flex-col gap-4">
            <h2 className="n-xs:text-xl n-md:text-3xl font-extrabold text-orange-600 underline">
            { placeholderName }&apos;s Dashboard | { pathname }
            </h2>

            <nav className="n-xs:text-normal n-md:text-lg n-md:tracking-wide w-fit child:inline-block items-center gap-2 select-none">
                <Link href="/dashboard" className="mx-1 font-semibold text-orange-500 hover:text-orange-400 hover:bg-sky-200/40 n-md:hover:tracking-wide duration-300">
                    Dashboard
                </Link>
                <div className="indent-1 font-semibold hover:cursor-default">
                    /
                </div>
                <Link href="path" className="mx-1 font-semibold text-slate-800 hover:text-slate-600 hover:bg-sky-200/40 n-md:hover:tracking-wide duration-300">
                    { pathname }
                </Link>
            </nav>

        </div>
    );
}

export default DashboardHeader;