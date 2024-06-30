import mongoose, { model } from "mongoose";

const {Schema} = mongoose;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishedDate:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

export default mongoose.models.Book || model("Book", bookSchema)