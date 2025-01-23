const express = require("express");
const {
  createAuthor,
  createBook,
  getAllAuthors,
  getBookWithAuthor,
} = require("../controllers/book.contoller");
const router = express.Router();

router.get("/authors", getAllAuthors);
router.post("/create", createBook);
router.post("/new-author", createAuthor);
router.get("/:id", getBookWithAuthor);
module.exports = router;
