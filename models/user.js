let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  permission: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  created: { type: String },
  updated: { type: String },
});

module.exports = mongoose.model("User", userSchema);
