import { log } from "console";
import express from "express";
import Data from "./data/tempData.js";
import Book from "./types/book.js";
import BookRouter from "./router/book.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Define a route
app.use("/book", BookRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
log("jafar is king");


