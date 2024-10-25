import { PORT, mongoDBURL } from "./config.js";
import express, { request, response } from "express";
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js"
import cors from 'cors';
const app = express();

app.use(express.json());

//middleware for handling cors policy
app.use(cors());

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))


app.get("/", (request, response) => {
  return response
    .status(200)
    .send(`<h1>Welcome to the nikhil Book store app</h1>`);
});

app.use('/books', booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT} successfully`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
