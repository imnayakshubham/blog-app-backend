import express from "express";
const router = express.Router();
router.route("/categories").post(getBlogs);

export default router;