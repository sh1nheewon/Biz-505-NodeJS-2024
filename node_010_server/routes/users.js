import express from 'express'
const router = express.Router()

/* GET users listing. */      // get'/' 는 중복 X.
router.get('/', async (req, res, next) => {
  const st_name = req.query.name || "이름을 전달해 주세요";
  const st_dept = req.query.dept || "학과를 전달해 주세요";
  const st_grade = req.query.grade || 0;
  const student = {   // student 라는 DTO 선언
    name: st_name,
    dept: st_dept,
    grade: st_grade,
  }
  res.render("users", student); // student 를 users에 보냄. 변수가 각각 출력됨
}); // router.get("/")

// 주소창에 정보가 나오면 get.  /form 에서 method 를 post 로 선언. router.post 
router.post("/", async (req, res) => {
  // const name = req.body.name;
  // const grade = req.body.grade;
  // const dept = req.body.dept;
  // 위 3개 코드를 합하게 되면 아래 코드가 됨.
  const { name, grade, dept } = req.body;

  res.render("users", { name, grade, dept });
})
export default router
