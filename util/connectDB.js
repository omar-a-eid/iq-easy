import mongoose from "mongoose";

export const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI);
};
