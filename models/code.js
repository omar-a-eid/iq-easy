const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const codeSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: Number,
    enum: [0, 1, 6, 12],
    default: 0,
  },
  expiration: {
    type: Date,
  },
  email: { type: Schema.Types.ObjectId, ref: "Student", default: null },
});

module.exports = mongoose.models.Code || mongoose.model("Code", codeSchema);
