import { connectMongo } from "../../util/connectDB";
import Student from "../../models/student";
import * as jose from "jose";

export default async function completed(req, res) {
  await connectMongo();
  const id = req.query.id;
  const duration = req.query.duration;

  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { cookies } = req;
  const jwt = cookies.token;
  const { payload } = await jose.jwtVerify(jwt, secret);
  const student = await Student.findById(payload.aud).populate(
    "courses.course"
  );

  student.courses.some((course) => {
    if (!course.videosCompleted.includes(id)) {
      const index = student.videosInProg.findIndex((x) => x.video === id);
      student.videosInProg.splice(index, 1);
      course.videosCompleted.push(id);
      student.hours = student.hours + duration;
      if (course.videosCompleted.length == course.course.lectureNumber) {
        course.status = "Completed";
      }
      student.save();
    }
  });
  return res.status(200).json();
}
