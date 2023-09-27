'use client'

// Next component imports
import Image from 'next/image';
// Required images from 'public'
import logo from '@/public/shrunk-car-logo.png';
// Custom module imports
var session = require('../../modules/session');

export function DashboardImage() {// return logo as placeholderImage or user.image 
  const userImage = 'none' as unknown as string;
  if (session.user.image === 'CHANGE THIS BACK TO "true"') {
    console.log(session.user.image)
    return (
    /* Returns 'logo' if user has not given new 'image' input */
    <>
      <Image src={userImage} alt='' style={{objectFit:"contain"}} />
    </>
    )
  }
  if (session.image === null || session.image === undefined)  {
    return (
      <>
        <Image src={logo} alt='' width={0} height={0} style={{objectFit:"fill"}} />
      </>
    )
  }
  else { 
    let imageSource = URL.createObjectURL(session.image);
    console.log(session.image)
    console.log(session.image.name)
    return (
    <>
      <Image src={imageSource} alt='' width={0} height={0} style={{objectFit:"cover", width:'auto', height:'100%', alignSelf:'center'}} />
    </>
    )
  }
}