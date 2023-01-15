import { connectMongo } from "../../util/connectDB";
import Courses from "../../models/course";

export default async function searchCourses(req, res) {
  await connectMongo();

  const { search } = req.query;

  const courses = await Courses.find({
    name: { $regex: search, $options: "i" },
  });
  return res.status(200).json({ results: courses });
}
