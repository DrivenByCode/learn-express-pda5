const express = require("express");
const router = express.Router();

const { authenticate } = require("../utils/auth");

const Todo = require("../models/Todo");

router.get("/", authenticate, (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch(() => res.status(400).send());
});

router.post("/", authenticate, (req, res) => {
  const { text, color } = req.body;
  Todo.create({ text, color })
    .then((todo) => {
      res.json(todo);
    })
    .catch(() => res.status(400));
});

router.put("/edit/:postId", authenticate, (req, res) => {
  const { text, color } = req.body;
  Todo.findByIdAndUpdate(req.params.postId, { text, color })
    .then((todo) => {
      res.json(todo);
    })
    .catch(() => res.status(400).send());
});

router.delete("/remove/:postId", authenticate, (req, res) => {
  Todo.findByIdAndDelete(req.params.postId)
    .then((todo) => {
      res.json(todo);
    })
    .catch(() => res.status(400).send());
});

module.exports = router;
