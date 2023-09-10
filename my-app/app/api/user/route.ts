//import type { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse } from 'next/server'
import { connectMongoDB } from "../../lib/mongodb";
import { hash } from "bcrypt"
import User from "../../models/user";

// Processes 'POST' Request
export async function POST(req: Request) {
    connectMongoDB().catch(err => NextResponse.json(err));
    // Process a POST request
    if (!req.body) {
        console.log("Error: 400")
        return NextResponse.json({error: 'Data is missing...'}, { status: 400 })
    }
    // Define mongoose variables from 'request' then find in db
    const data = await req.json();
    const userExists = await User.findOne({email: data.email})
    // Throw error if user exists in db
    if (userExists) { 
        console.log("Error: 500")
        return NextResponse.json({error: "User Already Exists"}, { status: 500 })
    }
    // Throw error if not valid password
    else {
        console.log("Executing User Creation")
        if (JSON.stringify(data.password) === undefined) {
            console.log("Invalid Information")
            return NextResponse.json({error: "Password should be at least 6 characters long"}, { status: 409 });
        }
        // Encrypt password
        const hashedPassword = await hash(data.password, 12);

        User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword
        })
        // Log creation
        console.log("User created")
    }
}

