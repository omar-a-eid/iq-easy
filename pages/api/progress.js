import { connectMongo } from "../../util/connectDB";
import Student from "../../models/student";
import * as jose from "jose";

export default async function progress(req, res) {
  await connectMongo();
  const id = req.query.id;
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { cookies } = req;
  const jwt = cookies.token;
  const { payload } = await jose.jwtVerify(jwt, secret);
  const student = await Student.findById(payload.aud);
  if (
    !student.videosInProg.some((video) => video.video == id) &&
    !student.courses.some((course) =>
      course.videosCompleted.some((video) => video == id)
    )
  ) {
    student.videosInProg.push({
      video: id,
      courseId: req.query.courseId,
      courseName: req.query.courseName,
    });
    student.save();
  }
  return res.status(200).json();
}
