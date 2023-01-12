import { connectMongo } from "../../util/connectDB";
import Code from "../../models/code";

export default async function search(req, res) {
  await connectMongo();

  const { sub, codeValue } = req.body;

  try {
    const code = await Code.findOne({ value: codeValue }).populate("email");
    if (!code) {
      const error = new Error("The code is wrong");
      error.statusCode = 401;
      throw error;
    }
    const date = new Date();
    const newDate = new Date(date.setMonth(date.getUTCMonth() + sub));

    code.subscription = sub;
    code.expiration = newDate;
    await code.save();
    return res
      .status(200)
      .json({ code: code, message: "Updated Successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }
}
