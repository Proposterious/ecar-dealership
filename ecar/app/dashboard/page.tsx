"use client"
import Loader from "../loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function redirectDashboard() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/settings');
    })
    return ( 
        <Loader />
    );
}

export default redirectDashboard;