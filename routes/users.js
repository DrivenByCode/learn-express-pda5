var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  console.log(req.session.viewCount);
  console.log(req.session);
  res.send("respond with a resource");
});

module.exports = router;
