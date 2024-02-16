import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js"; // /modules/file_upload import 하기

// sequelize 를 사용할 때 추가로 제공되는 확장 연산자 : {Op}
import { Op } from "sequelize";

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

const router = express.Router();


// 리스트 전체 보여주기(findAll)
router.get("/", async (req, res) => {
    // || 뒤에 붙이는 것은 기본값(값이 있으면 그대로, 값이 없을 때 기본값으로)
    const p_search = req.query.p_search || "";
    const sort = req.query.sort || "p_code";
    const order = req.query.order || "ASC";

    const rows = await PRODUCTS.findAll({ // 전체 값
        where: { // 검색
            [Op.or]: [
                // like 연산자의 식. Op.or 이라는 조건을 주어야 코드가 실행됨.
                { p_name: { [Op.like]: `%${p_search}%` } },
                { p_code: `${p_search}` },

            ],

        },
        order: [[sort, order]],
    });
    return res.render("product/list", { PRODUCTS: rows, p_search }); // + p_search 를 한번 더 보여줌
});

router.get("/insert", (req, res) => {
    return res.render("product/input");
});


/*
 상품코드는 1자리의 Prefix(P)와 5자리의 연속된 일련번호 형식
 상품코드는 중복되면 절대 안되며, 비어있는(blank, empty) 값도 안된다.
 규칙이 자릿수가 일정한 형태
 새로운 상품코드를 생성하기 위하여 
    1. 기존의 DB Table 에서 가장 큰 상품코드 값을 추출하기
    2. Prefix 분리
    3. 숫자 부분을 분리
    4. 숫자 부분의 문자열을 숫자로 변경하고 +1을 실행
    5. Prefix 와 숫자부분을 결합하여 코드로 생성
    6. 숫자부분의 자릿수를 맞추고 공백부분을 0으로 채워넣어야 함
*/
const makePCode = (pcode) => {
    const pCodePrefix = pcode.substring(0, 1); // P 만 추출
    let pCodeNum = pcode.substring(1); // 1번 index 이후의 값. 숫자만 추출  // 만약 00014 이면
    const pCodeNumLength = pCodeNum.length;

    pCodeNum = String(Number(pCodeNum) + 1);                               // pCodeNum 은 15가 된다
    pCodeNum = "0000000000" + pCodeNum;
    // pCodeNum.length = 10 + 숫자 자릿수 
    // pCodeNum 의 전체 길이에서 원래 코드 숫자부분의 길이 만큼 뺀 위치부터 문자열 잘라내기
    pCodeNum = pCodeNum.substring(pCodeNum.length - pCodeNumLength);
    return `${pCodePrefix}${pCodeNum}`;
};

const makePCodeNew = (pcode) => {
    const pCodePrefix = pcode.substring(0, 1);
    let pCode = pcode.substring(1);
    const pCodeNumLength = pCodeNum.length;
    pCodeNum = String(Number(pCodeNum) + 1);
    /*t
    문자열.padStart(길이, 패턴)
    문자열 값을 전체 "길이" 개수만큼 만들고
    왼쪽에 비어있는 곳은 "패턴"으로 채워넣은 문자열을 생성하라
    */
    pcodeNum = pCodeNum.padStart(pCodeNumLength, "0"); // pCodeNum.length 의 값에서 빈 자리를 "0"으로 채우기
    return `${pCodePrefix}${pCodeNum}`;
};


// import 한 upLoad 를 post 에 추가하기
router.post("/insert", upLoad.single("p_image"), async (req, res) => {
    // single 파일 : 파일 1개만 받기 , "p_image" : input.pug / div.img_box 의 input 의 name

    let pCode = req.body.p_code;
    if (pCode === "000") {
        // findAll() 을 실행한 결과는 비록 SELECT 된 결과가 0 개 또는 1개 뿐이지만, 
        // 결과는 배열(List) type 이다.
        const rows = await PRODUCTS.findAll({ order: [["p_code", "DESC"]], limit: 1 });
        pCode = rows[0].p_code;
        pCode = makePCode(pCode);
        req.body.p_code = pCode;
    }
    const file = req.file;
    if (file) {
        req.body.p_image_name = file.filename;
        req.body.p_image_origin_name = file.originalname;
    }
    //                                                   db에 저장하기
    try {
        await PRODUCTS.create(req.body);
        return res.redirect("/products/"); // 추가가 정상적으로 되면 리스트 화면
    } catch (error) {
        return res.json(error); // 아니면 json
    }
    // return res.json({ body: req.body, file });
});

router.get("/?p_search=", (req, res) => {
    const pName = req.params.p_name;

});


router.get("/:pcode/detail", async (req, res) => {
    const pcode = req.params.pcode;
    const row = await PRODUCTS.findByPk(pcode, {
        include: {
            model: IOLIST,
            as: "IOS",
            include: { model: DEPTS, as: "IO_거래처" },
        },
    });
    return res.render("product/detail", { PRODUCT: row });
});



router.get("/:pcode/update", (req, res) => {
    const pcode = req.params.pcode;
    return res.render("product/update");
});


export default router;