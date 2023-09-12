'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

function Dashboard() {
    const [newName, setNewName] = useState("")
    const { data: session, status, update } = useSession() as any;
    console.log("useSession Hook session object", session)
    return ( 
        <div className='text-center text-4xl font-bold '>
            <h1>Dashboard</h1>
            <h2> Hi {session.user.name}</h2>
            
            <button className='text-md font-normal text-white bg-black rounded-md' onClick={() => signOut()}>
                Sign Out
            </button>
        </div>
     );
}

export default Dashboard;