// NextAuth functions
import { signOut } from "next-auth/react";
// Custom function imports
import removeBlankData from "../functions/removeBlankData";
// Custom module imports
var session = require('../modules/session')

export async function updateUser(e: any) { // update user in database with 'completeData' object
    // Part one
    const newData = removeBlankData(session.completeData)
    // Part two
    e.preventDefault()
    const response = await fetch('/api/update', { // make call to api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    })

    const userInfo = await response.json()
    console.log(session.completeData)
    console.log(userInfo)
    console.log("Update the user's information from 'form'")
    signOut()
};