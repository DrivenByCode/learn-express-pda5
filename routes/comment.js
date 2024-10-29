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

const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");

router.post("/", (req, res, next) => {
  console.log(req.body);
  Comment.create(req.body)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/bid", (req, res, next) => {
  Comment.find(req.params.bid)
    .then((comment) => {
      res.json(comment);
      console.log(req.params);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:author", (req, res, next) => {
  console.log(req.body);
  Comment.updateOne({ author: req.params.author }, req.body)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:author", (req, res, next) => {
  console.log(req.body);
  Comment.deleteOne({ author: req.params.author })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
