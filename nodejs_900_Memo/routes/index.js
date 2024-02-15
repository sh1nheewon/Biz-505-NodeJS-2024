import express from 'express'
import DB from "../models/index.js";

const router = express.Router()
const MEMO = DB.models.tbl_memo;

router.get('/', async (req, res) => {

  const sql = req.params.sql;
  const date = moment().format("YYYY-MM-DD, HH:mm:ss");
  const rows = await MEMO.findAll();

  return res.json(rows);
});

router.post("/", async (req, res) => {

});

router.get('/detail', async (req, res) => {
  res.render("detail");
});
export default router;