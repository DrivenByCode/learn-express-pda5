// const mongoose = require("../db");

// const commentSchema = new mongoose.Schema({
//   content: { type: String, required: true },
//   author: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Comment = mongoose.model("Comment", commentSchema);

// module.exports = Comment;

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: String,
  board: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Board",
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;