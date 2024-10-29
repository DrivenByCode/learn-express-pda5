const mongoose = require("../db");

// 스키마 구성.
const Cat = mongoose.model("Cat", {
  name: String,
});

// find( <조건> ) : 여러개 조회
Cat.find({ name: "야옹이" }).then((data) => {
  console.log(data);
});

// findById( <id> ) : id로 하나 조회 (여러분의 데이터에 있는 _id로)
Cat.findById("6720377e5bfbcf8897830d99").then((data) => console.log(data));

// findOne( <조건> ) : 하나 조회
Cat.findOne({ name: "야옹이" }).then((data) => {
  console.log(data);
});

// deleteOne( <조건> ) : 하나 삭제
Cat.deleteOne({ name: "나비" }).then((data) => {
  console.log(data);
});

// deleteMany( <조건> ) : 여러 데이터 삭제
Cat.deleteMany({ name: "야옹이" }).then((data) => {
  console.log(data);
});

// updateOne( <조건>, <수정할 객체>)
Cat.updateOne({ name: "부엉이" }, { name: "meow" }).then((data) => {
  console.log(data);
});

// updateMany( <조건>, <수정할 객체>)
Cat.updateMany({ name: "부엉이" }, { name: "meow" }).then((data) => {
  console.log(data);
});
