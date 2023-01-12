import { connectMongo } from "../../util/connectDB";
import Courses from "../../models/course";

export default async function courses(req, res) {
  await connectMongo();
  try {
    //const data = await Courses.find().populate("videos");
    const data = await Courses.find();
    if (!data) throw new Error("Can't find data");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
