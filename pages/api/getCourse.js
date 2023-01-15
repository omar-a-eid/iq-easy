import { connectMongo } from "../../util/connectDB";
import Courses from "../../models/course";
import Student from "../../models/student";
import * as jose from "jose";

export default async function courses(req, res) {
  await connectMongo();
  try {
    const allCourses = await Courses.find();
    const course = await Courses.findById(req.query.course).populate("videos");
    const secret = new TextEncoder().encode(
      "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
    );
    const jwt = req.headers.authorization;
    const { payload } = await jose.jwtVerify(jwt, secret);
    const student = await Student.findById(payload.aud).populate(
      "courses.course"
    );

    if (!allCourses) throw new Error("Can't find data");
    if (!course) throw new Error("Can't find data");
    if (!student) throw new Error("Can't find data");

    return res
      .status(200)
      .json({ all: allCourses, currentCourse: course, student: student });
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
