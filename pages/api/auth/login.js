import { connectMongo } from "../../../util/connectDB";
import Student from "../../../models/student";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { serialize } from "cookie";

export default async function login(req, res) {
  await connectMongo();
  const { email, password, remember } = req.body;
  try {
    const student = await Student.findOne({ email: email }).populate("code");
    if (!student) {
      const error = new Error("A student with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, student.password);
    if (!isEqual) {
      const error = new Error("Wrong password.");
      error.statusCode = 401;
      throw error;
    }

    const secret = new TextEncoder().encode(
      "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
    );
    const alg = "HS256";

    const jwt = await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg })
      .setSubject(`${student.code.expiration}`)
      .setIssuer(student.isAdmin == true ? "admin" : "")
      .setAudience(student._id.toString())
      .setExpirationTime(remember == "on" ? "10y" : "2h")
      .sign(secret);

    const serialised = await serialize("token", jwt, {
      httpOnly: true,
      secure: "development",
      sameSite: "strict",
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    return res
      .status(200)
      .json({ studentId: student._id.toString(), admin: student.isAdmin });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }
}
