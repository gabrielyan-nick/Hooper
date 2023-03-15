import express from "express";
import multer from "multer";
import { addCourt, getCourt } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// ADD COURT 
router.post("/", upload.none(), addCourt);

// GET COURT
router.get("/:id", getCourt);

export default router;
