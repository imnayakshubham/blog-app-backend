import express from "express";
import { register, login, updateProfile, } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);
router.route("/update-profile").post(protect, updateProfile);

export default router;