const mongoose = require("mongoose");
const Content = require("./content");
const Category = require("./category");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: Content,
        required: true,
      },
    ],
    hours: {
      type: Number,
      required: true,
    },
    lectureNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
