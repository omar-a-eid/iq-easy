import { connectMongo } from "../../util/connectDB";
import Category from "../../models/category";

export default async function category(req, res) {
  await connectMongo();
  try {
    const categories = await Category.find();

    if (!categories) throw new Error("Can't find data");

    return res.status(200).json({ categories });
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
