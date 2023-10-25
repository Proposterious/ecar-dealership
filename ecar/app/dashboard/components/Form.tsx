// SVG styles come from 'styles' folder in root
import arrow from '../../styles/svg.module.css';
// Custom api function imports
import { updateUser } from '../api/updateUser';
// Custom function imports
import { handleInputChange } from '../functions/handler';
import { refreshPage } from '../functions/refreshPage';
// Grab session from 'modules/session.tsx'
var session = require('../modules/session')


export function Form() {
    return ( 
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-md shadow-slate-400/50">
                {/* Header Block */}
                <div className=" bg-orange-600 border-b-2 border-black py-4 px-7">
                  <h3 className="font-medium text-white">
                    Personal Information
                  </h3>
                </div>
              <div className='bg-slate-100 p-7'>
                {/* Form Begins Here */}
                <form action="#" method="POST" className={`${arrow.arrow}`} onSubmit={updateUser}>
                  <div className={`relative mb-6 flex flex-col gap-5 sm:flex-row`}>
                  {/* Insert Full Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black" htmlFor="fullName">Full Name</label>
                      <div className='relative'>
                        <input className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-{4.5} font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="fullName" id="fullName" placeholder={session.placeholderFullName} value={session.data.fullName} onChange={handleInputChange}/>
                      </div>
                    </div>
                  {/* Insert PhoneNumber */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black" htmlFor="phoneNumber">Phone Number</label>
                      <input className="w-full pl-4 rounded border border-stroke bg-gray py-3 px-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="phoneNumber" id="phoneNumber" placeholder='Currently Empty' value={session.data.phoneNumber} onChange={handleInputChange}/>
                    </div>
                  </div>
                  {/* Insert Email */}
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black" htmlFor="email">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4">
                        
                      </span>
                      <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="email" name="email" id="email" placeholder={session.placeholderEmail} value={session.data.email} onChange={handleInputChange} />
                    </div>
                  </div>
                  {/* Insert Username */}
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black" htmlFor="name">Username</label>
                    <input className="flex items-center w-full rounded border border-stroke bg-gray py-3 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none" type="text" name="name" id="name" placeholder={session.placeholderName} value={session.data.name} onChange={handleInputChange}/>
                  </div>
                  {/* Insert Bio */}
                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black" htmlFor="bio">
                      BIO <p className='inline-block font-light'>(helps us determine the best cars for you)</p>
                    </label>
                    <div className="relative">
                      <textarea className="flex items-center w-full rounded border border-stroke bg-gray py-4 pl-4 font-medium text-black focus:border-orange-600 focus-visible:outline-none line-clamp-2" name="bio" id="bio" placeholder={session.placeholderBio} value={session.data.bio} onChange={handleInputChange}>
                      </textarea>
                    </div>
                  </div>
                  {/* Save or Cancel */}
                  <div className="flex justify-end gap-4">
                    <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-sm" type="button" onClick={() => refreshPage()}>
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
     );
}