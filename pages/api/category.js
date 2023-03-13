import { connectMongo } from "../../util/connectDB";
import Category from "../../models/category";
import nextConnect from "next-connect";
import fs from "fs";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./public/content/category`;
      if (fs.existsSync(dir)) {
        return cb(null, dir);
      } else {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.fields([{ name: "icon" }]));

apiRoute.post(async (req, res) => {
  console.log("hey");
  await connectMongo();
  const name = req.body.name;
  const desc = req.body.desc;
  const { icon } = req.files;
  console.log(icon);
  const category = new Category({
    name: name,
    desc: desc,
    icon: `/content/category/${icon[0].filename}`,
  });
  await category.save();
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
