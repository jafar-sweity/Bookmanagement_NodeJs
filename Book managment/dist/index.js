import { log } from "console";
import express from "express";
import BookRouter from "./router/book.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/health", function (req, res) {
    res.sendStatus(200);
});
// Define a route
app.use("/book", BookRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
log("jafar is king");
