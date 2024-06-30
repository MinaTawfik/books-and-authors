import mongoose, { model } from "mongoose";

const {Schema} = mongoose;

const authorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    birthDate:{
        type: Date
    },
    books:{
        type: [Schema.Types.ObjectId],
        ref: 'Book'
    },
}, {timestamps: true})

export default mongoose.models.Author || model("Author", authorSchema)