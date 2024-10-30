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
    ref: "Board", // mongoose.models에서 key값으로 참조해서 value값을 가져옴.
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
