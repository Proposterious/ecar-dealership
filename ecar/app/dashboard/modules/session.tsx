// /* Session Component

//     This file grabs the user's
//     session data and returns a dictionary
//     of session objects from 'user'
//     and custom 'useState()' variables
//     that handle the user's imports for 
//     the form in 'Form.tsx'
// */
// // NextAuth imports
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";

async function getUser(AuthOptions: AuthOptions) {
    const session = await getServerSession(AuthOptions);
    const token = session;
    console.log(token)
    return token
}

const session = getUser(authOptions)

// Assign placeholders variables with 'session' values
const placeholderName = session.user.name as string; // required for register/login
const placeholderEmail = session?.user?.email as string; // required for register/login
// Check if user.fullName returns empty
const checkFullName = session?.user?.fullName as string;
if (checkFullName === null || checkFullName === '' || checkFullName === undefined) {
var placeholderFullName = `Your Full Name`;
} else { var placeholderFullName = session?.user?.fullName as string}

// Check if user.biography returns empty
const checkBio = session?.user?.biography; 
if (checkBio === null ||checkBio === '' || checkBio === undefined) {
var placeholderBio = `Tell us about yourself... \nMy favorite type of car is the Ford F-150 Truck`;
} else { var placeholderBio = session?.user?.biography as string}

// Check if user.image returns empty
/* CURRENTLY BROKEN, MIGRATE TO NEW DATABASE
    TO HAVE FUNCTIONING IMAGE FETCHING ('GET') */

// Handle entered information
// function getImage() {
//     const [image, setImage] = useState() as any;
//     return [image, setImage]
// }
// const [image, setImage] = getImage();

// function getData() {
//     const [data, setData] = useState({
//         fullName: "",
//         phoneNumber: "",
//         name: "",
//         email: "",
//         bio: "",
//     });
//     console.log(data, setData)
//     return [data, setData]
// }
// const [data, setData] = getData();

// module.exports = {
//     user: {
//         name: session.user.name,
//         fullName: session.user.fullName,
//         email: session.user.email,
//         phoneNumber: session.user.phoneNumber,
//         image: session.user.image,
//         bio: session.user.biography,
//     },
//     image: [image, setImage],
//     data: [data, setData],
//     placeholderName: placeholderName,
//     placeholderFullName: placeholderFullName,
//     placeholderEmail: placeholderEmail,
//     placeholderBio: placeholderBio
// }