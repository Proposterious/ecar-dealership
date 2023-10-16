"use client"
// functions
import { useState } from 'react';
import { getCars } from "./handleCars";

// components
import CarList from './components/CarList';
import SortBy from './components/SortBy';
import SearchBar from './components/SearchBar';
import ServiceAlert from './components/ServiceAlert';

function Service() {
    const [data, setData] = useState(null) as any;

    async function displayPage() {
        // Fetch data from 'carapi'
        var carArray = await getCars() as any;
        console.log(carArray)
        
        // Update data 'useState'
        setData(carArray);

    }

    async function displayImage() {
        
    }

    return (
        <>
            <ServiceAlert />
            <main id="service" className="min-h-screen max-h-full border-2 border-orange-700">
            {/* Focus/Content of Page */}
                <CarList />
            {/* Bottom Navigation */}
                <SortBy />
                <SearchBar />
            </main>
        </>
    )
   
}

export default Service;