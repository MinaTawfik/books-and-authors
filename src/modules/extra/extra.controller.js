import Book from '../../../database/models/book.model.js'
import Author from '../../../database/models/author.model.js'

export const getBooksAndAuthors = async (req, res, next)=>{
    try{
        const foundedBooks = await Book.find().select("-_id -__v -createdAt -updatedAt")
        const foundedAuthors = await Author.find().select("-_id -__v -createdAt -updatedAt")
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

// export const getSpecificModels = async (req, res, next)=>{
//     try{
//         const models = req.query.model
//         const foundedCars = await Car.find({name: models}).select("name model rentalStatus -_id -__v -createdAt -updatedAt")
//         res.json(foundedCars)
//     } catch (error) {
//         res.json({message: 'Error detected', error})
//     }
// }


// export const getSpecificAvailableModels = async (req, res, next)=>{
//     try{
//         const model = req.query.model
//         const foundedCars = await Car.find({name: model, rentalStatus: "available"}).select("name model rentalStatus -_id -__v -createdAt -updatedAt")
//         res.json(foundedCars)
//     } catch (error) {
//         res.json({message: 'Error detected', error})
//     }
// }


// export const getRentedOrModel = async (req, res, next)=>{
//     try{
//         const type = req.params.type
//         if(type=="rented"){
//             const foundedCars = await Car.find({rentalStatus: type}).select("name model rentalStatus -_id -__v -createdAt -updatedAt")
//             if(foundedCars.length===0){
//                 return res.json({message: 'No cars rented'})
//             }
//             return res.json(foundedCars)
//         } else {
//             const foundedCars = await Car.find({name: type}).select("name model rentalStatus -_id -__v -createdAt -updatedAt")
//             if(foundedCars.length===0){
//                 return res.json({message: 'No cars for this model'})
//             }
//             return res.json(foundedCars)
//         }
//     } catch (error) {
//         res.json({message: 'Error detected', error})
//     }
// }

// export const getRentedOrAvailable = async (req, res, next)=>{
//     try{
//         const status = req.params.status
//         const model = req.params.model
//         const foundedCars = await Car.find({rentalStatus: status, name: model}).select("name model rentalStatus -_id -__v -createdAt -updatedAt")
//         if(foundedCars.length===0){
//             return res.json({message: 'No cars rented for this specific model'})
//         }
//         return res.json(foundedCars)
//     } catch (error) {
//         res.json({message: 'Error detected', error})
//     }
// }