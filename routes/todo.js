const express = require("express");
const router = express.Router();

const { authenticate } = require("../utils/auth");

const Todo = require("../models/Todo");

router.get("/", authenticate, (req, res) => {
  console.log(req.cookies.authToken);
  if (req.cookies.authToken) {
    Todo.find().then((todos) => {
      res.json(todos);
    });
  } else {
    res.status(400).send();
  }
});

router.post("/add", (req, res) => {
  if (res.cookie.authToken) {
    const [title, content] = req.body;
    Todo.create({ title, content }).then((todo) => {
      res.json(todo);
    });
  } else {
    res.status(400);
  }
});

router.put("/edit/:postId", (req, res) => {
  if (res.cookie.authToken && res.cookie.authToken.token.length > 0) {
    const [title, content] = req.body;
    Todo.findByIdAndUpdate(req.params.postId, { title, content }).then(
      (todo) => {
        res.json(todo);
      }
    );
  } else {
    res.status(400);
  }
});

router.delete("/remove/:postId", (req, res) => {
  if (res.cookie.authToken && res.cookie.authToken.token.length > 0) {
    Todo.findByIdAndDelete(req.params.postId).then((todo) => {
      res.json(todo);
    });
  } else {
    res.status(400);
  }
});

module.exports = router;
