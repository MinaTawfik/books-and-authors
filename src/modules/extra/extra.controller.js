import Book from '../../../database/models/book.model.js'
import Author from '../../../database/models/author.model.js'

export const getBooksAndAuthors = async (req, res, next)=>{
    try{
        const pageNo = req.params.page
        let perPage = 5
        const foundedBooks = await Book.find().select("-_id -__v -createdAt -updatedAt").limit(pageNo*perPage).skip((pageNo-1)*perPage)
        const foundedAuthors = await Author.find().select("-_id -__v -createdAt -updatedAt").limit(pageNo*perPage).skip((pageNo-1)*perPage)
        res.status(200).json({foundedBooks, foundedAuthors})
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const searchBooks = async (req, res, next)=>{
    try{
        const bookTitle = req.query.title
        const bookAuthor = req.query.author
        
        if(bookTitle && !bookAuthor){
            const foundedBooks = await Book.find({title: bookTitle}).select("-_id -__v -createdAt -updatedAt")
            if (foundedBooks.length===0){
                return res.status(404).json({message: `No books with this title ${bookTitle}`})
            } else {
                return res.status(200).json(foundedBooks)
            }
        } else if (!bookTitle && bookAuthor){
            const foundedBooks = await Book.find({author: bookAuthor}).select("-_id -__v -createdAt -updatedAt")
            if(foundedBooks.length===0){
                return res.status(404).json({message: `No books with this author ${bookAuthor}`})
            } else {
                return res.status(200).json(foundedBooks)
            }
            
        } else if(!bookTitle && !bookAuthor){
            res.status(200).json({message: 'No title or Author given'})
        } else if(bookTitle && bookAuthor){
            res.status(200).json({message: 'Please specify one of title or Author, not both'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const searchAuthors = async (req, res, next)=>{
    try{
        const authorName = req.query.name
        const authorBio = req.query.bio
        
        if(authorName && !authorBio){
            const foundedAuthors = await Author.find({name: authorName}).select("-_id -__v -createdAt -updatedAt")
            if (foundedAuthors.length===0){
                return res.status(404).json({message: `No authors with this name ${authorName}`})
            } else {
                return res.status(200).json(foundedAuthors)
            }
        } else if (!authorName && authorBio){
            const foundedAuthors = await Author.find({bio: authorBio}).select("-_id -__v -createdAt -updatedAt")
            if(foundedAuthors.length===0){
                return res.status(404).json({message: `No authors with this bio ${authorBio}`})
            } else {
                return res.status(200).json(foundedAuthors)
            }
            
        } else if(!authorName && !authorBio){
            res.status(200).json({message: 'No name or bio given'})
        } else if(authorName && authorBio){
            res.status(200).json({message: 'Please specify one of name or bio, not both'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const getAuthorBooks = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const foundedAuthor = await Author.findById({_id}).select("-_id -__v -createdAt -updatedAt").populate([{path:"books", select: "-_id -__v -createdAt -updatedAt"}])
        if(!foundedAuthor){
            return res.status(404).json({message: 'Author not found'})
        } else {
            return res.status(201).json(foundedAuthor)
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    } 
}