import mongoose from "mongoose";

export const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  if (!process.env.MONGO_URI) {
    console.log("Env isn't provided");
  }
  mongoose.connect(process.env.MONGO_URI);
};
