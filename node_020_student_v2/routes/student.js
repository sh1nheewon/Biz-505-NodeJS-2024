/*
    express 프레임워크를 사용하여
    router 객체 생성
*/
import express from "express"

const router = express.Router();

// localhost:3000/student/
router.get("/", (req, res) => {
    // 문자열을 아무런 가공, 디자인 없이 그대로 client 에서 응답하기
    // res.send("누군가 나를 req")
    res.render("student/list");
});

router.get("/insert", (req, res) => {
    res.render("student/input");
});



// router 객체를 다른곳에서 import 할 수 있도록 export 하기
export default router;




//import+export 하고 app.js 에서 import 하고(24), app.use 해주기(52번)