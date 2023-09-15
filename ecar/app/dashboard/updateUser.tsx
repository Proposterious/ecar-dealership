import { redirect } from "next/navigation"

export default async function updateUser(e: any, data: any) {
    // const newName = data.name; const newEmail = data.email; const newPass = data.password;
    // const newData = {newName, newEmail, newPass}
    e.preventDefault()
    const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const userInfo = await response.json()
    console.log(userInfo)
    redirect('/auth/login')
}