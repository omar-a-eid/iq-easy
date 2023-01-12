import { connectMongo } from "../../util/connectDB";
import Course from "../../models/course";
import Video from "../../models/content";
import nextConnect from "next-connect";
import getVideoDurationInSeconds from "get-video-duration";
import fs from "fs";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./public/content/${req.body.name}`;
      fs.exists(dir, (exist) => {
        if (!exist) {
          return fs.mkdir(dir, (error) => cb(error, dir));
        }
        return cb(null, dir);
      });
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

apiRoute.use(
  upload.fields([
    { name: "icon", maxCoumt: 1 },
    { name: "avatar", maxCoumt: 1 },
    { name: "videos", maxCoumt: 100 },
  ])
);

apiRoute.post(async (req, res) => {
  await connectMongo();
  const name = req.body.name;
  const { icon, avatar, videos } = req.files;
  const videosID = [];
  let hours = 0;

  const createVideos = async () => {
    return Promise.all(
      videos.map(async (video) => {
        getVideoDurationInSeconds(video.path).then((duration) => {
          hours += duration;
        });
        const content = new Video({
          name: video.originalname,
          videoUrl: `/content/${req.body.name}/${video.filename}`,
        });
        const result = await content.save();
        videosID.push(result._id);
      })
    );
  };

  createVideos()
    .then(async () => {
      const course = new Course({
        name: name,
        icon: `/content/${req.body.name}/${icon[0].filename}`,
        avatar: `/content/${req.body.name}/${avatar[0].filename}`,
        videos: videosID,
        hours: hours / 60,
        lectureNumber: videosID.length,
      });
      await course.save();
      res.status(200).json({ data: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
