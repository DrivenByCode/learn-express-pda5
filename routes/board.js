const express = require("express");
const router = express.Router();

const Board = require("../models/Board");

router.get("/", (req, res, next) => {
  Board.find()
    .then((boards) => {
      res.json(boards);
    })
    .catch((err) => {
      next(err);
    });
});

// https://search.naver.com/search.naver?query=무역전쟁&where=news
// https:            <Protocol>
// search.naver.com  <Host, Domain>
// /search.naver     <Path>
// ?query=무역전쟁&where=news
// <Parameter, QueryParameter, QueryString, QuerySet

router.get("/:id", (req, res, next) => {
  // url에 /:id (콜론으로 시작하는 문자열은 parameters)
  // ==> req.params로 해당하는 문자열에 접근할 수 있다.
  // 만약 /:id/reviews/:reviewId
  // ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}

  console.log(req.params);
  // Board.findById(req.param.id).then(board=>{
  Board.findById(req.params.id)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  Board.create(req.body)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
