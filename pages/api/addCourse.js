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
      // fs.existsSync(dir, (exist) => {
      //   if (!exist) {
      //     return fs.mkdir(dir, (error) => cb(error, dir));
      //   }
      //   return cb(null, dir);
      // });
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

apiRoute.use(
  upload.fields([{ name: "icon" }, { name: "avatar" }, { name: "videos" }])
);

apiRoute.post(async (req, res) => {
  await connectMongo();
  const name = req.body.name;
  const { icon, avatar, videos } = req.files;
  const videosID = [];
  let hours = 0;
  let time;

  const createVideos = async () => {
    return Promise.all(
      await videos.map(async (video) => {
        time = 0;
        const duration = await getVideoDurationInSeconds(video.path);
        hours += duration;
        time = duration;
        const content = new Video({
          name: video.originalname,
          videoUrl: `/content/${req.body.name}/${video.filename}`,
          time: Math.ceil(time / 60),
        });
        const result = await content.save();
        videosID.push(result._id);
        console.log(videosID);
      })
    );
  };

  createVideos()
    .then((res) => {
      return res;
    })
    .then(() => {
      const course = new Course({
        name: name,
        icon: `/content/${req.body.name}/${icon[0].filename}`,
        avatar: `/content/${req.body.name}/${avatar[0].filename}`,
        videos: videosID,
        hours: Math.ceil(hours / 60),
        lectureNumber: videosID.length,
      });
      return course.save();
    })
    .then(() => res.status(200).json({ data: "success" }))
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
