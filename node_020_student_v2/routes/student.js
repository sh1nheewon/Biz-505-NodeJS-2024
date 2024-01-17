/*
    express 프레임워크를 사용하여
    router 객체 생성
*/
import express from "express";
/*
    mysql.js 에서 선언하고 export 한 dbCreate 를 
    import DB 라는 이름으로 사용하겠다
*/

import DB from "../config/mysql.js";
const router = express.Router();
// dbCreate 에서 선언된 init() 함수를 호출하여 return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();

// localhost:3000/student/
router.get("/", (req, res) => {
    // 문자열을 아무런 가공, 디자인 없이 그대로 client 에서 응답하기
    // res.send("누군가 나를 req")
    const sql = "SELECT * FROM tbl_student";
    dbConn.query(sql, (err, result) => {
        if (err) {
            return res.json(err); // err가 있으면 데이터를 화면에 출력 + json(err)로 보내기.
        } else {
            // return res.json(result);
            return res.render("student/list", { stList: result });
        }
    });
});


// localhost:3000/student/insert -> 주소를 입력하면 input.pug 파일을 열기
// GET: localhost:3000/student/insert  -> 데이터를 입력
router.get("/insert", (req, res) => {
    res.render("student/input.pug");
});

// POST: localhost:3000/student/insert  -> 데이터를 문서로 보낼 때 POST
router.post("/insert", (req, res) => {
    // form 을 통해 전달된(전송된) 데이터를 (임시)변수에 저장해 두기
    const st_num = req.body.st_num;
    const st_name = req.body.st_name;
    const st_dept = req.body.st_dept;

    // DB 에 insert 하기 위해 배열 type 으로 변환시켜야함
    // const params = [req.body.st_num, req.body.st_name, req.body.st_dept] : 변수 선언 없이 사용하는 코드
    const params = [st_num, st_name, st_dept];
    const sql = " INSERT INTO tbl_student(st_num, st_name, st_dept) "
        + " VALUES( ?,?,?) "

    dbConn.query(sql, params, (err, result) => {
        if (err) {
            return res.json(err)
        } else {
            // INSERT(추가)가 성공한 경우 List 를 보여주는 화면으로 화면 전환해라.
            return res.redirect("/student/");
        }
    });
});

// ex) GET: localhost:3000/student/이몽룡/detail 
// ex) GET: localhost:3000/student/홍길동/detail 
// GET: localhost:3000/student/학번/detail 요청을 하면 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
router.get("/:st_num/detail", (req, res) => {
    // 주소에 포함되어 전달된 값을 변수에 저장하기
    const st_num = req.params.st_num;
    const params = [st_num];
    const sql = " SELECT * FROM tbl_student WHERE st_num = ? "
    dbConn.query(sql, params, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            // return res.json(result);
            return res.render("student/detail", { STD: result[0] });  // 배열로 선언되어서 결과값도 배열. [0] 넣어줘야함
        }
    });
});


// router 객체를 다른곳에서 import 할 수 있도록 export 하기
export default router;


//import+export 하고 app.js 에서 import 하고(24), app.use 해주기(52번)