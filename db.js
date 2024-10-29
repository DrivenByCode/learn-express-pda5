const mongoose = require("mongoose");
const MONOGO_HOST =
  "mongodb+srv://admin:admin1234!!@cluster0.01nj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONOGO_HOST, {
    retryWrites: true,
    w: "majority",
  })
  .then((db) => {
    console.log("db connected");
    // console.log(db);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
