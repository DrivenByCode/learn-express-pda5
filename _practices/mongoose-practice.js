const mongoose = require("../db");

// mongo db는 스키마 리스 지만 mongoose는 스키마를 정하길 권장함.
// 스키마 구성.
const Cat = mongoose.model("Cat", { name: String });

// 객체 만들기
const kitty = new Cat({ name: "야옹이" });

// 저장. kitty.save() Promise 객체
kitty.save().then((data) => {
  console.log("저장된 데이터");
  console.log(data);
});
