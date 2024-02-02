import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the database connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || "");
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, use a new database connection
  client = new MongoClient(uri || "");
  clientPromise = client.connect();
}

export default clientPromise;
