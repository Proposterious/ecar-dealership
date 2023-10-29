import Table from "./Table";

function About() {
    return ( 
        <section className='n-xs:px-4 n-md:px-8 n-lg:px-12 pb-12 bg-slate-100'>
            <header className='w-fit n-xs:mx-auto n-lg:ml-24 n-xs:pb-4 n-md:pb-8 n-lg:pb-12'>
                <h1 className='pt-12 | n-xs:text-3xl n-md:text-5xl font-semibold text-orange-600 | pb-1.5 border-b-2 border-orange-600'>
                    About [Insert Company Name]
                </h1>
                <sub className='n-xs:text-xl n-md:text-3xl font-medium text-orange-600/90'>
                    Learn about our head staff and their roles...
                </sub>
            </header>
            <div id='about' className='n-lg:ml-24 n-md:pb-6 | font-light n-xs:text-normal n-md:text-lg'>
                <p className='n-xs:w-4/5 n-xs:mx-auto n-xs:my-2 n-xs:line-clamp-6 n-xs:bg-slate-300 n-xs:p-1 | n-lg:w-3/5 n-lg:mx-0 n-md:my-3 n-md:line-clamp-none'>
                    [insert company name] opened up in Fall of 2023, with only a few core members on the team. The founder, [insert founder] started from a small dream with a large goal. The goal of making buying and selling cars like buying items from your local grocery store or making an online delivery purchase. Although this began as a seemingly ambitious and difficult goal to achieve, with the help of select members, including [insert cofounder and board members], this goal grew closer to becoming a reality!
                </p>
                <p className='n-xs:w-4/5 n-xs:mx-auto n-xs:my-2 n-xs:line-clamp-6 n-xs:bg-slate-300 n-xs:p-1 | n-lg:w-3/5 n-lg:mx-0 n-md:my-3 n-md:line-clamp-none'>
                    As they worked more consistently with what began as a small team, it was only natural that they would expand with time and becoming one of the largest chains of car dealerships in [insert country]! In the table below, you may find members such as [insert role 1] and [insert role 2] who currently hold important roles in the company to ensure service quality or handle the company's finances. Other members who might not impact our dealerships directly include [insert developer] who is in charge of maintaining the website you are viewing this text on right now! Learn more about each of these incredible people by interacting with the image of each of our board and/or staff members!
                </p>
            </div>
            <Table />
            
        </section>
     );
}

export default About;