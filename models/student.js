const mongoose = require("mongoose");

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
        ref: "Course",
      },
      status: {
        type: String,
        enum: ["Progress", "Completed"],
        default: "Progress",
      },
    },
  ],
  code: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Code",
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
});

module.exports =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
