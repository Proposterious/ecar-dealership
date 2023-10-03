'use client'
// React imports
import React from 'react';
import { useState } from 'react';
// NextAuth imports
import { useSession } from 'next-auth/react';
import removeBlankData from './functions/removeBlankData';
// Component imports
import Loader from '../loading';
// Image imports
import Image from 'next/image'; // builtin nextjs component
import logo from '../../public/shrunk-car-logo.png' // website logo from 'public'
import arrow from '../styles/svg.module.scss'; // custom svg from 'styles' 


function Dashboard() {
    // Handle typed inputs
    const [data, setData] = useState({
      fullName: "",
      phoneNumber: "",
      name: "",
      email: "",
      bio: "",
  });

  const initialState = {
    fullName: "",
    phoneNumber: "",
    name: "",
    email: "",
    bio: "",
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  };

  const handleCancel = (e: any) => {
    setData(initialState);
  };

  // Handle image inputs
  const [image, setImage] = useState() as any;
  const handleFileInput = (e: any) => {
  // Handle file validations
    console.log('handleFileInput triggered')
    setImage(e.target.files[0]);  
  // Re-render DashboardImage component
    DashboardImage();
  }

  // Get userData as 'session' from useSession()
  const { data: session, update } = useSession() as any;
  const { status } = useSession({ required: true })
  while (status === 'loading') {
    return ( <Loader />)
  }
  

  // Assign placeholders variables with 'session' values
  const placeholderName = session.user?.name as string; // required for register/login
  const placeholderEmail = session.user?.email as string; // required for register/login

  // Check if user.fullName returns empty
  const checkFullName = session.user?.fullName as string;
  if (checkFullName === null || checkFullName === '' || checkFullName === undefined) {
    var placeholderFullName = `Your Full Name`;
  } else { var placeholderFullName = session?.user?.fullName as string}

  // Check if user.biography returns empty
  const checkBio = session.user?.biography as string; 
  if (checkBio === null ||checkBio === '' || checkBio === undefined) {
    var placeholderBio = `Tell us about yourself... \nMy favorite type of car is the Ford F-150 Truck`;
  } else { var placeholderBio = session?.user?.biography as string}

  // Check if user.phoneNumber returns empty
  const checkNumber = session.user?.phoneNumber as string; 
  if (checkNumber === null ||checkNumber === '' || checkNumber === undefined) {
    var placeholderNumber = `Example: +(800)-255-7324`;
  } else { var placeholderNumber = session.user?.phoneNumber as string}  
  

  function DashboardImage() {// return logo as placeholderImage or user.image 
    const userImage = 'none' as unknown as string;
    if (session.user?.image === 'CHANGE THIS BACK TO "true"') {
      console.log(session.user?.image)
      return (
      /* Returns 'logo' if user has not given new 'image' input */
      <>
        <Image src={userImage} alt='' style={{objectFit:"contain"}} />
      </>
      )
    }
    if (image === null || image === undefined)  {
      return (
        <>
          <Image src={logo} alt='' width={0} height={0} className='px-2 py-5' style={{objectFit:"fill"}} />
        </>
      )
    }
    else { 
      let imageSource = URL.createObjectURL(image);
      console.log(image)
      console.log(image.name)
      return (
      <>
        <Image src={imageSource} alt='' width={0} height={0} style={{objectFit:"cover", width:'auto', height:'100%', alignSelf:'center'}} />
      </>
      )
    }
  }
// Create, Read, Update, Write main functions 
  const completeData = { // dictionary of 'data' vars
    name: data.name, 
    fullName: data.fullName, 
    biography: data.bio,
    phoneNumber: data.phoneNumber,
    email: data.email,  
    image: image,
  }

  const updateUser = async(e: any) => { // update user in database with 'completeData' object
    console.log('Session from dashboard page:', session)
    // Part one
    const newData = removeBlankData(completeData)
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
    console.log(completeData)
    console.log(userInfo)
    console.log("Update the user's information from 'form'")
    update()
  };

  // const getBase64 = async (file: Blob) => {
  //   return new Promise(function(resolve, reject) {
  //       var reader = new FileReader();
  //       reader.onload = function() {
  //         resolve(reader.result as string)
  //       }; 
  //       reader.onerror = function(error) {
  //           reject(error)
  //       };
  //       reader.readAsDataURL(file);
  //     });
  // }

  // async function reduceSize(base64Str: any, MAX_WIDTH = 30, MAX_HEIGHT = 30) {
  //   let resized_base64 = await new Promise((resolve) => {
  //       const img = require('./createImage')
  //       img.src = base64Str
  //       img.onload = () => {
  //         let canvas = document.createElement('canvas')
  //         let width = img.width
  //         let height = img.height

  //         if (width > height) {
  //             if (width > MAX_WIDTH) {
  //                 height *= MAX_WIDTH / width
  //                 width = MAX_WIDTH
  //             }
  //         } else {
  //             if (height > MAX_HEIGHT) {
  //                 width *= MAX_HEIGHT / height
  //                 height = MAX_HEIGHT
  //             }
  //         }
  //         canvas.width = width
  //         canvas.height = height
  //         let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  //         ctx.drawImage(img, 0, 0, width, height)
  //         console.log('URL ACCORDING TO reduceSize FUNCTION\n', canvas.toDataURL());
  //         resolve(canvas.toDataURL()) // this will return base64 image results after resize
  //     }
  //   });

  //   return resized_base64;
  // }

  // function calcSize(image: any) {
  //   let y = 1;
  //   if (image.endsWith('==')) {
  //       y = 2
  //   }
  //   const x_size = (image.length * (3 / 4)) - y
  //   return Math.round(x_size / 1024)
  // }

  // async function processImage(file: any, min_image_size = 50) {
  //   const res = await getBase64(file);
  //   if (res) {
  //       const old_size = calcSize(res);
  //       if (old_size > min_image_size) {
  //           const resized = await reduceSize(res);
  //           const new_size = calcSize(resized)
  //           console.log('new_size=> ', new_size, 'KB');
  //           console.log('old_size=> ', old_size, 'KB');
  //           return resized;
  //       } else {
  //           console.log('image already small enough')
  //           return res;
  //       }

  //   } else {
  //       console.log('return err')
  //       return null;
  //   }
  // }

  async function uploadImage(e: any) { // update user in database with 'image' file/blob;
    e.preventDefault()
    console.log(image)
    if (!image) { return }
    // try uploading
  //   try {
  //     console.log(image)
  //     const encodedImage = await processImage(image) as string;
  //     console.log(encodedImage)
  //     const res = await fetch('/api/upload', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'x-www-form-urlencoded'
  //         },
  //         body: JSON.stringify(encodedImage),
  //     })
  //   // catch error
  //   console.log(res)
  //   if (!res.ok) throw new Error(await res.text());
  // } catch (e: any) {
  //   console.error(e);
  // }
  //   console.log("Update the user's image from 'Your Photo'")
  //   signOut() // signout user to update token on login
  }
  
  function displayAlert() {
    const element = document.getElementById('body') as HTMLElement
    const parent = document.createElement('button')
    parent.id = 'replacement'
    parent.textContent = "The 'Save' feature for images currently does not work."
    parent.className = 'alert'
    const child = document.createElement('span')
    child.className = 'closebtn justify-center items-center'
    child.innerHTML = '&times;'
    parent.onclick = function() {
        document.getElementById('replacement')?.replaceWith(element)
      }
    parent.appendChild(child)
    element?.replaceWith(parent)
  }

  function deleteImage() {// Delete user's image input
    setImage(undefined); // set image to null
    DashboardImage(); // rerender DashboardImage component
    console.log("Reset image to none")
  }

  return (
      <section id='dashboard'>
        <div className="mx-auto max-w-screen-2xl p-4">
          <div className="mx-auto max-w-2/3">
            <div className="mb-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-orange-600 underline">
                {placeholderName} Settings
              </h2>

              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                      <p className="font-semibold text-orange-600">
                          Dashboard
                      </p>
                  </li>
                  <li>
                      <p className="-indent-1 font-semibold">
                          /
                      </p>
                  </li>
                  <li>
                      <p className="-indent-1 font-semibold text-slate-700">
                          Settings
                      </p>
                  </li>
                </ol>
              </nav>

            </div>

            <div id='body' className="grid grid-cols-5 gap-8 pb-16">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-md shadow-slate-400/50">
                  <div className=" bg-orange-600 border-b-2 border-black py-4 px-7">
                    <h3 className="font-medium text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className='bg-slate-100 p-7'>
                    <form action="#" method="POST" className={`${arrow.arrow}`} onSubmit={updateUser}>
                      <div className={`relative mb-6 flex flex-col gap-5 sm:flex-row`}>
                        <div className="w-full sm:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black" htmlFor="fullName">Full Name</label>
                          <div className='relative'>
                            <input className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-{4.5} font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="fullName" id="fullName" placeholder={placeholderFullName} value={data.fullName} onChange={handleInputChange}/>
                          </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black" htmlFor="phoneNumber">Phone Number</label>
                          <input className="w-full pl-4 rounded border border-stroke bg-gray py-3 px-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="phoneNumber" id="phoneNumber" placeholder={placeholderNumber} value={data.phoneNumber} onChange={handleInputChange}/>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-black" htmlFor="email">Email Address</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4">
                            
                          </span>
                          <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="email" name="email" id="email" placeholder={placeholderEmail} value={data.email} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-black" htmlFor="name">Username</label>
                        <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="name" id="name" placeholder={placeholderName} value={data.name} onChange={handleInputChange}/>
                      </div>

                      <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-black" htmlFor="bio">
                          BIO <p className='inline-block font-light'>(helps us determine the best cars for you)</p>
                        </label>
                        <div className="relative">
                          <textarea className="flex items-center w-full rounded border border-stroke bg-gray py-4 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none line-clamp-2" name="bio" id="bio" placeholder={placeholderBio} value={data.bio} onChange={handleInputChange}>
                          </textarea>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-sm" type="button" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-medium text-slate-100 hover:bg-opacity-90" id='saveInfo' type="submit">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white shadow-md shadow-slate-400/50">
                  <div className="border-b border-stroke py-4 px-7 bg-orange-600">
                    <h3 className="font-medium text-white">
                      Your Photo
                    </h3>
                  </div>
                  <div className="px-7 py-5">
                    <form action="#" method="POST" onSubmit={uploadImage}>
                      <div className="gap-4">
                          <div className="flex mb-2 -mt-2">
                              <span className="flex h-20 w-20 max-h-20 max-w-20 rounded-full overflow-hidden border border-stroke bg-indigo-100">
                                  {/* Returns 'logo' if user has not given new 'image' input */}
                                  <DashboardImage />
                              </span>
                              <div className="pl-3 font-medium text-orange-500 mt-2">
                                  <label className='text-black'>Edit your photo</label>
                                <div className='space-x-3'>
                                  <button className="pl-6 text-sm font-medium" onClick={() => deleteImage()}>
                                      Remove
                                  </button>
                                </div>
                              </div>
                          </div>

                      <div className="relative mb-6 w-full cursor-pointer appearance-none rounded border-2 border-dashed border-orange-500 py-4 px-4">
                        <input id="FileUpload" type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" onChange={handleFileInput} />
                        <div className="flex flex-col flex-1 items-center justify-center space-y-3 h-36 text-black">
                          <span className="flex text-sm font-medium indent-1">
                            <p className='text-orange-600'>Click to upload</p>or drag and drop
                          </span>
                          <p className="mt-1.5 text-sm font-medium">
                            SVG, PNG, JPG or GIF
                          </p>
                          <p className="text-sm font-medium">
                            (max, 800 X 800px)
                          </p>
                        </div>
                      </div>
                    </div>

                      <div className="flex justify-end gap-4">
                        <button className="flex justify-center rounded border border-stroke py-2 px-6 font-semibold text-black" type='button' onClick={() => deleteImage()}>
                          Cancel
                        </button>
                        <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-semibold text-white hover:bg-opacity-90" type='button' onClick={() => displayAlert()} id='saveImage'>
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>  
            </div> 
          </div>
        </div>
      </section>
  );
}

export default Dashboard;