"use client"

import Image from "next/image";

export default function SignIn() {
  return <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <Image src={"/car-logo.png"} alt={'Menu'} width={100} height={100}/>
      </div>
    </label>
  </div>
}