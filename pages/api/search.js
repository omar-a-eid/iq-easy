import { connectMongo } from "../../util/connectDB";
import Code from "../../models/code";

export default async function search(req, res) {
  await connectMongo();

  const { search } = req.query;

  try {
    const code = await Code.findOne({ value: search }).populate("email");
    if (!code) {
      const error = new Error("The code is wrong");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ code: code });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }
}
