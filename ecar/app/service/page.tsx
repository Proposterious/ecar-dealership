// custom components
import CarList from './components/CarList';
import SortByOrder from './components/SortByOrder';
import SortByPage from './components/SortByPage';
import ServiceAlert from './components/ServiceAlert';

function Service() {
    return (
        <>
            <ServiceAlert />
            <main id="service" className="min-h-fit border-2 bg-orange-200 border-orange-700">
            {/* Focus/Content of Page */}
                <CarList />
            {/* Bottom Navigation */}
                <section className="bg-slate-700/80">
                    <SortByOrder />
                    <SortByPage />
                </section> 
            </main>
        </>
    )
   
}

export default Service;