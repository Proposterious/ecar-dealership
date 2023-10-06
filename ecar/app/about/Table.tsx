// Image Support & Imports
import Image from 'next/image';
import logo from '@/public/car-logo.png';


function Table() {
    const person1 = {
        id: 1,
        name: 'Maddox Harper',
        image: logo,
        position: 'CEO',
        description: 'Founder of Project',
        joinedIn: 'Fall 2023'
    }
    const person2 = {
        id: 2,
        name: 'Maddox Harper',
        image: logo,
        position: 'Web Developer',
        description: 'Creator of Website UX/UI',
        joinedIn: 'Fall 2023'
    }
    const person3 = {
        id: 3,
        name: 'Maddox Harper',
        image: logo,
        position: 'Software Engineer',
        description: 'In the Near Future',
        joinedIn: 'Fall 2023'
    }
    const person4 = {
        id: 4,
        name: 'Maddox Harper',
        image: logo,
        position: 'Head of Council',
        description: 'Highest Member of Board',
        joinedIn: 'Fall 2023'
    }
    const person5 = {
        id: 5,
        name: 'Maddox Harper',
        image: logo,
        position: 'Council Secretary',
        description: 'Bro sucks at documentation',
        joinedIn: 'Fall 2023'
    }
    const person6 = {
        id: 6,
        name: 'Maddox Harper',
        image: logo,
        position: 'Head of Finance',
        description: 'He is why I am broke',
        joinedIn: 'Fall 2023'
    }
    const person7 = {
        id: 7,
        name: 'Maddox Harper',
        image: logo,
        position: 'Innovations Lead',
        description: 'uhhhh.........',
        joinedIn: 'Fall 2023'
    }
    const person8 = {
        id: 8,
        name: 'Maddox Harper',
        image: logo,
        position: 'Communications Lead',
        description: 'Speaks to the voices in my head',
        joinedIn: 'Fall 2023'
    }
    const person9 = {
        id: 9,
        name: 'Maddox Harper',
        image: logo,
        position: 'Board Member',
        description: 'Currently Being Held Captive',
        joinedIn: 'Fall 2023'
    }

    const persons = [person1, person2, person3, person4, person5, person6, person7, person8, person9];

    return ( 
        <article className='my-8'>
            <div id='headStaff' className='mx-auto | grid grid-cols-3 col-span-3 gap-y-12'>

                { persons.map((person) => { return (
                    <div className='mx-auto | text-xl font-semibold'>
                        
                        <ul key="id" className='space-y-1 text-center'>
                            <li key="person" className='w-48 h-48 mx-auto'>
                                <Image src={person.image} alt={person.name}
                                className='bg-black' 
                                style={{objectFit: 'fill'}} />
                            </li>  
                            <li key="name" className='text-black font-semibold text-2xl'>Name: {person.name}</li>
                            <li key="position" className='text-orange-600 font-bold text-2xl'>
                                Position: {person.position}
                            </li>
                            <li key="description" className='text-slate-800'>
                                {person.description}
                            </li>
                            <li key="joinedIn" className='text-slate-700'>
                                Since {person.joinedIn}
                            </li>
                        </ul>
                    </div>
                    )}
                )}

            </div>
        </article>
     );
}

export default Table;