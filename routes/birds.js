const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Birds home page");
});

router.get("/about", (req, res) => {
  res.send("About birds");
});

router.get("/:birdId", (req, res, next) => {
  if (req.params.birdId === "hi") {
    // 다음 미들웨어를 호출하는 함수
    next();
  } else {
    res.send(`Hi I am ${req.params.birdId}`);
  }
});

router.get("/hi", (req, res) => {
  res.send("Hi I am bird");
});

module.exports = router;
