import Table from "./Table";

function About() {
    return ( 
        <section className='px-12 pb-12 bg-slate-100'>
            <header className='w-fit ml-24 pb-12'>
                <h1 className='pt-12 | text-5xl font-semibold text-orange-600 | pb-1.5 border-b-2 border-orange-600'>
                    About [Insert Company Name]
                </h1>
                <sub className='text-3xl font-medium text-orange-600/90'>
                    Learn about our head staff and their roles...
                </sub>
            </header>
            <div id='about' className='ml-24 pb-6 | font-light text-lg'>
                <p className='w-3/5'>
                    [insert company name] opened up in Fall of 2023, with only a few core members on the team. The founder, [insert founder] started from a small dream with a large goal. The goal of making buying and selling cars like buying items from your local grocery store or making an online delivery purchase. Although this began as a seemingly ambitious and difficult goal to achieve, with the help of select members, including [insert cofounder and board members], this goal grew closer to becoming a reality!
                </p>
                <p className='w-3/5'>
                    <br/>
                    As they worked more consistently with what began as a small team, it was only natural that they would expand with time and becoming one of the largest chains of car dealerships in [insert country]! In the table below, you may find members such as [insert role 1] and [insert role 2] who currently hold important roles in the company to ensure service quality or handle the company's finances. Other members who might not impact our dealerships directly include [insert developer] (aka Maddox Harper) who is in charge of maintaining the website you are viewing this text on right now! Learn more about each of these incredible people by interacting with the image of each of our board and/or staff members!
                </p>
            </div>
            <Table />
            
        </section>
     );
}

export default About;