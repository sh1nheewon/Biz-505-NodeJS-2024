import express from "express";

import DB from "../config/mysql.js";
const router = express.Router();
const dbConn = DB.init();

router.get("/", (req, res) => {

    const sql = "SELECT * FROM tbl_read_book";
    dbConn.query(sql, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.render("books/list", { bookList: result });
        }
    });
});

router.get("/insert", (req, res) => {
    res.render("books/input.pug");
});


router.get("/insert", (req, res) => {
    const isbn = req.body.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const price = req.body.price;

    const params = [isbn, title, author, publisher, price];
    const sql = 
        " INSERT INTO tbl_read_book(isbn, title, author, publisher, price) " + 
        " VALUES ( ?,?,?,?,? ) ";
    dbConn.query(sql, params, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.render("/books/");
        }
    });
});




router.get("/:isbn/detail", (req, res) => {
    const isbn = req.params.isbn;
    console.log(isbn);
    const params = [isbn];
    const sql = " SELECT * FROM tbl_read_book WHERE isbn = ? ";
    dbConn.query(sql, params, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.render("books/detail", { STD: result[0] });
        }
    });
});

router.get("/:isbn/check", (req, res) => {
    const isbn = req.params.isbn;
    const sql = " SELECT isbn FROM tbl_read_book WHERE isbn = ? "
    dbConn.query(sql, [isbn], (err, result) => {
        if (err) {
            return res.json({ result: "ERROR", message: err });
        } else {
            if (result.length > 0) {
                return res.json({ result: "있다", STD: result[0] });
            } else {
                return res.json({ result: "없다", STD: null });
            }
        }
    });
});

router.get("/:isbn/delete", (req, res) => {
    const isbn = req.params.isbn;
    const sql = " DELETE FROM tbl_read_book WHERE isbn = ? ";
    dbConn.query(sql, [isbn], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.redirect("/books/");
        }
    });
});

router.get("/:isbn/update", (req, res) => {
    const isbn = req.params.isbn;
    const sql = " SELECT * FROM tbl_read_book WHERE isbn = ? "
    dbConn.query(sql, [isbn], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.render("books/input", { STD: result[0] });
        }
    });
});

router.post("/:isbn/update", (req, res) => {
    const isbn = req.params.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const translator = req.body.translator;
    const price = req.body.price;
    const discount = req.body.discount;
    const pubdate = req.body.pubdate;
    const page = req.body.page;
    const memo = req.body.memo;
    const description = req.body.description;
    const link = req.body.link;
    const image = req.body.image;

    const params = [
        title, author, publisher, translator, price, discount, pubdate, page, memo, description, pubdate, link, image, isbn,];
    const sql =
        " UPDATE tbl_read_book "
        + " SET title = ?, "
        + " author = ? "
        + " publisher = ? "
        + " translator = ? "
        + " price = ? "
        + " discount = ?, "
        + " pubdate = ?, "
        + " page = ? "
        + " memo = ? "
        + " description = ?, "
        + " link = ? "
        + " image = ? "
        + " WHERE isbn = ? ";

    dbConn.query(sql, params, (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.redirect(`/books/${isbn}/detail`);
        }
    });
});



export default router;