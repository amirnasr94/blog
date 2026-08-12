import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongoose || {
  connection: null,
  promise: null,
};

//This prevents creating multiple connections during hot reloads in development.
if (!global.mongoose) {
  global.mongoose = cache;
}

const MONGO_URI = process.env.MONGODB_URI;

async function connectDB(): Promise<typeof mongoose> {
  //if conncection is already established, return it
  if (cache.connection) {
    return cache.connection;
  }
  //create a promise to connect to the database if it doesn't exist
  if (!cache.promise) {
    if (!MONGO_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env",
      );
    }
    //when bufferCommands is set to false, mongoose will not buffer commands if the connection is not established yet.
    //This means that if you try to execute a command before the connection is established,
    //it will throw an error instead of buffering the command and executing it later.
    const options = {
      bufferCommands: false,
    };
    cache.promise = mongoose.connect(MONGO_URI!, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cache.connection = await cache.promise;
    console.log("Connected to DB was successfull!");
  } catch (error) {
    cache.promise = null;
    console.error("Error connecting to DB:", error);
    throw error;
  }

  return cache.connection;
}

export default connectDB;