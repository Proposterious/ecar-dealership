// ALL PARAMETERS ARE SESSION OBJECTS

// Returns logo.png if user's image is undefined
import logo from '../../public/shrunk-car-logo.png';

export function getImage(checkImage: string) {
    if (checkImage != undefined && checkImage != null) { 
        console.log('User Image exists ', checkImage)
        return checkImage
    } else { 
        console.log('User Image DOES NOT exist...')
        return logo; 
    }
}

// Returns generic bio if user's bio is undefined
export function getBio(checkBio: string) {
    if (checkBio != null && checkBio != undefined) { 
        console.log('User Bio exists...', checkBio)
        return checkBio;
    } else {
        console.log('User Bio DOES NOT exist...')
        const newBio = `Tell us about yourself... \nMy favorite type of car is the Ford F-150 Truck`;
        return newBio
    }
}

