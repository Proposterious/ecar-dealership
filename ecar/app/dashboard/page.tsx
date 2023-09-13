'use client'
// React, Next components
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
// Custom components
import React from 'react';
import arrow from '@/public/svg/arrow-right.svg';
import Logo from '@/components/content/image/logo';

function Dashboard() {
    const { data: session } = useSession();
    console.log(session);
    // Handle entered information
    const [data, setData] = useState({
        fullName: "",
        phoneNumber: "",
        username: "",
        email: "",
        bio: "",
    });
    
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }))
      };

    const updateUser = async() => {
        console.log("Update the user's information from 'Personal Information'")
    };

    const handleRefresh = () => {
        console.log("Force refresh the 'Dashboard' page")
        Router.reload();
    };

    const deleteImage = () => {
        console.log("Delete the user's image from 'Your Photo'")
    }

    const updateImage = () => {
        console.log("Update the user's image from 'Your Photo'")
    }

    return (
        <section>
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
                    <div className="bg-slate-100 p-7">
                      <form action="#" method="POST" onSubmit={updateUser}>
                        <div className="mb-6 flex flex-col gap-5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black" htmlFor="fullName">Full Name</label>
                            <div className="relative">
                              <input className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-{4.5} font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="fullName" id="fullName" placeholder="Murdox Holmes" value={data.fullName} onChange={handleInputChange}/>
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black" htmlFor="phoneNumber">Phone Number</label>
                            <input className="w-full pl-4 rounded border border-stroke bg-gray py-3 px-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="phoneNumber" id="phoneNumber" placeholder="+990 3343 7865" value={data.phoneNumber} onChange={handleInputChange}/>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="mb-3 block text-sm font-medium text-black" htmlFor="email">Email Address</label>
                          <div className="relative">
                            <span className="absolute left-4 top-4">
                              {arrow}
                            </span>
                            <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="email" name="email" id="email" placeholder="devidjond45@gmail.com" value={data.email} onChange={handleInputChange} />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="mb-3 block text-sm font-medium text-black" htmlFor="username">Username</label>
                          <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="username" id="username" placeholder="murdoxholmes06" value={data.username} onChange={handleInputChange}/>
                        </div>

                        <div className="mb-6">
                          <label className="mb-3 block text-sm font-medium text-black" htmlFor="Username">BIO <p className='inline-block font-light'>(helps us determine the best cars for you)</p></label>
                          <div className="relative">
                            <textarea className="flex items-center w-full rounded border border-stroke bg-gray py-4 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none line-clamp-2" name="bio" id="bio"placeholder="Write your bio here" value={data.bio} onChange={handleInputChange}>
                            </textarea>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-sm" type="submit" onSubmit={() => updateUser()}>
                            Cancel
                          </button>
                          <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-medium text-slate-100 hover:bg-opacity-90" type="submit" onSubmit={() => handleRefresh()}>
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
                      <form action="#" method="POST" onSubmit={updateUser}>
                        <div className="gap-4">
                            <div className="flex py-3">
                                <span className="flex h-20 w-20 rounded-full border border-stroke bg-black">
                                    <Logo w={null} h={null} s='' o/>
                                </span>
                                <div className="pl-3 font-medium text-orange-500">
                                    <p className='text-black'>Edit your photo</p>
                                  <div className='space-x-3'>
                                    <button className="indent-1.5 text-sm font-medium" onSubmit={() => deleteImage()}>
                                        Delete
                                    </button>
                                    <button className="text-sm font-medium" onSubmit={() => updateImage()}>
                                        Update
                                    </button>
                                  </div>
                                </div>
                            </div>

                        <div id="FileUpload" className="relative mb-6 w-full cursor-pointer appearance-none rounded border-2 border-dashed border-orange-500 py-4 px-4">
                          <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />
                          <div className="flex flex-col flex-1 items-center justify-center space-y-3 h-36">
                            <p className="flex text-sm font-medium indent-1">
                              <p className='text-orange-600'>Click to upload</p>or drag and drop
                            </p>
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
                          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-semibold text-black" type="submit">
                            Cancel
                          </button>
                          <button className="flex justify-center rounded bg-orange-600 py-2 px-6 font-semibold text-white hover:bg-opacity-90" type="submit">
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