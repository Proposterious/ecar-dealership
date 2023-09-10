import mongoose from 'mongoose';

// Defining MongoDB details
const url = process.env.MONGODB_URI as string;
const dbName = "eCar-Dealer";

export async function connectMongoDB() {
  try {
      // Connect to the Atlas cluster
        const connection: any =  await mongoose.connect(url);
        if(connection != null) {
          console.log("success")
          return Promise.resolve(true)
        }
      } catch (error) {
          return Promise.reject(error);
    }
}

connectMongoDB().catch(console.dir);
