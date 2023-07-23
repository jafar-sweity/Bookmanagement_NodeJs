import express from "express";
import Book from "../types/book.js";
import Data from "../data/tempData.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send(Data);
});

router.get("/booksByName", (req, res) => {
  const bookName = req.query.name;
  let found = Data.some((book) => book.title === bookName);
  if (found) {
    const books = Data.filter((book) => book.title === bookName);
    res.send(books);
  } else {
    res.status(403).send("The Book not found !!");
  }
});
router.get("/booksByPublicationYear", (req, res) => {
  const bookName = Number(req.query.year);
  let found = Data.some((book) => book.publicationYear === bookName);

  if (found) {
    const books = Data.filter((book) => book.publicationYear === bookName);
    res.send(books);
  } else {
    res.status(403).send("The Book not found !!");
  }
});
router.get("/:id", (req, res) => {
  const Id = Number(req.params.id);

  const bookFound = Data.find((s) => s.id === Id);
  if (bookFound) {
    res.send(bookFound);
  } else {
    res.status(400).send(" The Book not found !!");
  }
});

router.post("/", (req, res) => {
  const { id, title, author, publicationYear } = req.body;
  const postId = id;
  const exist = Data.find((book) => book.id === postId);
  if (!exist) {
    if (!id || !title || !author || !publicationYear) {
      res.status(400).send("Need All info :)");
    } else {
      const newBook: Book.book = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear,
      };
      Data.unshift(newBook);
      res.send("done");
    }
  } else res.status(403).send("Book Alrady Exist :(");
});

router.put("/:id", (req, res) => {
  const bookToUpdate = Number(req.params.id);
  let check = false;
  for (let i = 0; i < Data.length; i++) {
    if (bookToUpdate === Data[i].id) {
      Data[i] = { ...Data[i], ...req.body };
      check = true;
    }
  }

  if (check) {
    res.status(200).send("Updated Successfuly");
  } else {
    res.status(403).send("The Book NOT Found !!");
  }
});
router.delete("/:id", (req, res) => {
  const bookToDelete = Number(req.params.id);
  const index = Data.findIndex((book) => book.id === bookToDelete);
  if (index >= 0) {
    Data.splice(index, 1);
    res.send("Deleted successfuly");
  } else {
    res.send("Book Not Found !!!");
  }
});

export default router;
