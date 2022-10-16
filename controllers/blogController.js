import Blog from "../Schema/blogSchema.js";



const addBlog = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        if (!title || !description || !category) {
            return res.status(422).json({ message: "Please add all the fields", status: "Failed" })
        }
        const blog = await Blog.create({ ...req.body, posted_by: req.user });
        const result = await blog.save()
        if (result) {
            return res.status(200).json({ message: "Blog added successfully", status: "Success" })
        }
    } catch (error) {
        console.log({ error });
        return res.status(200).json({ message: "Something went wrong", status: "Failed" })
    }
}

const getBlogs = async (req, res) => {
    const { pageNumber, category } = req.body;
    const payload = category ? { category } : {};
    const limit = 9;
    const skipCondtion = (pageNumber - 1) * limit
    try {
        const totalBlogs = await Blog.count();
        const blogs = await Blog.find(payload).skip(skipCondtion).limit(limit).populate("posted_by", "_id user_name pic").populate("likes", "_id user_name pic").populate("bookmarked", "_id user_name pic")
        return res.status(200).json({ message: "Blogs fetched successfully", status: "Success", result: { blogs, total: totalBlogs } })
    } catch (error) {
        console.log({ error })
        return res.status(200).json({ message: error, status: "Failed" })

    }
}

const deleteBlog = async (req, res) => {
    try {
        const { _id } = req.body;
        const blog = await Blog.findById(_id);
        if (blog.posted_by._id.toString() === req.user._id.toString()) {
            const result = await Blog.findByIdAndDelete(_id);
            if (result) {
                return res.status(200).json({ message: "Blog deleted successfully", status: "Success" })
            }
        } else {
            return res.status(401).json({ message: "You are not authorized to delete this blog", status: "Failed" })
        }

    } catch (error) {
        console.log({ error })

    }
}

const updateBlog = async (req, res) => {
    try {
        const { _id } = req.body;
        const blog = await Blog.findById(_id);
        if (blog.posted_by._id.toString() === req.user._id.toString()) {
            const result = await Blog.findByIdAndUpdate(_id, req.body, { new: true });
            if (result) {
                return res.status(200).json({ message: "Blog updated successfully", status: "Success" })
            }
        } else {
            return res.status(401).json({ message: "You are not authorized to update this blog", status: "Failed" })
        }

    } catch (error) {
        console.log({ error })
    }
}

const like = async (req, res) => {
    const { blogId, userId } = req.body;
    try {
        const blog = await Blog.findById(blogId)
        const isLiked = blog.likes.includes(userId);
        let result = {}
        if (isLiked) {
            result = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: userId }
            }, { new: true }).populate("posted_by", "_id user_name pic")
        } else {
            result = await Blog.findByIdAndUpdate(blogId, {
                $addToSet: { likes: userId }
            }, { new: true }).populate("posted_by", "_id user_name pic")
        }
        if (result) {
            return res.status(200).json({ message: "Updated successfully", status: "Success", result: result })
        }
    } catch (err) {
        console.log({ err });
    }
};

export { addBlog, getBlogs, deleteBlog, updateBlog, like }