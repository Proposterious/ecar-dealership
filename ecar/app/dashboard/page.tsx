'use client'

import { useSession } from 'next-auth/react'

function Dashboard() {
    const { data: session, status } = useSession() as any;
    console.log(session, status)
    return (
        <section>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mx-auto max-w-270">
              <div className="mb-6 flex flex-col gap-3">
                <h2 className="text-title-md2 font-bold text-black dark:text-white">
                  Settings Page
                </h2>

                <nav>
                  <ol className="flex items-center gap-2">
                    <li>
                      <a className="font-medium" href="index.html">Dashboard /</a>
                    </li>
                    <li className="font-medium text-primary">Settings</li>
                  </ol>
                </nav>
              </div>

              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Personal Information
                      </h3>
                    </div>
                    <div className="p-7">
                      <form action="#">
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">Full Name</label>
                            <div className="relative">
                              <span className="absolute left-{4.5} top-4">
            
                              </span>
                              <input className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-{4.5} font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" type="text" name="fullName" id="fullName" placeholder="Devid Jhon" value="Devid Jhon" />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">Phone Number</label>
                            <input className="w-full rounded border border-stroke bg-gray py-3 px-{4.5} font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" type="text" name="phoneNumber" id="phoneNumber" placeholder="+990 3343 7865" value="+990 3343 7865" />
                          </div>
                        </div>

                        <div className="mb-5.5">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">Email Address</label>
                          <div className="relative">
                            <span className="absolute left-{4.5} top-4">
                              
                            </span>
                            <input className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-{4.5} font-medium text-black focus:border-primary focus-visible:outline-none" type="email" name="email" id="email" placeholder="devidjond45@gmail.com" value="devidjond45@gmail.com" />
                          </div>
                        </div>

                        <div className="mb-5.5">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="Username">Username</label>
                          <input className="w-full rounded border border-stroke bg-gray py-3 px-{4.5} font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" type="text" name="Username" id="Username" placeholder="devidjhon24" value="devidjhon24" />
                        </div>

                        <div className="mb-5.5">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="Username">BIO</label>
                          <div className="relative">
                            <span className="absolute left-{4.5} top-4">
                              
                            </span>

                            <textarea className="w-full  rounded border border-stroke bg-gray py-3 pl-11.5 pr-{4.5} font-medium text-black focus:border-primary focus-visible:outline-none" name="bio" id="bio"placeholder="Write your bio here">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet.
                              </textarea>
                          </div>
                        </div>

                        <div className="flex justify-end gap-{4.5}">
                          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="submit">
                            Cancel
                          </button>
                          <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 xl:col-span-2">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Your Photo
                      </h3>
                    </div>
                    <div className="p-7">
                      <form action="#">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-14 w-14 rounded-full">
                            <img src="src/images/user/user-03.png" alt="User">
                          </div>
                          <div>
                            <span className="mb-1.5 font-medium text-black dark:text-white">Edit your photo</span>
                            <span className="flex gap-2.5">
                              <button className="text-sm font-medium hover:text-primary">
                                Delete
                              </button>
                              <button className="text-sm font-medium hover:text-primary">
                                Update
                              </button>
                            </span>
                          </div>
                        </div>

                        <div id="FileUpload" className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                          <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
                          <div className="flex flex-col items-center justify-center space-y-3" />
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            
                            </span>
                            <p className="text-sm font-medium">
                              <span className="text-primary">Click to upload</span>
                              or drag and drop
                            </p>
                            <p className="mt-1.5 text-sm font-medium">
                              SVG, PNG, JPG or GIF
                            </p>
                            <p className="text-sm font-medium">
                              (max, 800 X 800px)
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-{4.5}">
                          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="submit">
                            Cancel
                          </button>
                          <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit">
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