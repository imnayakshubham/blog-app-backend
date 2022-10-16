import express from "express";
import { addBlog, deleteBlog, getBlogs, like, updateBlog } from "../controllers/blogController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/blogs").post(getBlogs);
router.route("/add-blog").post(protect, addBlog);
router.route("/delete-blog").post(protect, deleteBlog);
router.route("/update-blog").post(protect, updateBlog);
router.route("/like").post(protect, like);



export default router;