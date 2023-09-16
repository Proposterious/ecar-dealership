// ALL PARAMETERS ARE SESSION OBJECTS

// Returns check
export function getId(checkId: string) {
    if (checkId != '' && checkId != undefined && checkId != null) { 
        console.log('User ID exists..., ', checkId)
        return checkId // return 'null' if user not logged in
    }  else {  
        console.log('User Id DOES NOT exist...')
        return null;
    }
}

// Returns logo.png if user's image is undefined
import logo from '../../public/shrunk-car-logo.png';

export function getImage(checkImage: any) {
    if (checkImage != undefined && checkImage != null && checkImage != '') { 
        console.log('User Image exists ', checkImage)
        return checkImage
    } else { 
        console.log('User Image DOES NOT exist...')
        return logo; 
    }
}
// Returns generic bio if user's bio is undefined
export function getBio(checkBio: string) {
    if (checkBio != '' && checkBio != null && checkBio != undefined) { 
        console.log('User Bio exists...')
        return checkBio;
    } else {  
        console.log('User Bio DOES NOT exist...')
        const newBio = `Tell us about yourself... \nMy favorite type of car is the Ford F-150 Truck`;
        return newBio
    }
}

