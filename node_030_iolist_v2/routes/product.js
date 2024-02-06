import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js"; // /modules/file_upload import 하기

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

const router = express.Router();

router.get("/", async (req, res) => {
    const rows = await PRODUCTS.findAll({
        limit: 10,
        order: [["p_code", "ASC"]],
    });
    return res.render("product/list", { PRODUCTS: rows });
});

router.get("/insert", (req, res) => {
    return res.render("product/input");
});
// import 한 upLoad 를 post 에 추가하기
router.post("/insert", upLoad.single("p_image"), (req, res) => {
    // single 파일 : 파일 1개만 받기 , "p_image" : input.pug / div.img_box 의 input 의 name

    const file = req.file;
    return res.json({ body: req.body, file });
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

router.get("/insert", (req, res) => {
    return res.render("product/input");
});


router.get("/:pcode/update", (req, res) => {
    const pcode = req.params.pcode;
    return res.render("product/update");
});

export default router;