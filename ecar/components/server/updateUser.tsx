import { redirect } from "next/navigation"
import removeBlankData from '../../app/dashboard/removeBlankData';

export default async function updateUser(e: any, data: any) {
    const completeData = removeBlankData(data);
    e.preventDefault()
    const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData)
    })

    const userInfo = await response.json()
    console.log(userInfo)
    redirect('/auth/login')
}