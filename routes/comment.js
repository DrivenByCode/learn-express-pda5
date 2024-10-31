// const express = require("express");
// const router = express.Router();

// const Comment = require("../models/comment");

// router.post("/", (req, res, next) => {
//   console.log(req.body);
//   Comment.create(req.body)
//     .then((comment) => {
//       res.json(comment);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get("/bid", (req, res, next) => {
//   Comment.find(req.params.board.id)
//     .then((comment) => {
//       res.json(comment);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.put("/:author", (req, res, next) => {
//   console.log(req.body);
//   Comment.updateOne({ author: req.params.author }, req.body)
//     .then((comment) => {
//       res.json(comment);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.delete("/:author", (req, res, next) => {
//   console.log(req.body);
//   Comment.deleteOne({ author: req.params.author })
//     .then((comment) => {
//       res.json(comment);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// module.exports = router;

// REST API ()
// REpresentational State Transfer : Application Programming Interface

// URL과 Method만 보아도, 무슨 자원에 대한 어떤 요청인지가 잘 나타내면 좋겠다.
/**
 * GET  /board            : 게시글 리스트를 GET
 * POST /board            : 게시글 등록해줘. POST
 * PUT  /board/<boardId>  : boardId에 해당하는 게시글 수정
 * DELETE /board/<boardId>: boardId에 있는 게시글 삭제
 * GET  /board/<boardId>  : boardId에 해당하는 게시글을 GET
 */

/**
 * GET  /comment              : 댓글 리스트를 GET
 * POST /comment              : 댓글을 등록. POST
 * GET /comment/<commentId>   : commentId에 해당하는 댓글을 조회
 * PUT  /comment/<commentId>  : commentId에 해당하는 댓글을 수정
 * DELETE /comment/<commentId>: commentId에 해당하는 댓글을 삭제
 */

/**
 * GET  /board/<boardId>/comment : boardId에 해당하는 게시글의 댓글 조회
 * POST /board/<boardId>/comment : boardId에 해당하는 댓글 등록
 * PUT  /comment/<commentId>     : commentId에 해당하는 댓글 수정
 * DELETE /comment/<commentId>   : commentId에 해당하는 댓글 삭제
 */

const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

router.get("/:boardId/comment", (req, res) => {
  Comment.find({ board: req.params.boardId }).then((boards) => {
    res.json(boards);
  });
});

router.post("/:boardId/comment", (req, res) => {
  Comment.create({
    board: req.params.boardId,
    content: req.body.content,
    author: req.body.author,
  }).then((result) => {
    res.json(result);
  });
});

router.put("/:commentId", (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, {
    content: req.body.content,
    author: req.body.author,
  }).then((result) => {
    res.json(result);
  });
});

router.delete("/:commentId", (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId).then((result) => {
    res.status(204).json();
  });
});

module.exports = router;
