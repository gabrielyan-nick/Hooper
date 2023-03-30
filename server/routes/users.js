import express from "express";
import multer from "multer";
import { updateUserInfo, getUserInfo } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// UPDATE USER INFO
router.patch("/:id", upload.none(), verifyToken, updateUserInfo);

// GET USER INFO
router.get("/:id", getUserInfo);

export default router;
