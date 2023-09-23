'use client'
// React, Next, Next-auth functions/instances
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Router from 'next/router';
// Import custom functions/instances
import removeBlankData from './removeBlankData';
// Next component imports
import Image, { StaticImageData } from 'next/image';
import logo from '../../public/shrunk-car-logo.png';
// SVG styles come from 'styles' folder in root
import arrow from '../styles/svg.module.scss';

function Dashboard() {
  // Handle entered information
  const [image, setImage]: any = useState(null);
  const [data, setData] = useState({
      fullName: "",
      phoneNumber: "",
      name: "",
      email: "",
      bio: "",
  });
  
  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  };

  const handleFileInput = async (e: any) => {
  // handle validations
    setImage(e.target.files[0]);
    const file: Blob = e.target.files[0];
    const bytes = await convertToBase64(file);
    console.log('This is the file from e.target\n ', file)
    console.log('This is the bytes from file\n', bytes)
    DashboardImage();
  }

  // Get userData as 'session' from useSession()
  const { data: session } = useSession() as any;

  // Assign placeholders variables with 'session' values
  const placeholderName = session?.user?.name as string; // required for register/login
  const placeholderEmail = session?.user?.email as string; // required for register/login

  // Check if user.fullName returns empty
  const checkFullName = session?.user?.fullName as string;
  if (checkFullName === null || checkFullName === '' || checkFullName === undefined ) {
    var placeholderFullName = `Your Full Name`;
  } else { var placeholderFullName = session?.user?.fullName as string}

  // Check if user.biography returns empty
  const checkBio = session?.user?.biography; 
  if (checkBio === null ||checkBio === '' || checkBio === undefined ) {
    var placeholderBio = `Tell us about yourself... \nMy favorite type of car is the Ford F-150 Truck`;
  } else { var placeholderBio = session?.user?.biography as string}

  // Check if user.image returns empty
  const checkImage = session?.user?.image; 
  if (checkImage === null || checkImage === '' || checkImage === undefined ) {
    var placeholderImage = logo as StaticImageData;
  } else { var placeholderImage = session?.user?.image as StaticImageData}

  // Return logo as placeholderImage or user.image
  const DashboardImage = () => {
    console.log(image);

    if (image === null || image === undefined || image === '') 
      { return (
      /* Returns 'logo' if user has not given new 'image' input */
      <>
        <Image src={placeholderImage} alt='' style={{objectFit:"fill"}} className='py-4 px-1 w-auto h-auto' />
      </>
      )
  } 
  else { 
    let imageSource = URL.createObjectURL(image);
    return (
    <>
      <Image src={imageSource} alt='' width={0} height={0} style={{objectFit:"contain", width:'auto', height:'auto',borderRadius:'45%'}} />
    </>
  )}
    
  }
  // 
  function deleteImage() {
    setImage(null);
    DashboardImage();
    console.log("Reset image to none")
  }

  function handleRefresh() {
    console.log("Force refresh the 'Dashboard' page")
    Router.reload()
  };
  // Update User with Complete Data
  const completeData = { 
    name: data.name, 
    fullName: data.fullName, 
    biography: data.bio,
    phoneNumber: data.phoneNumber,
    email: data.email,  
    image: image,
  }

  // Create, Read, Update/Write functions 
  const updateUser = async(e: any) => {
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
    signOut()
  };

  

  const updateImage = async (e: any) => {
    // Part one
    // TODO: CONVERT IMAGE TO BASE64 BYTES AND ADD formData VARIABLE
    console.log("This was the user's image", );
    // Part two
    e.preventDefault()
    const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify('')
    })
    const imageRes = await response.json();
    console.log(imageRes)
    console.log("Update the user's image from 'Your Photo'")
    signOut()
    return null
  }

  
  return (
      <section id='dashboard'>
        <DashboardImage />
        <div className="mx-auto max-w-screen-2xl p-4">
          <div className="mx-auto max-w-2/3">
            <div className="mb-6 flex flex-col gap-4">

              <h2 className="text-2xl font-bold text-black">
                Settings Page
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                      <p className="font-semibold">
                          Dashboard
                      </p>
                  </li>
                </ol>
              </nav>

            </div>

            <div className="grid grid-cols-5 gap-8">
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
                          <input className="w-full pl-4 rounded border border-stroke bg-gray py-3 px-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="phoneNumber" id="phoneNumber" placeholder='Currently Empty' value={data.phoneNumber} onChange={handleInputChange}/>
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
                        <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-sm" type="submit" onSubmit={() => handleRefresh()}>
                          Cancel
                        </button>
                        <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-medium text-slate-100 hover:bg-opacity-90" id='saveInfo' type="submit" onSubmit={() => handleRefresh()}>
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
                    <form action="#" method="POST" onSubmit={updateImage}>
                      <div className="gap-4">
                          <div className="flex mb-2 -mt-2">
                              <span className="flex h-20 w-20 max-h-20 max-w-20 rounded-full border border-stroke bg-indigo-100">
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
                        <button className="flex justify-center rounded border border-stroke py-2 px-6 font-semibold text-black" onClick={() => handleRefresh()}>
                          Cancel
                        </button>
                        <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-semibold text-white hover:bg-opacity-90" type='submit' id='saveImage'>
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

function convertToBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }; 
    fileReader.onerror = (error) => {
      reject(error);
    };
  })
}


export default Dashboard;