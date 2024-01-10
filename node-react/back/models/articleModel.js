import mongoose from "mongoose"


const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    image: {
        src: String,
        alt: String,
    },
    comments: [{
        pseudo: String,
        content: String,
        rating: {
            type: Number,
            maxLength: 5
        },
        date: Date
        }],
},{
    timestamps: true
})

//conversion schema to model
const Article = mongoose.model("Article", articleSchema)

export default Article