import mongoose from 'mongoose';

// Defining MongoDB details
const uri = process.env.MONGODB_URI as string;
export async function connectMongoDB(action: string) {
  try {
    if (action === 'user') {
      // Connect to the Atlas specified database ('user')
        const connection: any = await mongoose.connect(uri);
        if(connection != null) {
          console.log("Users Database Found, Connection Success")
          return Promise.resolve(true);
        }
      // Connection failed
        else { return Promise.resolve(false); }
    }
    if (action === 'cars') {
      // Connect to the Atlas specified database ('cars')
        const connection: any = await mongoose.connect(uri);
        if(connection != null) {
          console.log("Cars Database Found, Connection Success")
          return Promise.resolve(true)
        }
      // Connection failed
        else { return Promise.resolve(false); }
    }
    else { 
      // Connect to Atlas unspecified database ('test')
        await mongoose.connect(uri)
        console.log("Database Not Specified, Connection Success")
        return Promise.resolve(true)
    }
  } catch (error) {
      // Connection failed
        return Promise.reject(error);
    }
}

