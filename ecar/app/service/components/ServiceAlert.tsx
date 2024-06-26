"use client"
function ServiceAlert() {

    function removeAlert() {
        const alert = document.getElementById("service-alert") as unknown as HTMLElement;
        console.log("Removing alert...", alert);
        alert.className = 'hidden';
    }

    return ( 
    <section id="service-alert" className="w-full h-fit py-8 fixed bottom-0 z-50 bg-orange-600 n-xs:block n-lg:hidden">
        <div className="flex flex-col n-md:flex-row justify-evenly text-lg">
            <div className='font-semibold text-white text-center hover:cursor-default'>
                This is an alert that pops up every time you enter this page. This button only appears on small screens. We recommend you view this on a desktop or a larger screen.
            </div>
            <button onClick={removeAlert} className="my-auto px-6 closebtn">&times;</button>
        </div>
    </section>
     );
}

export default ServiceAlert;