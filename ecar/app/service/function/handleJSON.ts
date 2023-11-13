"use server"
import fs from "fs";
import path from "path";

interface CarAttributes {
    carNames: string[];
    carTypes: string[];
    carMakes: string[];
};

export async function writeCarAttr(cars: any[]) {
    // dynamic vars
    var names: string[] = []; var makes: string[] = []; 
    // static vars
    var types: string[] = ["SUV", "Base", "Coup", "Sedan", "Minivan", "Wagon", "Convertible", "Truck", "Truck (Extended Cab)", "Truck (Double Cab", "Truck (Crew Cab)", "Truck (Regular Cab)"];

    const filePath = process.cwd() + '/app/carInfo.json';
    
    cars.map((car:any) => {
        var carName = `${car.make_model.make.name} ${car.make_model.name}`
        if (names.includes(carName) != true) { names.push(carName) };
        

        var carMake = car.make_model.make.name
        if (makes.includes(car.make_model.make.name) != true) { makes.push(carMake) };
        
    })
    
    const content: CarAttributes = {
        carNames: [...names],
        carMakes: [...makes],
        carTypes: [...types]
    }

    fs.writeFileSync(filePath, JSON.stringify(content), "utf-8");
    // fs.writeFileSync(path + '/ecar/app/service/cars.json', String(cars));
    const data = fs.readFileSync(filePath, "utf-8");
    console.log(JSON.parse(data), "logging cars");
    console.log("filePath", filePath)
}

export async function readCarAttr() {
    const filePath = process.cwd() + '/app/data.json';

    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as any;
        return data as CarAttributes;
    } else { return }
}