'use client'

// Custom component imports
import { DashboardImage } from "./imports/DashboardImage";
import { displayAlert } from "./imports/displayAlert";
// Custom function imports
import { handleFileInput } from "../functions/handler";
import { deleteImage } from "../functions/deleteImage";

export function File() { 
    return ( 
    <div className="col-span-5 xl:col-span-2">
      <div className="rounded-sm border border-stroke bg-white shadow-md shadow-slate-400/50">
        {/* Header */}
        <div className="border-b border-stroke py-4 px-7 bg-orange-600"> 
            <h3 className="font-medium text-white">
            Your Photo
            </h3>
        </div>
        {/* Content */}
        <div className="px-7 py-5"> {/* Form Begins */}
            <form action="#">
            <div className="gap-4">
                { /* row 1 */}
                <div className="flex mb-2 -mt-2">
                    {/* Displays Image + Buttons */}
                    <span className="flex h-20 w-20 max-h-20 max-w-20 rounded-full overflow-hidden border border-stroke bg-indigo-100">
                        <DashboardImage /> {/* Returns 'logo' if user has not given new 'image' input */}
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
                {/* row 2 */}
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
            {/* Save or Cancel */}
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
    )
}