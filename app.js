var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const birdRouter = require("./routes/birds");
const commentRouter = require("./routes/comment");

// localhost:3000

var app = express();

// view engine setup
// view는 react를 사용
// view는 json 포매터임
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// middle ware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/hello-world", (req, res, next) => {
  console.log(req);
  console.dir(req);
  res.json({
    title: "HelloWorld",
    data: "blah blah",
  });
});

app.post("/hello-world", (req, res, next) => {
  res.send("This is Post Request");
});

app.put("/hello-world", (req, res, next) => {
  res.send("This is Put Request");
});

app.delete("/hello-world", (req, res, next) => {
  res.send("This is Delete Request");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
app.use("/birds", birdRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.json(res.locals);
});

module.exports = app;
