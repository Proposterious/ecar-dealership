import { StaticImageData } from "next/image";

export interface Car {
    id: number | undefined;
    make_model_id: number | undefined;
    img: StaticImageData;
    year: number | undefined;
    name: string | undefined;
    description: string | undefined;
    msrp: number | undefined;
    invoice: number | undefined;
    created: string | undefined;
    modified: string | undefined;
    
    make_model: {
        id: number | undefined;
        make_id: number | undefined;
        name: string | undefined;
        
        make: {
            id: number | undefined;
            name: string | undefined;
        }
    },
};

export interface UserCar {
    id: string | undefined;
    carId: string | undefined;
    userId: string | undefined;
}