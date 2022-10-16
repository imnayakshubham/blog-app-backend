import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']

    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    posted_by: {
        type: ObjectId,
        ref: 'User'
    },
    photo: {
        type: String,
        // required: true
        default: null
    },
    likes: {
        type: [ObjectId],
    },
    bookmarked: {
        type: [ObjectId],
        ref: 'User',
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog