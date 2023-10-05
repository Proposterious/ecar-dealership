// Next imports
import Link from "next/link";
// NextAuth imports
import { useSession, signIn, signOut } from "next-auth/react";
// Custom imports
import animate from "./functions/animate";

export default function Session() {
    const { status } = useSession();
    if (status === "authenticated") {
        return (
            <>
                <div className="font-semibold">
                    <Link onClick={() => animate()} href='/dashboard'>
                        Dashboard
                    </Link>
                </div>
                <button className='font-bold text-black' onClick={() => signOut({callbackUrl: '/' })}>
                    Logout
                </button>
            </>
        )
    } else { 
        return (
            <>
                <button className='font-bold text-black' onClick={() => signIn()}>
                    Login/Register
                </button>
            </>
    )}
}
