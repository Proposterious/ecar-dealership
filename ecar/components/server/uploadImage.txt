// FRONTEND FUNCTION FOR UPLOADING IMAGE (with 'POST' request)
/*
    The function in this file relies on
    the functions from './imageHandler.tsx'...

    Below is a sample 'POST' request relying on
    react's builtin 'useState()' function to 
    update the image on user's input from a form
    in your HTML code.

    REQUIREMENTS:
    - Next.js and NextAuth in your project
    - API Route named upload/route.ts
    - Knowledge of how API route's work
    - How to separate backend from frontend

*/
import { useState } from "react";

const [image, setImage] = useState();

const uploadImage = async (e: any) => { // update user in database with 'image' file/blob;
    e.preventDefault()
    if (!image) { return }
    // try uploading
    try {
      console.log(image)
      const encodedImage = await processImage(image) as string;
      console.log(encodedImage)
      const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'x-www-form-urlencoded'
          },
          body: JSON.stringify(encodedImage),
      })
    // catch error
    console.log(res)
    if (!res.ok) throw new Error(await res.text());
  } catch (e: any) {
    console.error(e);
  }
    console.log("Update the user's image from 'Your Photo'")
    //signOut() // signout user to update token on login
}