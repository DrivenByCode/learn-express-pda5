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
const session = require("express-session");

// const cors = require("cors");

// localhost:3000

var app = express();

// view engine setup
// view는 react를 사용
// view는 json을 뿌려주는 역할을 함
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// middle ware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session 설정. express는 설정이든 router든 배열 형태로 전달 되므로, 순서가 중요함.
// 이 곳에 session middleware를 설정한 이유는 아래 요청들에게 영향을 미치기 때문
app.use(
  session({
    secret: process.env.SESSION_SECRET || "<my-secret>",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // https 가능
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("middleware실행!");
  next();
});

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(cors());

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

// router는 반복문을 순회함.
// console찍어서 확인해보기
// console.log(app._router);

// const mongoose = require("./db");

// console.log(mongoose.models);

module.exports = app;
