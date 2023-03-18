import express from "express";
import multer from "multer";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

router.post("/login", upload.none(), login);
router.post("/register", upload.none(), register);

export default router;
