"use client"
// functions
import { useState } from 'react';
import { getCars } from "./handleCars";

// components
import CarList from './components/CarList';
import SortBy from './components/SortBy';
import SearchBar from './components/SearchBar';

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
        <main id="service">
        {/* Focus/Content of Page */}
            <section id="car-grid">
                <CarList />
            </section>

        {/* Bottom Navigation */}
            <section id="car-settings">
                <SortBy />
                <SearchBar />
            </section>

        </main>
    )
   
}

export default Service;