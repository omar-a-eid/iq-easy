import { connectMongo } from "../../util/connectDB";
import Student from "../../models/student";
import * as jose from "jose";

export default async function addProgress(req, res) {
  await connectMongo();
  const id = req.query.id;
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { cookies } = req;
  const jwt = cookies.token;
  const { payload } = await jose.jwtVerify(jwt, secret);
  const student = await Student.findById(payload.aud);
  if (student.courses.some((course) => course.course == id)) {
    return res.status(200).json();
  } else {
    student.courses.push({ course: id });
    student.save();
    return res.status(200).json();
  }
}
