import Author from '../../../database/models/author.model.js'


export const add = async (req, res, next)=>{
    try {
        const {name, bio, birthDate, books} = req.body
        const newAuthor = await Author.create({
            name,
            bio,
            birthDate,
            books
        })
        res.status(201).json({message: 'Author added', newAuthor})
      } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
      }
}

export const get = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const foundedAuthor = await Author.findById({_id}).select("-_id")
        if(!foundedAuthor){
            return res.status(404).json({message: 'Author not found'})
        } else {
            return res.status(201).json(foundedAuthor)
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    } 
}

export const getall = async (req, res, next)=>{
    try{
        const foundedAuthors = await Author.find().select("-_id")
        res.status(201).json(foundedAuthors)
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const update = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const author = await Author.findById({_id})
        const {name, bio, books} = req.body
        if (!author){
            return res.status(404).json({message: 'Author not found'})
        } else {
            author.name = name
            author.bio = bio
            author.books = books
            const updatedAuthor = await author.save()
            return res.status(202).json({message: 'Author updated successfully', updatedAuthor})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const remove = async (req, res, next)=>{
    try{
        const _id = req.params.id
        const author = await Author.findById({_id})
        if (!author){
            return res.status(404).json({message: 'Author not found'})
        } else {
            const deletedAuthor = await Author.deleteOne({_id:author._id})
            if(deletedAuthor.deletedCount){
                res.status(202).json({message: 'Author deleted'})
            } else{
                res.status(404).json({message: 'Author not deleted'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error})
    }
}


