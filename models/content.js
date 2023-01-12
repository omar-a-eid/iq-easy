const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Content || mongoose.model("Content", contentSchema);
