import { connectMongo } from "../../util/connectDB";
import Videos from "../../models/content";

export default async function courses(req, res) {
  await connectMongo();
  try {
    const video = await Videos.findById(req.query.id);
    if (!video) throw new Error("Can't find data");
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
