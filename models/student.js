const mongoose = require("mongoose");
const Content = require("./content");
const Course = require("./course");
const Code = require("./code");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  email: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    default: 0,
  },
  courses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: Course,
      },
      status: {
        type: String,
        enum: ["Progress", "Completed"],
        default: "Progress",
      },
      videosCompleted: [
        {
          type: Schema.Types.ObjectId,
          ref: "Content",
        },
      ],
    },
  ],
  videosInProg: [
    {
      video: {
        type: Schema.Types.ObjectId,
        ref: Content,
      },
      courseName: {
        type: String,
      },
      courseId: {
        type: String,
      },
    },
  ],
  code: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Code,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
});

module.exports =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
