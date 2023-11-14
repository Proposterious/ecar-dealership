"use client"

function Test() {
    return ( 
        <>
        <button onClick={() => {
            console.log(process.cwd() + '/app/carInfo.json')
        }}>
            Check pathc
        </button>
        </>
     );
}

export default Test;