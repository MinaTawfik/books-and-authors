import Book from '../../../database/models/book.model.js'

export const add = async (req, res, next)=>{
    try {
        const {title, content, author} = req.body
        const newBook = await Book.create({
            title,
            content,
            author
        })
        res.status(201).json({message: 'Book published', newBook})
      } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
      }
}

export const get = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const foundedBook = await Book.findById({_id}).select("-_id")
        if(!foundedBook){
            return res.status(404).json({message: 'Book not found'})
        } else {
            return res.status(201).json(foundedBook)
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    } 
}

export const getall = async (req, res, next)=>{
    try{
        const foundedBooks = await Book.find().select("-_id")
        res.status(201).json(foundedBooks)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const update = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const book = await Book.findById({_id})
        const {title, content, author} = req.body
        if (!book){
            return res.status(404).json({message: 'Book not found'})
        } else {
            book.title = title
            book.content = content
            book.author = author
            const updatedBook = await book.save()
            return res.status(202).json({message: 'Book updated successfully', updatedBook})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const remove = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const book = await Book.findById({_id})
        if (!book){
            return res.status(404).json({message: 'Book not found'})
        } else {
            const deletedBook = await Book.deleteOne({_id:book._id})
            if(deletedBook.deletedCount){
                res.status(202).json({message: 'Book deleted'})
            } else{
                res.status(404).json({message: 'Book not deleted'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}