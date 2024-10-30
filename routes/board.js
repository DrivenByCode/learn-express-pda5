const express = require("express");
const router = express.Router();

const Board = require("../models/Board");

router.get("/", (req, res, next) => {
  console.log("유저가 보내온 쿠키:", req.cookies);

  Board.find()
    .then((boards) => {
      res.cookie("my-cookie", "cookie-value", {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false, // https일 때만 전송하는 쿠키
        httpOnly: true, // 자바스크립트에서 접근 불가능하게 설정하는지 여부
        signed: false, // 쿠키 자체를 암호화해서 저장
      });
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

// ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
/**
 * 연습문제1.
 *   - 유저가 게시글 상세조회를 할 때마다, 가장 최근에 읽은 게시글 3개를 쿠키에 저장하시오.
 *   - [3]
 *   - [3, 1]
 *   - [3, 1, 2]
 *   - [1, 2, 4]
 */

/**
 * 유저가 게시글 상세조회할때마다 해당하는 라우터의 함수가 실행됨.
 * --> 유저의 게시글 탐색 순서를 쿠키에 저장하여 기록. (기록된 탐색순서 (최대 3개))
 */
// const BOARD_HISTORY_COOKIE = "board-history";

const BOARD_HISTORY_COOKIE = "board-path";

// 67206a15684d658606422644
// 67206c15efd861aa4811ccea
// 67206c1cefd861aa4811ccec
// 67206d15efd861aa4811ccee
// 6721e2b4e0f5b91682934811
// 6721e2bce0f5b91682934813

router.get("/:id", (req, res, next) => {
  // Board.findById(req.param.id).then(board=>{
  Board.findById(req.params.id)
    .then((board) => {
      let boardHistory = req.cookies[BOARD_HISTORY_COOKIE];
      if (boardHistory) {
        boardHistory = JSON.parse(boardHistory);
      } else {
        boardHistory = [];
      }

      // console.log(res);

      // http://localhost:3000/board/6721e2bce0f5b91682934813

      boardHistory.push(board.title);
      if (boardHistory.length > 10) {
        boardHistory.shift();
      }
      res.cookie(BOARD_HISTORY_COOKIE, JSON.stringify(boardHistory), {
        secure: true,
      });
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
