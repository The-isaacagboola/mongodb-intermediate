const Author = require("../model/Author.model");
const Book = require("../model/Book.model");

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name and Bio of author",
      });
    }

    const Existing = await Author.find({ name: name });
    console.log(Existing);
    if (!Existing) {
      return res.status(400).json({
        success: false,
        message: "Author already Exists",
      });
    }

    const author = await Author.create({ name, bio });
    res.status(201).json({
      id: author._id,
      success: true,
      message: "Author created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating author",
    });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    if (!authors) {
      return res.status(404).json({
        message: "No authors found",
      });
    }

    res.status(200).json({
      message: "Authors found",
      data: authors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating author",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, year, author } = req.body;
    if (!title || !year || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid title and year of book",
      });
    }

    const findAuthor = await Author.find({ author });
    if (!findAuthor)
      return res.status(404).json({ message: "Author not found" });

    const book = await Book.create(req.body);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not created. Please try again",
      });
    }

    res.status(201).json({
      bookId: book._id,
      success: true,
      message: "Book created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating book",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Can't find full book details. Try again",
    });
  }
};
module.exports = { createAuthor, createBook, getAllAuthors, getBookWithAuthor };
