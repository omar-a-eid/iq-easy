import { connectMongo } from "../../util/connectDB";
import Student from "../../models/student";

export default async function student(req, res) {
  await connectMongo();
  const id = req.query.id;
  try {
    const studentData = await Student.findById(id).populate("courses");
    if (!studentData) throw new Error("Server Error");
    return res.status(200).json(studentData);
  } catch (err) {
    return res.status(500);
  }
}
