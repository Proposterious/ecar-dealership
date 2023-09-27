// ALL PARAMETERS ARE SESSION OBJECTS
// Returns logo.png if user's otherImage is undefined
'use server'
import Image from 'next/image';
import logo from '../../public/shrunk-car-logo.png';


export async function fetchImage() {
    const response = await fetch('/api/otherImage');
    const userImage = await response.json();
    console.log(userImage)
    return userImage
}

