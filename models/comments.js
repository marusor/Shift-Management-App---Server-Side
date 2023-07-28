let mongoose = require("mongoose");

let commentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  created: { type: String },
  updated: { type: String },
});

module.exports = mongoose.model("Comment", commentsSchema);
