import mongoose from "mongoose";

export const connection = async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/books-and-authors");
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
