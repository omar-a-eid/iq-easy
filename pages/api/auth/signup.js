import { connectMongo } from "../../../util/connectDB";
import Student from "../../../models/student";
import Code from "../../../models/code";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { serialize } from "cookie";

export default async function signup(req, res) {
  await connectMongo();
  const { name, email, password, code } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const codeR = await Code.findOne({ value: code });
    const student = await Student.findOne({ email: email });

    if (student) {
      const error = new Error("The Email is already used");
      error.statusCode = 401;
      throw error;
    }
    if (codeR.email) {
      const error = new Error("The Code is already used");
      error.statusCode = 401;
      throw error;
    }
    if (codeR) {
      const student = new Student({
        name,
        email,
        password: hashedPw,
        code: codeR._id,
      });
      const result = await student.save();
      codeR.email = result._id;
      await codeR.save();

      const secret = new TextEncoder().encode(
        "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
      );
      const alg = "HS256";

      const jwt = await new jose.SignJWT({ "urn:example:claim": true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer()
        .setAudience(result._id.toString())
        .setExpirationTime("2h")
        .sign(secret);

      const serialised = await serialize("token", jwt, {
        httpOnly: true,
        secure: "development",
        sameSite: "strict",
        path: "/",
      });
      res.setHeader("Set-Cookie", serialised);
      return res.status(201).json({ studentId: result._id.toString() });
    } else {
      const error = new Error("Wrong Code");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }
}
