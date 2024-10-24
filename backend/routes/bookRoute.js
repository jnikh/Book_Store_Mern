import express from "express";
import { Book } from "../models/bookModel.js";
 
const route = express.Router();
// route to add the data 
route.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all requried fields: title ,author , publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // route to get books from the database
  route.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(201).send({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //get the book data from on books
  route.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // route  to update a book
  route.put("/:id", async (request, response) => {
      try {
          if(
              !request.body.title ||
              !request.body.author ||
              !request.body.publishYear
          ){
              return response.status(400).send({
                  message:"send all required fields : title, author , publishyear",
              });
          }
          const {id} = request.params;
          const result = await Book.findByIdAndUpdate(id, request.body)
          if(!result){
              return response.status(400).json({message:'Book Not Found'})
          }
          return response.status(200).send({message:"book updated succesfully"})
      } catch (error) {
          console.log(error.message);
          response.status(500).send({message:error.message})
  
      }
  });
  // to delete the book 
  route.delete('/:id' , async (request, response)=>{
      try {
          const { id } = request.params;
          const result = await Book.findByIdAndDelete(id);
  
          if(!result){
              return response.status(400).json({message:"Book not deleted"});
          }
          return response.status(200).send({message:"book deleted"});
      } catch (error) {
          console.log(error.message)
          response.status(500).send({message:error.message});
      }
  })

  export default route;
  