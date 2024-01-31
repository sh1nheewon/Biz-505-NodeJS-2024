import express from 'express'
import DB from "../models/index.js";
const USER = DB.models.tbl_members;
const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource')
})

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 회원가입하기 */
/*
  GET http://localhost:3000/users/join 으로 요청이 되면
  GET Method 요청
    Browser 의 주소창에 입력한 후 Enter 를 눌러 요청
    Nav 의 Menu 를 클릭할 때
    a tag 의 링크를 클릭할 때
*/
router.get("/join", async (req, res) => {
  res.render("users/join");
});


/*
  POST http://localhost:3000/users/join 으로 요청이 되면
  POST Method
    form(method="POST") 이 감싸고 있는 input tag 에 입력된 값을
    HTTP Body 에 담아서 서버에 보낼때

    Client 가 데이터를 대량으로 보내면서
    이 데이터를 처리해줘 라는 요청
*/
router.post("/join", async (req, res) => {
  /*
  회원가입 요청이 들어오면
  현재 tbl_members table 에서 회원전체를 조회
  조회된 회원이 없으면 지금 요청된 회원이 ADMIN 이다
  그렇지 않으면 요청된 회원은 일반 USER 이다

  req.body 데이터에 m_role 이라는 속성을 생성하면서 
  그 값에 ADMIN 또는 USER 라는 문자열을 저장한다

  있으면 USER 로 표시, 없으면 USER m_role 을 생성
  create 로 생성(insert)
  */
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }
  const result = await USER.create(req.body);
  return res.json(result);
});


/*
  GET http://localhost:3000/users/callor/check 라는 요청이 되면
  callor 라는 사용자 정보가 Table 에 저장되어 있냐 라는 것을 묻기
  있으면 MESSAGE = "FOUND" 응답, 없으면 MESSAGE = "NOT FOUND" 라고 응답.
*/
router.get("/:username/check", async (req, res) => {
  const username = req.params.username;
  const row = await USER.findByPk(username);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 로그인하기 */

router.get("/login", async (req, res) => {
  res.render("users/login");
});

/*
  사용자가 login 화면에서 로그인을 실행하면
  요청을 처리할 router 를 만들고
  DB 에서 사용자 정보를 조회한 후
  DB 에 저장된 사용자 인지 아닌지 여부를 응답
*/
/* DB 에 저장된 사용자 정보 조회 후 입력한 값과 맞는지 비교 후 json 으로 출력 */
router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;

  const result = await USER.findByPk(username);
  if (!result) {
    return res.json({ MESSAGE: "USER NOT FOUND" });
  } else if (result.m_username === username && result.m_password !== password) {
    return res.json({ MESSAGE: "PASSWORD WRONG" });
  } else if (result.m_username === username && result.m_password === password) {
    return res.json({ MESSAGE: "LOGIN OK" });
  }
});


export default router

/*

  회원가입 정책(policy) 설정
  최초로 가입하는 회원은 ADMIN
  ADMIN 은 현재 애플리케이션의 모든 기능을 다 사용할 수 있다

  두번째 부터 가입하는 회원은 USER
  USER 는 자신의 MyPAGE 와 일부 기능은 제한적으로 접근할 수 있다

*/