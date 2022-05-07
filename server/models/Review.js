const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    username: { type: String }, //username
    movie: { type: String }, //movie id
    body: { type: String },
    parentId: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);