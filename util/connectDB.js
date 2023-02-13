import mongoose from "mongoose";

export const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  if (!process.env.MONGO_URI) {
    console.log("Env isn't provided");
    mongoose.connect(
      "mongodb+srv://omar:fF04J6Mi7kB9WjC6@cluster0.gsxtcow.mongodb.net/?retryWrites=true&w=majority"
    );
  } else {
    mongoose.connect(process.env.MONGO_URI);
  }
};
