/**
 * 1. TodoSchema 만들기
 * 2. 로그인한 유저만 TodoSchema를 작성, 수정, 삭제할 수 있게 만들기 (API 및 라우터 만들기)
 * 3. React에서 로그인 구현하고, TodoList 기능 구현하기
 */

var express = require("express");
var router = express.Router();

const User = require("../models/Users");

const { createToken, authenticate } = require("../utils/auth");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
      secure: false,
    });

    console.log(user);

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

router.all("/logout", async (req, res, next) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  // console.log(req.session.viewCount);
  // console.log(req.session);
  res.send("respond with a resource");
});

router.get("/protected", authenticate, async (req, res, next) => {
  console.log(req.user);
  res.json({ data: "민감한 데이터" });
});

module.exports = router;
