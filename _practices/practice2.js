const mongoose = require("../db");

// 스키마 구성.
const Cat = mongoose.model("Cat", { name: String });

// 데이터 여러개 넣기
// insertMany(<배열>)
// insertMay([{데이터 내용}])

Cat.insertMany([{ name: "나비" }, { name: "부엉이" }]).then((data) => {
  console.log("data 저장 완료", data);
});
