// 연결 : app.js 에서 선언
import express from "express";
import DB from "../models/index.js";
// seq 에서는 위 코드만 가져오면 설정됨

const router = express.Router();
const BOOK = DB.models.tbl_books;

// query 문장이 필요 없는 코드

router.get("/", async (req, res) => {
    try {
        const rows = await BOOK.findAll(); //seq 에만 있는 함수 : 모든 것을 찾아서 rows 에 담아라 findAll 을 rows 에 담아서 books/list 에 렌더링하기
        return res.render("books/list", { books: rows });
    } catch (error) {
        return res.json(err);
    }
});

router.get("/insert", async (req, res) => {
    // 각 요소의 값이 defaultValue 로 채워진 Data 객체 만들기
    //const book_data = new BOOK();
    const book_data = await BOOK.build();
    return res.render("books/input", { book: book_data });
});

router.post("/insert", async (req, res) => {
    const book_data = req.body; // req.body 에 있는 데이터를 통째로 book_data 변수에 담는다
    try {
        await BOOK.create(book_data);
        return res.redirect("/books")
    } catch (error) {
        return res.json(err);
    }
});

router.get("/:isbn/detail", async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const row = await BOOK.findByPk(isbn); // pk를 기준으로 find 하기. 그 값을 row 에 담기.
        return res.render("books/detail1", { book: row });
    } catch (error) {
        return res.json(error);
    }
});

router.get("/:isbn/update", async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const row = await BOOK.findByPk(isbn);
        return res.render("books/input", { book: row });
    } catch (error) {
        return res.json(error);
    }
});

router.post("/:isbn/update", async (req, res) => {
    const book_data = req.body;
    const isbn = req.params.isbn;
    try { // BOOK 에서 update 후 where 조건절 시행
        await BOOK.update(book_data, {
            where: { isbn: isbn },  // {isbn:isbn} = {isbn} ==> 이름 같으면 하나로
        });
        return res.redirect(`/books/${isbn}/detail`);
    } catch (error) {

    }
});

router.get("/:isbn/delete", async (req, res) => {
    const isbn = req.params.isbn;
    try {
        await BOOK.destroy({
            where: { isbn }
        });
        return res.redirect("/books")
    } catch (error) {
        return res.json(err);
    }
});

export default router;