import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    sub_title: {
        type: String,
        required: false,
        default: null
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
    cover_image: {
        type: String,
        // required: true
        default: null
    },
    content: {
        type: [Object],
        required: [true, 'Content is required']
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