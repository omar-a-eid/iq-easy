import { connectMongo } from "../../util/connectDB";
import Courses from "../../models/course";
import * as jose from "jose";

export default async function courses(req, res) {
  await connectMongo();
  try {
    const course = await Courses.find({ category: req.query.category });
    return res.status(200).json({ course });
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
