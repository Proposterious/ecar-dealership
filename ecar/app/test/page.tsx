'use client'

function Test() {
    const data = {
        name: 'name', 
        fullName: 'fullname', 
        bio: 'bio',
        phoneNumber: 'phonenumber',
        email: 'email',  
    }
    const newData = Object.values(data);
    return (
        <div className='flex justify-around items-center min-h-screen bg-black w-full'>
            <div className='loader'></div>
            <div className='text-white text-2xl'>{...newData}</div>
            <div className="grid grid-cols-3 divide-x">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
      </div>
    )
}

export default Test;